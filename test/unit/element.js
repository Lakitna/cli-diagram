const color = require('ansi-colors');
const Element = require('../../src/element');

describe('Element', function() {
    it('sets the default options when none are provided', function() {
        const element = new Element();

        expect(element.options).to.deep.equal({
            size: 1,
            color: null,
            verticalAlign: 'top',
        });
    });

    it('overwrites the default option when one is provided', function() {
        const element = new Element({
            size: 5,
        });

        expect(element.options).to.deep.equal({
            size: 5,
            color: null,
            verticalAlign: 'top',
        });
    });

    describe('get height', function() {
        it('returns the value of options.size', function() {
            const element = new Element({
                size: 5,
            });

            expect(element.height).to.equal(5);
        });
    });

    describe('style', function() {
        it('returns the input with option.color applied', function() {
            const element = new Element({
                color: 'red',
            });

            expect(element.style('foo bar baz')).to.equal(color.red('foo bar baz'));
        });

        it('returns the input when no options.color is set', function() {
            const element = new Element();

            expect(element.style('foo bar baz')).to.equal('foo bar baz');
        });

        it('returns the input when an unkown options.color is set', function() {
            const element = new Element({
                color: 'someUnkownColor',
            });

            expect(element.style('foo bar baz')).to.equal('foo bar baz');
        });
    });
});
