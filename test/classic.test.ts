import * as assert from 'assert';
import { Classic } from '../src';

describe('ClassicWallet', function () {
  it('From wif', async () => {
    let fixture = {
      "brainMnemonic": "?",
      "WIF": "L1s3Qpc5G8hs8V24FubcdxcBHPVzfwwD4vGWddRijXjejZKwQbyM",
      "address":"19fMFMdS9bi4CwmXVsbAMgNw9RrsgBUPB3"
    };

    let wallet = Classic.Wallet.fromWif(fixture.WIF);
    assert.strict.equal(wallet.address, fixture["address"]);
  });
});
