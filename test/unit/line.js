const color = require('ansi-colors');
const Element = require('../../src/element');
const Line = require('../../src/line');

describe('Line', function() {
    it('extends Element', function() {
        const line = new Line();

        expect(line instanceof Element).to.be.true;
    });

    it('draws a single line without an object defined with an array', function() {
        const line = new Line([undefined], {}, []);

        expect(line.toString()).to.equal(
            '────');
    });

    it('draws a single line without an object', function() {
        const line = new Line(1, {}, []);

        expect(line.toString()).to.equal(
            '────');
    });

    it('draws a single line to an object of height 5', function() {
        const line = new Line(1, {}, [
            {ownHeight: 5},
        ]);

        expect(line.toString()).to.equal(
            '    \n' +
            '    \n' +
            '────\n' +
            '    \n' +
            '    ');
    });

    it('draws two lines to an object of height 5', function() {
        const line = new Line(2, {}, [
            {ownHeight: 5},
        ]);

        expect(line.toString()).to.equal(
            '    \n' +
            '────\n' +
            '    \n' +
            '────\n' +
            '    ');
    });

    it('draws three lines to an object of height 5', function() {
        const line = new Line(3, {}, [
            {ownHeight: 5},
        ]);

        expect(line.toString()).to.equal(
            '    \n' +
            '────\n' +
            '────\n' +
            '────\n' +
            '    ');
    });

    it('spreads out the lines as far as possible', function() {
        const line = new Line(2, {}, [
            {ownHeight: 4},
        ]);

        expect(line.toString()).to.equal(
            '    \n' +
            '────\n' +
            '    \n' +
            '────');
    });

    it('draws four lines to an object of height 5', function() {
        const line = new Line(4, {}, [
            {ownHeight: 5},
        ]);

        expect(line.toString()).to.equal(
            '────\n' +
            '────\n' +
            '────\n' +
            '────\n' +
            '    ');
    });

    it('draws lines evenly spread out when the numbers line up perfectly', function() {
        const line = new Line(4, {}, [
            {ownHeight: 12},
        ]);

        expect(line.toString()).to.equal(
            '    \n' +
            '────\n' +
            '    \n' +
            '    \n' +
            '────\n' +
            '    \n' +
            '    \n' +
            '────\n' +
            '    \n' +
            '    \n' +
            '────\n' +
            '    ');
    });


    it('draws lines evenly spread out when the number do not line up perfectly', function() {
        const line = new Line(5, {}, [
            {ownHeight: 12},
        ]);

        expect(line.toString()).to.equal(
            '    \n' +
            '────\n' +
            '    \n' +
            '────\n' +
            '    \n' +
            '────\n' +
            '    \n' +
            '    \n' +
            '────\n' +
            '    \n' +
            '────\n' +
            '    ');
    });

    describe('get width', function() {
        it('returns the width of the line', function() {
            const line = new Line(1, {size: 1}, []);

            expect(line.width).to.equal(4);
        });

        it('returns the width of the line + the width of the label', function() {
            const line = new Line(['12345'], {size: 1}, []);

            expect(line.width).to.equal(11);
        });
    });

    describe('get height', function() {
        it('retuns the line count when there is no object attached', function() {
            const line = new Line(4, {}, []);

            expect(line.height).to.equal(4);
        });

        it('retuns the line count when the object attached is lower than '
                + 'the linecount', function() {
            const line = new Line(4, {}, [
                {ownHeight: 2},
            ]);

            expect(line.height).to.equal(4);
        });

        it('retuns the height of the attached object on the left side', function() {
            const diagram = [];
            const line = new Line(4, {}, diagram);

            line.diagram = [
                {ownHeight: 10},
                line,
            ]

            expect(line.height).to.equal(10);
        });

        it('retuns the height of the attached object on the right side', function() {
            const diagram = [];
            const line = new Line(4, {}, diagram);

            line.diagram = [
                line,
                {ownHeight: 10},
            ]

            expect(line.height).to.equal(10);
        });


        it('retuns the height of the lowest attached object', function() {
            const diagram = [];
            const line = new Line(4, {}, diagram);

            line.diagram = [
                {ownHeight: 15},
                line,
                {ownHeight: 10},
            ]

            expect(line.height).to.equal(10);
        });
    });

    context('Labels', function() {
        it('adds a label to a single line', function() {
            const line = new Line(['label'], {}, []);

            expect(line.toString()).to.equal('──┤label├──');
        });

        it('adds a label to a multiple lines', function() {
            const line = new Line(['label', 'hello'], {}, []);

            expect(line.toString()).to.equal(
                '──┤label├──\n' +
                '──┤hello├──');
        });

        it('adds a label to a some of the lines', function() {
            const line = new Line(['label', 'hello', null], {}, []);

            expect(line.toString()).to.equal(
                '──┤label├──\n' +
                '──┤hello├──\n' +
                '───────────');
        });

        it('makes all labels the same width', function() {
            const line = new Line(['long label', 'short'], {}, []);

            expect(line.toString()).to.equal(
                '──┤long label├──\n' +
                '──┤short     ├──');
        });
    });

    context('Options', function() {
        describe('color', function() {
            it('colors the drawn lines', function() {
                const line = new Line(2, {color: 'red'}, []);

                expect(line.toString()).to.equal(color.red(
                    '────\n' +
                    '────'));
            });
        });

        describe('size', function() {
            it('widens the lines', function() {
                const line = new Line(2, {size: 5}, []);

                expect(line.toString()).to.equal(
                    '────────────────\n' +
                    '────────────────');
            });

            it('shortens the lines', function() {
                const line = new Line(2, {size: 0}, []);

                expect(line.toString()).to.equal(
                    '─\n' +
                    '─');
            });
        });
    });
});
