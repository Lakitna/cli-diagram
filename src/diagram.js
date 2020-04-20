const color = require('ansi-colors');

const Box = require('./box');
const Container = require('./container');
const Line = require('./line');
const Arrow = require('./arrow');
const Spacer = require('./spacer');

class Diagram extends Array {
    /**
     * @param {object} options
     */
    constructor(options={}) {
        super();
        this.options = options;
    }

    /**
     * Returns a string representation of the Diagram
     *
     * @return {string}
     */
    toString() {
        return this.draw();
    }

    /**
     * Render a string representation of the Diagram
     *
     * @return {string}
     */
    draw() {
        const elements = this.map((element) => {
            return element.toString().split('\n');
        });

        const lines = new Array(this.height)
            .fill()
            .map((_, i) => {
                return elements.reduce((accumulator, element) => {
                    if (typeof element[i] === 'undefined') {
                        return accumulator + ' '.repeat(color.unstyle(element[0]).length);
                    }
                    return accumulator + element[i];
                }, '')
                    .trimEnd();
            });

        return lines
            .join('\n')
            .trimEnd();
    }

    /**
     * The height of the highest element in the diagram
     *
     * @return {number}
     */
    get height() {
        return this.reduce((previous, current) => {
            if (Number.isNaN(Number.parseInt(current.height, 10))) return previous;
            return Math.max(current.height, previous);
        }, 0);
    }

    /**
     * Draw an outlined box with some string contents. Content can be multiline.
     * Boxes are flexible enough to contain other diagrams allowing you to
     * create complex nested structures.
     *
     * @param {string} contents
     * @param {object} [options={}]
     * @return {Diagram} this
     */
    box(contents, options={}) {
        options = Object.assign({}, this.options, options);

        this.push(new Box(contents, options, this));
        return this;
    }

    /**
     * A borderless box with some string contents and no padding. Content can
     * be multiline. Containers are flexible enough to contain other diagrams
     * allowing you to create complex nested structures.
     *
     * @param {string} contents
     * @param {object} [options={}]
     * @return {Diagram} this
     */
    container(contents, options={}) {
        options = Object.assign({}, this.options, options);

        this.push(new Container(contents, options, this));
        return this;
    }

    /**
     * Draw one or more lines to link elements. Lines spread out to take
     * advantage of the available height.
     *
     * @param {number|string[]} lines
     * @param {object} [options={}]
     * @return {Diagram} this
     */
    line(lines=1, options={}) {
        options = Object.assign({}, this.options, options);

        this.push(new Line(lines, options, this));
        return this;
    }

    /**
     * Draw one or more arrows to link elements. Arrows spread out to take
     * advantage of the available height.
     *
     * @param {number|string[]} arrows
     * @param {object} [options={}]
     * @return {Diagram} this
     */
    arrow(arrows, options={}) {
        options = Object.assign({}, this.options, options);

        this.push(new Arrow([...arrows], options, this))
        return this;
    }

    /**
     * Add some space between elements.
     *
     * @param {number} [size]
     * @return {Diagram} this
     */
    space(size=this.options.size) {
        this.push(new Spacer(size, this));
        return this;
    }
}
module.exports = Diagram;
