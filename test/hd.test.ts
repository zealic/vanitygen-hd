import * as assert from 'assert';
import { HD } from '../src';
import { bip32 } from 'bitcoinjs-lib';

describe('HDWallet', function () {
  it('From mnemonic and get first address', async () => {
    let wallet = await HD.HDWallet.from('rookie message fee quarter dream shoulder frown lady best wisdom hurdle hub');
    assert.strict.equal(wallet.firstAddress, '1AgCEXtJURBQZw9Ds8ziQsGo1dUdbT64Lo');
  });
});

describe('HDMWallet', function () {
  it('From mnemonic and get first address of multisig', async () => {
    let multisigFixture = {
      "expectedFirstAddress": "37ovvbYcDEzteTPPfaNk6KUq5t7Zp6kNHY",
      "cosigner-0": {
          "mnemonic": "ignore off draw destroy obtain resist absent machine modify gym brave glow photo upon creek",
          "keys": {
              "m/45'": "xpub69cnfcuYxxLsNWrZQ2EuTpYbaEhHjYT47g9wyWmgZbLwsq1hQJRi2TQYy8zifBfH3ErfNYbZduc8ybi77ZkHMAWmR83RskmRvq3J5XQb5BX",
              "m/45'/0-prv": "xprv9vtVjEVNLBoMHJMo2NnxggBNzKz37bAo8ZMwSPp2duN8p2hESdwtsWU69J2xtD4QnKA5YYTENkULS1rRpkfg2hrCTKK2nD1LFMXhBmBMRDL",
              "m/45'/0-pub": "xpub69sr8k2GAZMeVnSG8QKy3p87YMpXX3teVnHYEnDeCEu7gq2NzBG9RJnZzZzybEGFG5P97cuvmaKbsUFXLdNNDLL6irH5esxoiS6xeqMikjx"
          }
      },
      "cosigner-1": {
          "mnemonic": "aware roast goose prosper dismiss reason runway stick subway rhythm fold girl salon edit ramp absurd double stuff neither scout topic animal brick benefit",
          "keys": {
              "m/45'": "xpub68RRmuSKe9yhgCoVr7pLaRTPZrDwekTbvpMGC9iSukzFYSbQJZusJRiLr8zYfRiZRJV2wauwWo1jnBMDDGz5ZGhfvB5UKvAzHdvtF6qNHaW",
              "m/45'/1-prv": "xprv9xURTtZXHw5oqj9aBYbXuJUg19qGgnNwDTtJtrRZSoz6SvwsANPQS7DPrSJpoee3mr9uTiYaba7rxRFcHmkfLb3foCaUBRGdj3GaoR8PncJ",
              "m/45'/1-pub": "xpub6BTmsQ6R8Je74DE3Ha8YGSRQZBfm6F6nagouhEqB19X5KjH1huheyuXshjrhRDuiQpyQW6iM1FRvocccmZMm138pPmo8BMLmXEaTNXFQ2j8"
          }
      },
      "cosigner-2": {
          "mnemonic": "brass innocent roof corn bounce project other hundred pause luggage pull panic immense praise join meadow album fiscal door around crunch trap infant report",
          "keys": {
              "m/45'": "xpub68uxBBwmt9cY6RY1BVHHUwH7dLC2G98QPHpABi71eaDZuGWxZHEB4UAFVgawcuTysnnq82CJP28uEzzCRSQQYZX6sAxKsSR9RqNauA3YVaH",
              "m/45'/2-prv": "xprv9wnN9kwZQvqFHKH2Pj2cH8DupXvKnphkssZN46dzk8QY2ReoR1FrnFGiCd3t4MGhqsLhf69LrFGdoVQSGSDc5sViHVZH93hwnw7P4RbuUYn",
              "m/45'/2-pub": "xpub6AmiZGUTFJPYVoMVVkZceGAeNZkpCHRcF6UxrV3cJTwWuDywxYa7L3bC3uRBQjBEL86D3BtJbynhbVYtxwqARksCiAwQyqyHX9MwZ4Gvi7j"
          }
      }
  }  

    let wallet = await HD.HDWallet.from(multisigFixture["cosigner-0"]["mnemonic"]);
    let cosigner1 = multisigFixture["cosigner-1"];
    let cosigner2 = multisigFixture["cosigner-2"];
    let cosignerStrKeys = [cosigner1.keys["m/45'/1-pub"], cosigner2.keys["m/45'/2-pub"]];
    let cosignerKeys = cosignerStrKeys.map(k => bip32.fromBase58(k));
    let mwallet = new HD.HDMWallet(wallet, cosignerKeys);
    assert.strict.equal(mwallet.firstAddress, multisigFixture["expectedFirstAddress"]);
  });
});
