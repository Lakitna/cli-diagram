const chalk = require('chalk');
const Element = require('../../src/element');
const Line = require('../../src/line');
const Arrow = require('../../src/arrow');

describe('Arrow', function() {
    it('extends Element', function() {
        const arrow = new Arrow();

        expect(arrow instanceof Element).to.be.true;
    });

    it('extends Line', function() {
        const arrow = new Arrow();

        expect(arrow instanceof Line).to.be.true;
    });

    it('initializes without arrows', function() {
        const arrow = new Arrow();

        expect(arrow.directions).to.deep.equal([]);
    });

    it('draws a single headless arrow without an object', function() {
        const arrow = new Arrow(['unkownDirection'], {}, []);

        expect(arrow.toString()).to.equal(
            '────');
    });

    it('draws a single left arrow without an object', function() {
        const arrow = new Arrow(['left'], {}, []);

        expect(arrow.toString()).to.equal(
            '◀───');
    });

    it('draws a single right arrow without an object', function() {
        const arrow = new Arrow(['right'], {}, []);

        expect(arrow.toString()).to.equal(
            '───▶');
    });

    it('draws a single bidirectional arrow without an object', function() {
        const arrow = new Arrow(['both'], {}, []);

        expect(arrow.toString()).to.equal(
            '◀──▶');
    });

    it('draws arrow spread out evently', function() {
        const arrow = new Arrow(['left', 'right'], {}, [{ownHeight: 5}]);

        expect(arrow.toString()).to.equal(
            '    \n' +
            '◀───\n' +
            '    \n' +
            '───▶\n' +
            '    ');
    });

    describe('Labels', function() {
        it('draws a single labeled arrow', function() {
            const arrow = new Arrow(['left:label'], {}, []);

            expect(arrow.toString()).to.equal(
                '◀─┤label├──');
        });

        it('draws a single labeled arrow and an unlabeled arrow', function() {
            const arrow = new Arrow(['left:label', 'right'], {}, []);

            expect(arrow.toString()).to.equal(
                '◀─┤label├──\n' +
                '──────────▶');
        });

        it('draws multiple labeled arrows', function() {
            const arrow = new Arrow([
                'left:label',
                'right:a longer label',
                'both:Hello, label!',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                '◀─┤label         ├──\n' +
                '──┤a longer label├─▶\n' +
                '◀─┤Hello, label! ├─▶');
        });
    });

    describe('Styles', function() {
        it('is a normal left arrow', function() {
            const arrow = new Arrow([
                '<--',
                'left',
                'LeFT',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                '◀───\n' +
                '◀───\n' +
                '◀───');
        });

        it('is a normal right arrow', function() {
            const arrow = new Arrow([
                '-->',
                'right',
                'rIgHT',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                '───▶\n' +
                '───▶\n' +
                '───▶');
        });

        it('is a normal bidirectional arrow', function() {
            const arrow = new Arrow([
                '<->',
                'both',
                'bOtH',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                '◀──▶\n' +
                '◀──▶\n' +
                '◀──▶');
        });

        it('is a broken left arrow', function() {
            const arrow = new Arrow([
                'x--',
                'X--',
                'broken-left',
                'bRoKEn-LeFt',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                'X───\n' +
                'X───\n' +
                'X───\n' +
                'X───');
        });

        it('is a broken right arrow', function() {
            const arrow = new Arrow([
                '--x',
                '--X',
                'broken-right',
                'bRoKEn-RiGht',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                '───X\n' +
                '───X\n' +
                '───X\n' +
                '───X');
        });

        it('is a broken bidirectional arrow', function() {
            const arrow = new Arrow([
                'x-x',
                'X-X',
                'broken-both',
                'bRoKEn-boTH',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                'X──X\n' +
                'X──X\n' +
                'X──X\n' +
                'X──X');
        });

        it('is a round left arrow', function() {
            const arrow = new Arrow([
                'o--',
                'O--',
                'round-left',
                'rOuND-LeFt',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                'O───\n' +
                'O───\n' +
                'O───\n' +
                'O───');
        });

        it('is a round right arrow', function() {
            const arrow = new Arrow([
                '--o',
                '--O',
                'round-right',
                'rOuND-RiGht',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                '───O\n' +
                '───O\n' +
                '───O\n' +
                '───O');
        });

        it('is a round bidirectional arrow', function() {
            const arrow = new Arrow([
                'o-o',
                'O-O',
                'round-both',
                'rOuND-boTH',
            ], {}, []);

            expect(arrow.toString()).to.equal(
                'O──O\n' +
                'O──O\n' +
                'O──O\n' +
                'O──O');
        });
    });

    describe('parse', function() {
        it('normalizes a direction string without label', function() {
            const arrow = new Arrow(['left']);

            expect(arrow.directions).to.deep.equal([
                {
                    direction: 'left',
                    label: undefined,
                },
            ]);
        });

        it('normalizes a direction string with label', function() {
            const arrow = new Arrow(['left:label']);

            expect(arrow.directions).to.deep.equal([
                {
                    direction: 'left',
                    label: 'label',
                },
            ]);
        });

        it('normalizes a object without label', function() {
            const arrow = new Arrow([{
                direction: 'right',
                label: undefined,
            }]);

            expect(arrow.directions).to.deep.equal([
                {
                    direction: 'right',
                    label: undefined,
                },
            ]);
        });

        it('normalizes a object with label', function() {
            const arrow = new Arrow([{
                direction: 'right',
                label: 'some label',
            }]);

            expect(arrow.directions).to.deep.equal([
                {
                    direction: 'right',
                    label: 'some label',
                },
            ]);
        });

        it('normalizes a combination of string and object definitions', function() {
            const arrow = new Arrow(['left', {
                direction: 'right',
                label: 'some label',
            }, 'both:label', {
                direction: 'left',
                label: undefined,
            }]);

            expect(arrow.directions).to.deep.equal([
                {
                    direction: 'left',
                    label: undefined,
                }, {
                    direction: 'right',
                    label: 'some label',
                }, {
                    direction: 'both',
                    label: 'label     ',
                }, {
                    direction: 'left',
                    label: undefined,
                },
            ]);
        });
    });

    context('Options', function() {
        describe('color', function() {
            it('colors the drawn arrows', function() {
                const arrow = new Arrow(['<--', '-->'], {color: 'red'}, []);

                expect(arrow.toString()).to.equal(chalk.red(
                    '◀───\n' +
                    '───▶'));
            });
        });

        describe('size', function() {
            it('widens the arrows', function() {
                const arrow = new Arrow(['<--', '-->'], {size: 5}, []);

                expect(arrow.toString()).to.equal(
                    '◀───────────────\n' +
                    '───────────────▶');
            });

            it('shortens the arrows', function() {
                const arrow = new Arrow(['<--', '-->'], {size: 0}, []);

                expect(arrow.toString()).to.equal(
                    '◀\n' +
                    '▶');
            });
        });
    });
});
