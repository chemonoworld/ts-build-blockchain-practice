import crypto from "crypto";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public hash: string;
    public prevHash: string;
    public height: number;
    public data: string;

    constructor(
        public _prevHash: string,
        public _height: number,
        public _data: string
    ) {
        this.hash = Block.calculateHash(_prevHash, _height, _data);
        this.prevHash = _prevHash;
        this.height = _height;
        this.data = _data;
    }

    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class Blockchain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    private getPrevHash() {
        if (this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string): void {
        const block = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(block);
    }
    public getBlocks() {
        return [...this.blocks];
    }
}

const blockchain = new Blockchain();
blockchain.addBlock("first block");
blockchain.addBlock("second block");
blockchain.addBlock("third block");

console.log(blockchain.getBlocks());