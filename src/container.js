const boxen = require('boxen');

const Element = require('./element');

class Container extends Element {
    constructor(content, options) {
        super(options);
        this.content = content || '';

    }

    toString() {
        const container = boxen(this.content.toString())
            .split('\n')
            .slice(1, -1)
            .map((line) => line.slice(1, -1))
            .join('\n');
        return this.style(container);
    }

    get height() {
        if (typeof this.content === 'string') {
            return this.content.split('\n').length;
        }
        return this.content.height;
    }
}
module.exports = Container;
