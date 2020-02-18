const boxen = require('boxen');

const Element = require('./element');

class Box extends Element {
    constructor(content, options) {
        super(options);
        this.content = content || '';
    }

    toString() {
        return this.style(boxen(this.content.toString(), {
            padding: this.options.size,
        }));
    }

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
