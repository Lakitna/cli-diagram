class Spacer {
    constructor(size, diagram) {
        this.size = size;
        this.diagram = diagram;
    }

    get width() {
        return this.size * 3;
    }

    toString() {
        return new Array(this.diagram.height)
            .fill(' '.repeat(this.width))
            .join('\n');
    }
}
module.exports = Spacer;
