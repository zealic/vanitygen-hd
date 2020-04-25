import * as bitcoin from 'bitcoinjs-lib';

export interface IWallet {
    readonly privateKey: Buffer;

    readonly publicKey: Buffer;

    readonly address: string;
}

export class Wallet implements IWallet {
    private pair: bitcoin.ECPairInterface;

    constructor() {
        this.pair = bitcoin.ECPair.makeRandom();
    }

    static fromWif(wif: string): Wallet {
        let wallet = <Wallet>Object.create(Wallet.prototype);
        wallet.pair = bitcoin.ECPair.fromWIF(wif);
        return wallet;
    }

    get privateKey(): Buffer {
        return this.pair.privateKey;
    }

    get publicKey(): Buffer {
        return this.pair.publicKey;
    }

    get address(): string {
        return bitcoin.payments.p2pkh({ pubkey: this.pair.publicKey }).address;
    }
}

