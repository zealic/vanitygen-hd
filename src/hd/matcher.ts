import * as _ from 'lodash';
import * as fs from 'fs';
import { IHDWallet } from './wallet';

const PREFIX_P2PHK = '1';
const PREFIX_P2SH = '3';

export class HDWalletMatcher {
    private commonRules: string[];
    private hdRules: string[];
    private hdmRules: string[];

    setRules(rules: string[], hdRules: string[] = [], hdmRules: string[] = []) {
        this.commonRules = rules;
        this.hdRules = this.commonRules.map(m => PREFIX_P2PHK + m).concat(hdRules);
        this.hdmRules = this.commonRules.map(m => PREFIX_P2SH + m).concat(hdmRules);
    }

    loadRules(fileName: string): string[] {
        var rules: string[] = [];
        if (fs.existsSync(fileName)) {
            rules = fs.readFileSync(fileName).toString().split(/\r?\n/);
            rules = rules.map(m => m.trim());
            // Remove empty word
            rules = <string[]>_.filter(rules, _.size);
            // Remove with comment
            rules = <string[]>_.filter(rules, m => !m.startsWith('#'));
            // Unique
            rules = <string[]>_.uniq(rules);
        }
        return rules;
    }

    matchHD(wallet: IHDWallet) {
        var address = wallet.firstAddress;
        let result = _.filter(this.hdRules, rule => address.startsWith(rule));
        return result.length > 0;
    }

    matchHDM(wallet: IHDWallet) {
        var address = wallet.firstAddress;
        let result = _.filter(this.hdmRules, rule => address.startsWith(rule));
        return result.length > 0;
    }
}