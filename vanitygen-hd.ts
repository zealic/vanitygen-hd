import * as fs from 'fs';
import * as os from 'os';
import * as cluster from 'cluster';

import * as yaml from 'js-yaml';
import { Command } from 'commander';

import { HD } from './src';


function initializeProgram() {
    let program = new Command();
    program.version("0.2.0");
    program.command("generate")
        .option("-b, --bits <int>", "BIP32 specifies the entropy length to be tween 128 and 256 bits and a multiple of 32 bits.", Number, 256)
        .option("-w, --workers <int>", "Numeber of parallel worker, use 0 as CPU num.", parseInt, 0)
        .option("-s, --co-signers <yaml-file>", "Co-signers YAML file, include m/45'/{1~n} public key array.")
        .option("-m, --co-members <int>", "Co-signers member num, use 0 as 'MAX(1,LEN(co_signers))'.", parseInt, 0)
        .option("-t, --co-last-signer <bool>", "Generated vanity address is last signer, public key path is : m/45'/{n}.", Boolean, false)
        .option("-f, --rules-file <rules-file>", "One rule per line, allowing '#' to be a comment.", "rules.txt")
        .arguments("[rule-list]")
        .action(function (_, cmd: Command) {
            generateRun(cmd.opts(), cmd.args);
        });

    return program;
}

async function* createGenerator(hdGenerator: HD.HDWalletGenerator, matcher: HD.HDWalletMatcher) {
    let gen = async () => {
        let wallet = await hdGenerator.generate(matcher);
        let output: any;
        if (wallet.parent) {
            output = {
                "address": wallet.firstAddress,
                "parentAddress": wallet.parent.firstAddress,
                "mnemonic": wallet.mnemonic
            }
        } else {
            output = {
                "address": wallet.firstAddress,
                "mnemonic": wallet.mnemonic
            }
        }
        return output;
    };

    while (true) {
        yield await gen();
    }
}

async function parallelRun(generator: HD.HDWalletGenerator, matcher: HD.HDWalletMatcher, workers: number = 0) {
    let numCPUs = os.cpus().length;
    if(!workers || workers < 0 || workers > numCPUs) {
        workers = os.cpus().length;
    }

    if (cluster.isMaster) {
        for (let i = 0; i < workers; i++) {
            cluster.fork();
        }
        cluster.on("message", (_, msg) => {
            console.log(yaml.dump([msg], { lineWidth: -1 }));
        })
    } else {
        let matchedGenerator = createGenerator(generator, matcher);
        let worker = cluster.worker;
        for await (let output of matchedGenerator) {
            worker.send(output);
        }
    }
}

function generateRun(options:any, rules: string[]) {
    let bits = options.bits;
    let cosiginers: string[] = null;
    if (options.coSigners) {
        if(!fs.existsSync(options.coSigners)) {
            console.error(`Co-signers file '${options.coSigners}' can not be found.`);
            process.exit(1);
        }
        cosiginers = yaml.load(fs.readFileSync(options.coSigners).toString());
    }

    let generator = new HD.HDWalletGenerator(bits, cosiginers, options.coMembers, options.coLastSigner);
    var matcher = new HD.HDWalletMatcher();
    if(options.rulesFile) {
        let rulesFromFile = matcher.loadRules(options.rulesFile);
        if(rulesFromFile.length > 0) {
            rules = rulesFromFile.concat(rules);
        }
    }
    if (rules.length > 0) {
        matcher.setRules(rules);
    }

    parallelRun(generator, matcher, options.workers);
}

function main() {
    let command = initializeProgram();
    command.parse(process.argv);
}

main();
