const Element = require('./element');

class Line extends Element {
    /**
     * @param {number|string[]} lines
     * @param {object} options
     * @param {Diagram} diagram
     */
    constructor(lines, options, diagram) {
        super(options, diagram);
        if (Array.isArray(lines)) {
            this.count = lines.length;
            this.labels = this.parseLabels(lines);
        }
        else {
            this.count = lines;
            this.labels = this.parseLabels([]);
        }
    }

    /**
     * Returns a string representation of the Line
     *
     * @return {string}
     */
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

    /**
     * The width of the lines
     *
     * @return {number}
     */
    get width() {
        const width = this.options.size * 3 + 1;

        if (this.labelLength > 0) {
            return width + 2 + this.labelLength;
        }
        return width;
    }

    /**
     * The height of the lines element based on it's neighbouring elements and
     * line count
     *
     * @return {number}
     */
    get height() {
        return Math.max(this.neighbourHeight.shortest, this.ownHeight);
    }

    /**
     * The height of the lines if they where not surrounded by other elements
     *
     * @return {number}
     */
    get ownHeight() {
        return this.count;
    }

    /**
     * The spacing of the lines returned as a boolean list
     *
     * @return {boolean[]}
     */
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

    /**
     * Parse and normalize the labels
     *
     * @param {string[]} labels
     * @return {string[]}
     */
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

    /**
     * Build the string representation of the line with label
     *
     * @param {string} label
     * @return {string}
     */
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
