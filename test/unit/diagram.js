const sinon = require('sinon');

const Diagram = require('../../src/diagram');
const Box = require('../../src/box');
const Container = require('../../src/container');
const Line = require('../../src/line');
const Arrow = require('../../src/arrow');

describe('Diagram', function() {
    it('extends Array', function() {
        const diagram = new Diagram();

        expect(diagram instanceof Diagram).to.be.true;
        /* eslint-disable-next-line unicorn/no-array-instanceof */
        expect(diagram instanceof Array).to.be.true;
    });

    it('initializes the options', function() {
        const diagram = new Diagram({options: true});

        expect(diagram.options).to.deep.equal({options: true});
    });

    describe('get height', function() {
        it('returns 0 when there are no elements', function() {
            const diagram = new Diagram({options: true});

            expect(diagram.height).to.equal(0);
        });

        it('returns the height of the only element', function() {
            const diagram = new Diagram({options: true});

            diagram.push({height: 5});

            expect(diagram.height).to.equal(5);
        });

        it('returns the highest of multiple elements', function() {
            const diagram = new Diagram({options: true});

            diagram.push({height: 5});
            diagram.push({height: 15});
            diagram.push({height: 10});
            diagram.push({height: 11});

            expect(diagram.height).to.equal(15);
        });
    });

    describe('box', function() {
        it('adds a new Box element to the diagram', function() {
            sinon.restore();
            const diagram = new Diagram({options: true});

            diagram.box('hey', {overwritten: true});

            expect(diagram).to.be.lengthOf(1);
            expect(diagram[0] instanceof Box).to.be.true;
            expect(diagram[0].content).to.equal('hey');
            expect(diagram[0].options.options).to.be.true;
            expect(diagram[0].options.overwritten).to.be.true;
        });

        it('adds a new Box element to the diagram multiple times', function() {
            const diagram = new Diagram({options: true});

            diagram
                .box('hello')
                .box('world')
                .box('bye')
                .box('sky');

            expect(diagram).to.be.lengthOf(4);
            expect(diagram.map((n) => n.content)).to.deep.equal([
                'hello',
                'world',
                'bye',
                'sky',
            ]);
        });

        it('returns this', function() {
            const diagram = new Diagram({options: true});

            const result = diagram.box('hello');

            expect(result instanceof Diagram).to.be.true;
        });
    });

    describe('container', function() {
        it('adds a new Container element to the diagram', function() {
            sinon.restore();
            const diagram = new Diagram({options: true});

            diagram.container('hey', {overwritten: true});

            expect(diagram).to.be.lengthOf(1);
            expect(diagram[0] instanceof Container).to.be.true;
            expect(diagram[0].content).to.equal('hey');
            expect(diagram[0].options.options).to.be.true;
            expect(diagram[0].options.overwritten).to.be.true;
        });

        it('adds a new Container element to the diagram multiple times', function() {
            const diagram = new Diagram({options: true});

            diagram
                .container('hello')
                .container('world')
                .container('bye')
                .container('sky');

            expect(diagram).to.be.lengthOf(4);
            expect(diagram.map((n) => n.content)).to.deep.equal([
                'hello',
                'world',
                'bye',
                'sky',
            ]);
        });

        it('returns this', function() {
            const diagram = new Diagram({options: true});

            const result = diagram.container('hello');

            expect(result instanceof Diagram).to.be.true;
        });
    });

    describe('line', function() {
        it('adds a new Line element to the diagram', function() {
            sinon.restore();
            const diagram = new Diagram({options: true});

            diagram.line(2, {overwritten: true});

            expect(diagram).to.be.lengthOf(1);
            expect(diagram[0] instanceof Line).to.be.true;
            expect(diagram[0].count).to.equal(2);
            expect(diagram[0].options.options).to.be.true;
            expect(diagram[0].options.overwritten).to.be.true;
        });

        it('adds a new Line element to the diagram multiple times', function() {
            const diagram = new Diagram({options: true});

            diagram
                .line(1)
                .line(2)
                .line(3)
                .line(4);

            expect(diagram).to.be.lengthOf(4);
            expect(diagram.map((n) => n.count)).to.deep.equal([
                1,
                2,
                3,
                4,
            ])
        });

        it('returns this', function() {
            const diagram = new Diagram({options: true});

            const result = diagram.line(4);

            expect(result instanceof Diagram).to.be.true;
        });
    });

    describe('arrow', function() {
        it('adds a new Arrow element to the diagram', function() {
            sinon.restore();
            const diagram = new Diagram({options: true});

            diagram.arrow(['<--'], {overwritten: true});

            expect(diagram).to.be.lengthOf(1);
            expect(diagram[0] instanceof Arrow).to.be.true;
            expect(diagram[0].directions).to.deep.equal([
                '<--',
            ]);
            expect(diagram[0].labels).to.deep.equal([
                undefined,
            ]);
            expect(diagram[0].options.options).to.be.true;
            expect(diagram[0].options.overwritten).to.be.true;
        });

        it('adds a new Arrow element to the diagram multiple times', function() {
            const diagram = new Diagram({options: true});

            diagram
                .arrow(['-->'])
                .arrow(['<->'])
                .arrow(['<--'])
                .arrow(['---']);

            expect(diagram).to.be.lengthOf(4);
            expect(diagram.map((n) => n.directions)).to.deep.equal([
                ['-->'],
                ['<->'],
                ['<--'],
                ['---'],
            ]);
            expect(diagram.map((n) => n.labels)).to.deep.equal([
                [undefined],
                [undefined],
                [undefined],
                [undefined],
            ]);
        });

        it('returns this', function() {
            const diagram = new Diagram({options: true});

            const result = diagram.arrow(['<->']);

            expect(result instanceof Diagram).to.be.true;
        });
    });

    describe('space', function() {
        it('adds a new Spacer element to the diagram', function() {
            sinon.restore();
            const diagram = new Diagram({options: true});

            diagram.space(1, 'foo');

            expect(diagram).to.be.lengthOf(1);
            expect(diagram[0]).to.deep.equal({
                size: 1,
                diagram,
            });
        });

        it('adds a new Spacer element to the diagram multiple times', function() {
            const diagram = new Diagram({options: true});

            diagram
                .space(1)
                .space(2)
                .space(3)
                .space(4);

            expect(diagram).to.be.lengthOf(4);
            expect(diagram.map((n) => n.size)).to.deep.equal([
                1,
                2,
                3,
                4,
            ]);
        });

        it('returns this', function() {
            const diagram = new Diagram({options: true});

            const result = diagram.space(1);

            expect(result instanceof Diagram).to.be.true;
        });
    });
});
