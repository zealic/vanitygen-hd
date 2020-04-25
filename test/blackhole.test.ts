import * as assert from 'assert';
import { Blackhole } from '../src';

describe('BlackholeWallet', function () {
  it('From full zero publicKeyHash', async () => {
    let fixture = {
      "publicKeyHash": "0000000000000000000000000000000000000000",
      "address":"1111111111111111111114oLvT2"
    };

    let wallet = Blackhole.Wallet.fromPublicKeyHash(fixture.publicKeyHash);
    assert.strict.equal(wallet.address, fixture["address"]);
  });
});
