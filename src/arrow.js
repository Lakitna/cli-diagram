const Line = require('./line');

class Arrow extends Line {
    constructor(directions=[], options, diagram) {
        super(directions.length, options, diagram);
        this.parse(directions);
    }

    toString() {
        const gap = ' '.repeat(this.width);
        const directions = [...this.directions];
        const labels = [...this.labels];

        const result = this.layout
            .map((line) => {
                if (line === true) {
                    return this.buildArrow(directions.shift(), labels.shift());
                }
                return gap;
            })
            .join('\n');
        return this.style(result);
    }

    parse(definitions) {
        this.directions = [];
        this.labels = [];

        definitions
            .map((definition) => {
                if (typeof definition === 'string') {
                    const [direction, label] = definition.split(':');
                    return {direction: direction.toLowerCase(), label};
                }
                return definition;
            })
            .forEach((definition) => {
                this.directions.push(definition.direction);
                this.labels.push(definition.label);
            });

        this.labels = this.parseLabels(this.labels);
    }

    buildArrow(direction, label) {
        const shaft = this.buildShaft(label);

        switch (direction) {
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
