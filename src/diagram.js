const Box = require('./box');
const Container = require('./container');
const Line = require('./line');
const Arrow = require('./arrow');
const Spacer = require('./spacer');

class Diagram extends Array {
    constructor(options={}) {
        super();
        this.options = options;
    }

    toString() {
        return this.draw();
    }

    draw() {
        const elements = this.map((element) => {
            return element.toString().split('\n');
        });

        const lines = new Array(this.height)
            .fill()
            .map((_, i) => {
                return elements
                    .reduce((accumulator, element) => {
                        if (typeof element[i] === 'undefined') {
                            return accumulator
                                + ' '.repeat(element[0].length);
                        }
                        return accumulator + element[i];
                    }, '')
                    .trimEnd();
            });
        return lines
            .join('\n')
            .trimEnd();
    }

    get height() {
        return this.reduce((previous, current) => {
            if (isNaN(current.height)) return previous;
            return Math.max(current.height, previous);
        }, 0);
    }

    box(contents, options={}) {
        options = Object.assign({}, this.options, options);

        this.push(new Box(contents, options));
        return this;
    }

    container(contents, options={}) {
        options = Object.assign({}, this.options, options);

        this.push(new Container(contents, options));
        return this;
    }

    line(count=1, options={}) {
        options = Object.assign({}, this.options, options);

        this.push(new Line(count, options, this));
        return this;
    }

    arrow(directions, options={}) {
        options = Object.assign({}, this.options, options);

        this.push(new Arrow([...directions], options, this))
        return this;
    }

    space(size=this.options.size) {
        this.push(new Spacer(size, this));
        return this;
    }
}
module.exports = Diagram;
