const boxen = require('boxen');

const Element = require('./element');

class Box extends Element {
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
     * Returns a string representation of the Box
     *
     * @return {string}
     */
    toString() {
        return this.style(boxen(this.content.toString(), {
            padding: this.options.size,
        }));
    }

    /**
     * The height of the Box
     *
     * @return {number}
     */
    get height() {
        let contentHeight = 0;
        if (typeof this.content === 'string') {
            contentHeight = this.content.split('\n').length;
        }
        else {
            contentHeight = this.content.height;
        }

        return contentHeight + 2 * (this.options.size + 1);
    }
}
module.exports = Box;
