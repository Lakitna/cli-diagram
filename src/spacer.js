class Spacer {
    /**
     * @param {number} size
     * @param {Diagram} diagram
     */
    constructor(size, diagram) {
        this.size = size;
        this.diagram = diagram;
    }

    /**
     * The width of the Spacer
     *
     * @return {number}
     */
    get width() {
        return this.size * 3;
    }

    /**
     * Returns a string representation of the Spacer
     *
     * @return {string}
     */
    toString() {
        return new Array(this.diagram.height)
            .fill(' '.repeat(this.width))
            .join('\n');
    }
}
module.exports = Spacer;
