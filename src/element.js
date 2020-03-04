const color = require('ansi-colors');

class Element {
    /**
     * @param {object} options
     */
    constructor(options) {
        this.options = Object.assign({
            size: 1,
            color: null,
        }, options);
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
