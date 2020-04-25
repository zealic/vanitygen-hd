const bs58 = require('bs58check')

export interface IWallet {
    readonly address: string;
}

const PKH_VERSION = 0;

export class Wallet implements IWallet {
    private _address: string;

    static fromPublicKeyHash(publicKeyHash: Buffer | string): Wallet {
        let wallet = <Wallet>Object.create(Wallet.prototype);

        let pkh: Buffer;
        if (publicKeyHash instanceof Buffer) {
            pkh = <Buffer>publicKeyHash;
        } else {
            pkh = Buffer.from(<string><unknown>publicKeyHash, "hex");
        }

        let version: Uint8Array = new Uint8Array([PKH_VERSION]);
        wallet._address = bs58.encode(Buffer.concat([version, pkh]));
        return wallet;
    }

    get address(): string {
        return this._address;
    }
}
