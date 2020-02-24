const Element = require('./element');

class Line extends Element {
    /**
     * @param {number|string[]} lines
     * @param {object} options
     * @param {Diagram} diagram
     */
    constructor(lines, options, diagram) {
        super(options);
        if (Array.isArray(lines)) {
            this.count = lines.length;
            this.labels = this.parseLabels(lines);
        }
        else {
            this.count = lines;
            this.labels = this.parseLabels(new Array(this.count));
        }
        this.diagram = diagram;
    }

    toString() {
        const gap = ' '.repeat(this.width);

        let lineCount = 0;
        const result = this.layout
            .map((line) => {
                if (line === true) {
                    const label = this.labels[lineCount++];
                    return this.buildShaft(label);
                }
                return gap;
            })
            .join('\n');
        return this.style(result);
    }

    get width() {
        const width = this.options.size * 3 + 1;

        if (this.labelLength > 0) {
            return width + 2 + this.labelLength;
        }
        return width;
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

    parseLabels(labels) {
        this.labelLength = labels.reduce((previous, current) => {
            if (typeof current === 'string') {
                return Math.max(previous, current.length);
            }
            return previous;
        }, 0);

        return labels.map((label) => {
            if (typeof label === 'string') {
                return label.padEnd(this.labelLength);
            }
        });
    }

    buildShaft(label) {
        let shaft = '─';

        if (typeof label !== 'string') {
            shaft = shaft.repeat(this.width);
        }
        else {
            const shaftLength = (this.width - this.labelLength - 1) / 2;
            shaft = shaft.repeat(shaftLength)
                + `┤${label}├`
                + shaft.repeat(shaftLength);
        }

        return shaft;
    }
}
module.exports = Line;
