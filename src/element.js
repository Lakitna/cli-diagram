const chalk = require('chalk');

class Element {
    constructor(options) {
        this.options = Object.assign({
            size: 1,
            color: null,
        }, options);
    }

    get height() {
        return this.options.size;
    }

    get ownHeight() {
        return this.height;
    }

    style(string) {
        if (typeof chalk[this.options.color] !== 'undefined') {
            return chalk[this.options.color](string);
        }
        return string;
    }
}
module.exports = Element;
