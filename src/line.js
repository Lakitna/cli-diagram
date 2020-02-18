const Element = require('./element');

class Line extends Element {
    constructor(count, options, diagram) {
        super(options);
        this.count = count;
        this.diagram = diagram;
    }

    toString() {
        const gap = ' '.repeat(this.width + 1);
        const pipe = '─'.repeat(this.width + 1);

        const result = this.layout
            .map((line) => {
                if (line === true) {
                    return pipe;
                }
                return gap;
            })
            .join('\n');
        return this.style(result);
    }

    get width() {
        return this.options.size * 3;
    }

    get height() {
        const neighbour = this.getNeighbourHeight();
        if (isNaN(neighbour)) {
            return this.ownHeight;
        }
        return Math.max(neighbour, this.ownHeight);
    }

    get ownHeight() {
        return this.count;
    }

    get layout() {
        const whitespace = this.height - this.count;
        let gapSize = whitespace / (this.count);

        let topPadding = 0;
        if (gapSize < 1) {
            gapSize = 0;
            topPadding = whitespace / 2;
        }
        else {
            topPadding = Math.round((whitespace - (gapSize * (this.count-1))) / 2);
        }

        const layout = new Array(this.height).fill(false);
        let position = topPadding;
        for (let i=0; i<this.count; i++) {
            layout[Math.floor(position)] = true;
            position += 1+gapSize;
        }

        return layout;
    }

    get position() {
        return this.diagram.findIndex((element) => {
            return element == this;
        });
    }

    getNeighbourHeight() {
        const neighbour = {};
        const position = this.position;
        if (position > 0) {
            neighbour.left = this.diagram[position - 1].ownHeight;
        }
        if (position < (this.diagram.length - 1)) {
            neighbour.right = this.diagram[position + 1].ownHeight;
        }

        if (neighbour.left === 0 || isNaN(neighbour.left)) {
            return neighbour.right;
        }
        if (neighbour.right === 0 || isNaN(neighbour.right)) {
            return neighbour.left;
        }

        return Math.min(neighbour.left, neighbour.right);
    }
}
module.exports = Line;
