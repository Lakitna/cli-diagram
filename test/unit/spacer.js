const Spacer = require('../../src/spacer');

describe('Spacer', function() {
    it('draws a spacer of size 1', function() {
        const spacer = new Spacer(1, {height: 5});

        expect(spacer.toString()).to.equal(
            '   \n' +
            '   \n' +
            '   \n' +
            '   \n' +
            '   ');
    });

    it('draws a spacer of size 5', function() {
        const spacer = new Spacer(5, {height: 2});

        expect(spacer.toString()).to.equal(
            '               \n' +
            '               ');
    });
});
