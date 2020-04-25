![CI](https://github.com/zealic/vanitygen-hd/workflows/CI/badge.svg)

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

Bitcoin: 18mXNJyHdUSKfvQSrXCdQsuStp6eWFUVnh

![Donate Bitcoin](./donate.png)

## LICENSE

MIT
