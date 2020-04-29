import { bip32 } from 'bitcoinjs-lib';
import { IHDWallet, HDWallet, HDMWallet } from './wallet';
import { HDWalletMatcher } from './matcher';

export class HDWalletGenerator {
  private bits: number;
  private cosigners: bip32.BIP32Interface[];
  private coMembers: number;
  private lastSigner: boolean;

  constructor(bits: number = 256, strCosigner: string[] = null, coMembers: number = 2, lastSigner: boolean = false) {
    this.bits = bits;
    if (strCosigner) {
      this.cosigners = strCosigner.map(m => bip32.fromBase58(m));
      this.coMembers = coMembers;
      this.lastSigner = lastSigner;
    }
  }

  async generate(matcher: HDWalletMatcher): Promise<IHDWallet> {
    let wallet: IHDWallet;
    do {
      wallet = await HDWallet.make(this.bits);

      if (this.cosigners) {
        wallet = new HDMWallet(wallet, this.cosigners, this.coMembers, this.lastSigner);
        if (matcher.matchHDM(wallet)) break;
      } else {
        if (matcher.matchHD(wallet)) break;
      }
    } while (true);

    return wallet;
  }
}
