export class TensionDie extends Die {
    constructor(termData) {
        termData.faces=6;
        super(termData);
    }
    /** @override */
    static DENOMINATION = "t";

    /** @override */
    get total(){
        let ones = this.results.map(r => r.result).filter(x => x==1).length;
        return ones;
    }


}