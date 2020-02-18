const Line = require('./line');

class Arrow extends Line {
    constructor(directions=[], options, diagram) {
        super(directions.length, options, diagram);
        this.labelLength = 0;
        this.directions = this.parse(directions);
    }

    get width() {
        if (this.labelLength > 0) {
            return Math.round(super.width) + 3 + this.labelLength;
        }
        return Math.round(super.width) + 1;
    }

    toString() {
        const gap = ' '.repeat(this.buildArrow(this.directions[0]).length);
        const directions = [...this.directions];

        const result = this.layout
            .map((line) => {
                if (line === true) {
                    return this.buildArrow(directions.shift());
                }
                return gap;
            })
            .join('\n');
        return this.style(result);
    }

    parse(definitions) {
        definitions = definitions.map((definition) => {
            if (typeof definition === 'string') {
                const [direction, label] = definition.split(':');
                return {direction: direction.toLowerCase(), label};
            }
            return definition;
        });

        this.labelLength = definitions.reduce((previous, current) => {
            if (typeof current.label === 'string') {
                return Math.max(previous, current.label.length);
            }
            return previous;
        }, 0);

        return definitions.map((definition) => {
            if (typeof definition.label === 'string') {
                definition.label = definition.label.padEnd(this.labelLength);
            }
            return definition;
        });
    }

    buildArrow(arrow) {
        let shaft = '─';

        if (arrow.label === undefined) {
            shaft = shaft.repeat(this.width);
        }
        else {
            const shaftLength = (this.width - this.labelLength - 1) / 2;
            shaft = shaft.repeat(shaftLength)
                + `┤${arrow.label}├`
                + shaft.repeat(shaftLength);
        }

        switch (arrow.direction) {
            case 'left':
            case '<--':
                return '◀' + shaft.slice(1);
            case 'right':
            case '-->':
                return shaft.slice(0, -1) + '▶';
            case 'both':
            case '<->':
                return '◀' + shaft.slice(1, -1) + '▶';

            case 'broken-left':
            case 'x--':
                return 'X' + shaft.slice(1);
            case 'broken-right':
            case '--x':
                return shaft.slice(0, -1) + 'X';
            case 'broken-both':
            case 'x-x':
                return 'X' + shaft.slice(1, -1) + 'X';

            case 'round-left':
            case 'o--':
                return 'O' + shaft.slice(1);
            case 'round-right':
            case '--o':
                return shaft.slice(0, -1) + 'O';
            case 'round-both':
            case 'o-o':
                return 'O' + shaft.slice(1, -1) + 'O';

            default:
                return shaft;
        }
    }
}
module.exports = Arrow;
