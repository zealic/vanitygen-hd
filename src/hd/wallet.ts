
import * as bitcoin from 'bitcoinjs-lib';
import { bip32 } from 'bitcoinjs-lib';
import * as bip39 from 'bip39';

export interface IHDWallet {
    readonly parent: IHDWallet;

    readonly mnemonic: string;

    readonly rootKey: bip32.BIP32Interface;

    readonly firstAddress: string;

    getAddress(path: string): string;
}

export class HDWallet implements IHDWallet {
    static async make(bits: number = 256) {
        if(!bits || bits < 128 || bits > 256 || (bits % 32) !== 0) {
            bits = 256;
        }

        let mnemonic = await bip39.generateMnemonic(bits)
        let wallet = await HDWallet.from(mnemonic);
        return wallet;
    }

    static async from(mnemonic: string) {
        let wallet = new HDWallet();
        wallet._mnemonic = mnemonic;
        let seed = await bip39.mnemonicToSeed(mnemonic);
        wallet._rootKey = bip32.fromSeed(seed);
        return wallet;
    }

    private _mnemonic: string;
    private _firstAddress: string;
    private _rootKey: bip32.BIP32Interface;

    get parent(): IHDWallet {
        return null;
    }

    get mnemonic(): string {
        return this._mnemonic;
    }

    get rootKey(): bip32.BIP32Interface {
        return this._rootKey;
    }

    get firstAddress() {
        // Use a BIP44 derivation path for coin #1 (Bitcoin)
        const FIRST_PATH = "m/44'/0'/0'/0/0";
        if (!this._firstAddress) {
            this._firstAddress = this.getAddress(FIRST_PATH);
        }
        return this._firstAddress;
    }

    getAddress(path: string): string {
        let key = this._rootKey.derivePath(path);
        let pkh = bitcoin.payments.p2pkh({ pubkey: key.publicKey });
        return pkh.address;
    }
}

export class HDMWallet implements IHDWallet {
    private wallet: IHDWallet;
    private cosigners: bip32.BIP32Interface[];
    private _firstMAddress: string;
    private _coMembers: number;

    constructor(wallet: IHDWallet, cosigners: bip32.BIP32Interface[], coMembers: number = null) {
        this.wallet = wallet;
        this.cosigners = cosigners;
        if(!coMembers || coMembers <= 0) {
            coMembers = Math.max(1, this.cosigners.length);
        }
        if(!coMembers || coMembers > this.cosigners.length + 1) {
            throw Error(`Invalid coMembers ${coMembers}`);
        }
        this._coMembers = coMembers;
    }

    get parent(): IHDWallet {
        return this.wallet;
    }

    get mnemonic(): string {
        return this.wallet.mnemonic;
    }

    get rootKey(): bip32.BIP32Interface {
        return this.wallet.rootKey;
    }

    get firstAddress() {
        if (!this._firstMAddress) {
            this._firstMAddress = this.getAddress('0');
        }
        return this._firstMAddress;
    }

    getAddress(path: string) {
        // Prepare siginers
        let extKey = this.wallet.rootKey.derivePath(`m/45'/0`);
        let signers = [extKey].concat(this.cosigners);

        // Generate specify path public keys
        let keys = signers.map((signer, i) => {
            return signer.derivePath(`0/${path}`).publicKey;
        });
        let sortedKeys = keys.sort();

        // Gernate multisig p2sh address
        let p2sh = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({ m: this._coMembers, pubkeys: sortedKeys })
        });
        return p2sh.address;
    }
}
