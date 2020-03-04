const boxen = require('boxen');
const color = require('ansi-colors');

const Element = require('./element');

class Container extends Element {
    /**
     * @param {string} content
     * @param {object} options
     * @param {Diagram} diagram
     */
    constructor(content, options, diagram) {
        super(options, diagram);
        this.content = content || '';
    }

    /**
     * Returns a string representation of the Container
     *
     * @return {string}
     */
    toString() {
        const container = boxen(this.content.toString())
            .split('\n')
            .slice(1, -1)
            .map((line) => line.slice(1, -1))
            .join('\n');
        return this.style(container);
    }

    /**
     * Apply styling to the string as defined by the container options
     *
     * @param {string} string
     * @return {string}
     */
    style(string) {
        string = super.style(string);

        const heightDiff = this.neighbourHeight.highest - this.height;
        if (heightDiff <= 0) {
            return string;
        }

        const width = color.unstyle(string.split('\n')[0]).length;
        const blankLine = ' '.repeat(width);
        switch (this.options.verticalAlign) {
            case 'middle':
                return `${blankLine}\n`.repeat(heightDiff/2)
                    + string;
            case 'bottom':
                return `${blankLine}\n`.repeat(heightDiff)
                    + string;
            default:
                return string;
        }
    }

    /**
     * The height of the container
     *
     * @return {number}
     */
    get height() {
        if (typeof this.content === 'string') {
            return this.content.split('\n').length;
        }
        return this.content.height;
    }
}
module.exports = Container;
