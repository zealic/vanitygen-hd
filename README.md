[![CI][ci-image]](ci-url)

# vanitygen-hd

Generate Bitcoin vanity address for Hierarchical Deterministic Wallet and Multisig Hierarchical Deterministic Wallet.  

## Quickstart

### HD Wallet

Hierarchical Deterministic Wallet generated vanity address path is `m/44'/0'/0'/0/0`.

Using Docker to run:

```shell
docker run -it --rm --network=none zealic/vanitygen-hd generate HDD BTC 999 666
```

You will got below vanity address with prefix `HDD`:

```yaml
- address: 1HDDGgRFrtY38ZVVTtkgbBS4aUwE2rwUhz
  mnemonic: behave crack outer fine rude dwarf verb prosper because split loyal blue cream jar merge cupboard prize normal subway celery unfold alarm blue fetch
```

According to your CPU frequency and vanity address requirements, the time to generate mnemonic will gradually become longer. Generally, 3~4 length addresses are recommended.

### HDM Wallet

If you want generate Multisig Hierarchical Deterministic Wallet, use `--co-signers` and `--co-members`.  
Multisig Hierarchical Deterministic Wallet generated vanity address path is `m/45'/<CO_SIGNER_INDEX>/0/0`.

Prepare co-signers public keys file **co-signers.yml**:

```yaml
# Public key of co-signer-1, path is "m/45'/1"
- xpub68RRmuSKe9yhgCoVr7pLaRTPZrDwekTbvpMGC9iSukzFYSbQJZusJRiLr8zYfRiZRJV2wauwWo1jnBMDDGz5ZGhfvB5UKvAzHdvtF6qNHaW
# Public key of co-signer-2, path is "m/45'/2"
- xpub68uxBBwmt9cY6RY1BVHHUwH7dLC2G98QPHpABi71eaDZuGWxZHEB4UAFVgawcuTysnnq82CJP28uEzzCRSQQYZX6sAxKsSR9RqNauA3YVaH
```

Generate with HDM wallet

```shell
docker run -it --rm --network=none \
  -v $PWD/co-signers.yml:/co-signers.yml \
  zealic/vanitygen-hd \
  generate --co-signers=/co-signers.yml HDD BTC 999 666
```

Got vanity address, that public key path is "m/45'/0":

```yaml
- address: 3666kmVbsBF6K5Di8sUef1Qg9fp2wxFYxC
  parentAddress: 1LFsUUBtEg2PS8HALDi48fSUcjVcF6Htpg
  mnemonic: detail walnut stock this history ivory stamp leaf half marine inspire fitness erase apple flee bird length dizzy rubber open index print crystal boring
```

## Usage

```text
Usage: vanitygen-hd [options] [command]

Options:
  -V, --version                   output the version number
  -h, --help                      display help for command

Commands:
  generate [options] [rule-list]
    Options:
      -b, --bits <int>               BIP32 specifies the entropy length to be tween 128 and 256 bits and a multiple of 32 bits. (default: 256)
      -w, --workers <int>            Numeber of parallel worker, use 0 as CPU num. (default: 0)
      -s, --co-signers <yaml-file>   Co-signers YAML file, include m/45'/{1-n} public key array.
      -m, --co-members <int>         Co-signers member num, use 0 as 'MAX(1,LEN(co_signers))'. (default: 0)
      -f, --rules-file <rules-file>  One rule per line, allowing '#' to be a comment. (default: "rules.txt")
      -h, --help                     display help for command
  help [command]                  display help for command
```

## P2SH Address Limition

Because base58 address encoding with `0x05` heading, the second character of the P2SH address cannot be `STUVWXYZ` and `a-z`.

## Donate

Bitcoin: [`18mXNJyHdUSKfvQSrXCdQsuStp6eWFUVnh`][donate-url]

[![Donate Bitcoin][donate-image]][donate-url]

## License

[MIT](./LICENSE)

## References

* [vanitygen](https://github.com/samr7/vanitygen)
* [vanitygen-plus](https://github.com/exploitagency/vanitygen-plus)
* [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
* [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
* [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
* [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
* [BIP-45](https://github.com/bitcoin/bips/blob/master/bip-0045.mediawiki)
* [BIP-39 Tool : Mnemonic Code Converter](https://github.com/iancoleman/bip39)

[ci-image]:       https://github.com/zealic/vanitygen-hd/workflows/CI/badge.svg
[ci-url]:         https://github.com/zealic/vanitygen-hd/actions?query=workflow%3ACI
[donate-image]:   ./donate.png
[donate-url]:     https://www.blockchain.com/btc/address/18mXNJyHdUSKfvQSrXCdQsuStp6eWFUVnh
