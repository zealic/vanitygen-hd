[![CI][ci-image]](ci-url)

# vanitygen-hd

Generate Bitcoin vanity address for Hierarchical Deterministic Wallet and Multisig Hierarchical Deterministic Wallet.

## Quickstart

Using Docker to run:

```shell
docker run -it --rm zealic/vanitygen-hd
```

CLI Usage:

```text
Usage: vanitygen-hd [options] [command]

Options:
  -V, --version                   output the version number
  -h, --help                      display help for command

Commands:
  generate [options] [rule-list]
    Options:
    -w, --workers <int>            Numeber of parallel worker, use 0 as CPU num (default: 0)
    -s, --co-signers <json-file>   Co-signers JSON file, include public key
    -m, --co-members <int>         Co-signers member num, use 0 as MAX(1,LEN(all_signers)) (default: 0)
    -f, --rules-file <rules-file>  Rules file (default: "rules.txt")
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
