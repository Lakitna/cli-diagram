const color = require('ansi-colors');

class Element {
    /**
     * @param {object} options
     * @param {Diagram} diagram
     */
    constructor(options, diagram) {
        this.options = Object.assign({
            size: 1,
            color: null,
            verticalAlign: 'top',
        }, options);
        this.diagram = diagram;
    }

    /**
     * The height of the element
     *
     * @return {number}
     */
    get height() {
        return this.options.size;
    }

    /**
     * The height of the element when existing without other elements
     *
     * @return {number}
     */
    get ownHeight() {
        return this.height;
    }

    /**
     * Return the height of the highest direct neighbour
     *
     * @return {{highest: number, shorted: number}}
     */
    get neighbourHeight() {
        const neighbour = {};
        const position = this.position;
        if (position > 0) {
            neighbour.left = this.diagram[position - 1].ownHeight;
        }
        if (position < (this.diagram.length - 1)) {
            neighbour.right = this.diagram[position + 1].ownHeight;
        }

        if (Number.isNaN( Number.parseInt(neighbour.left, 10))) {
            neighbour.left = neighbour.right || 0;
        }
        if (Number.isNaN( Number.parseInt(neighbour.right, 10))) {
            neighbour.right = neighbour.left || 0;
        }

        return {
            shortest: Math.min(neighbour.left, neighbour.right),
            highest: Math.max(neighbour.left, neighbour.right),
        };
    }

    /**
     * The position of this element in the Diagram
     *
     * @return {number}
     */
    get position() {
        return this.diagram.findIndex((element) => {
            return element == this;
        });
    }

    /**
     * Apply styling to the string as defined by the elements options
     *
     * @param {string} string
     * @return {string}
     */
    style(string) {
        if (typeof color[this.options.color] !== 'undefined') {
            return color[this.options.color](string);
        }
        return string;
    }
}
module.exports = Element;
