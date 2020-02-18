const chalk = require('chalk');
const Element = require('../../src/element');
const Box = require('../../src/box');

const undent = require('../resources/undent');

const singleLineContent = 'Hello, Box!';
const multiLineContent = undent`
    This is my box. There are many like it, but this one is mine.

    My box is my best friend. It is my life. I must master it as I must
    master my life.

    Without me, my box is useless. Without my box, I am useless. I must
    fire my box true. I must draw straighter than my enemy who is
    trying to kill me. I must draw him before he draws me. I will ...

    My box and I know that what counts in war is not the rounds we fire,
    the noise of our burst, nor the smoke we make. We know that it is
    the hits that count. We will hit ...

    My box is human, even as I, because it is my life. Thus, I will
    learn it as a brother. I will learn its weaknesses, its strength,
    its parts, its accessories, its sights and its barrel. I will keep
    my box clean and ready, even as I am clean and ready. We will become
    part of each other. We will ...

    Before God, I swear this creed. My box and I are the defenders of my
    country. We are the masters of our enemy. We are the saviors of my
    life.

    So be it, until victory is America's and there is no enemy, but
    peace!
`;



describe('Box', function() {
    it('extends Element', function() {
        const box = new Box();

        expect(box instanceof Element).to.be.true;
    });

    it('draws a box without content', function() {
        const box = new Box();

        expect(box.toString()).to.equal(
            '┌──────┐\n' +
            '│      │\n' +
            '│      │\n' +
            '│      │\n' +
            '└──────┘');
    });

    it('draws a box with a single line of content', function() {
        const box = new Box(singleLineContent);

        expect(box.toString()).to.equal(
            '┌─────────────────┐\n' +
            '│                 │\n' +
            '│   Hello, Box!   │\n' +
            '│                 │\n' +
            '└─────────────────┘');
    });

    it('draws a box with a multiple lines of content', function() {
        const box = new Box(multiLineContent);

        expect(box.toString()).to.equal(
            `┌──────────────────────────────────────────────────────────────────────────┐\n` +
            `│                                                                          │\n` +
            `│   This is my box. There are many like it, but this one is mine.          │\n` +
            `│                                                                          │\n` +
            `│   My box is my best friend. It is my life. I must master it as I must    │\n` +
            `│   master my life.                                                        │\n` +
            `│                                                                          │\n` +
            `│   Without me, my box is useless. Without my box, I am useless. I must    │\n` +
            `│   fire my box true. I must draw straighter than my enemy who is          │\n` +
            `│   trying to kill me. I must draw him before he draws me. I will ...      │\n` +
            `│                                                                          │\n` +
            `│   My box and I know that what counts in war is not the rounds we fire,   │\n` +
            `│   the noise of our burst, nor the smoke we make. We know that it is      │\n` +
            `│   the hits that count. We will hit ...                                   │\n` +
            `│                                                                          │\n` +
            `│   My box is human, even as I, because it is my life. Thus, I will        │\n` +
            `│   learn it as a brother. I will learn its weaknesses, its strength,      │\n` +
            `│   its parts, its accessories, its sights and its barrel. I will keep     │\n` +
            `│   my box clean and ready, even as I am clean and ready. We will become   │\n` +
            `│   part of each other. We will ...                                        │\n` +
            `│                                                                          │\n` +
            `│   Before God, I swear this creed. My box and I are the defenders of my   │\n` +
            `│   country. We are the masters of our enemy. We are the saviors of my     │\n` +
            `│   life.                                                                  │\n` +
            `│                                                                          │\n` +
            `│   So be it, until victory is America's and there is no enemy, but        │\n` +
            `│   peace!                                                                 │\n` +
            `│                                                                          │\n` +
            `└──────────────────────────────────────────────────────────────────────────┘`);
    });

    it('draws a box containing a box', function() {
        const box = new Box(new Box(singleLineContent));

        expect(box.toString()).to.equal(
            '┌─────────────────────────┐\n' +
            '│                         │\n' +
            '│   ┌─────────────────┐   │\n' +
            '│   │                 │   │\n' +
            '│   │   Hello, Box!   │   │\n' +
            '│   │                 │   │\n' +
            '│   └─────────────────┘   │\n' +
            '│                         │\n' +
            '└─────────────────────────┘');
    });

    describe('get height', function() {
        it('returns the height of a single-line drawn box', function() {
            const box = new Box(singleLineContent);

            expect(box.height).to.equal(box.toString().split('\n').length);
        });

        it('returns the height of a multi-line drawn box', function() {
            const box = new Box(multiLineContent);

            expect(box.height).to.equal(box.toString().split('\n').length);
        });

        it('returns the height of a box containing a box', function() {
            const box = new Box(new Box(multiLineContent));

            expect(box.height).to.equal(box.toString().split('\n').length);
        });
    });

    context('Options', function() {
        describe('color', function() {
            it('colors the drawn box', function() {
                const box = new Box('Hello, Box!\n\n\nYou square!', {color: 'red'});

                expect(box.toString()).to.equal(chalk.red(
                    '┌─────────────────┐\n' +
                    '│                 │\n' +
                    '│   Hello, Box!   │\n' +
                    '│                 │\n' +
                    '│                 │\n' +
                    '│   You square!   │\n' +
                    '│                 │\n' +
                    '└─────────────────┘'));
            });
        });

        describe('size', function() {
            it('applies padding (1) to the drawn box', function() {
                const box = new Box('Hello, Box!\n\n\nYou square!', {size: 1});

                expect(box.toString()).to.equal(
                    '┌─────────────────┐\n' +
                    '│                 │\n' +
                    '│   Hello, Box!   │\n' +
                    '│                 │\n' +
                    '│                 │\n' +
                    '│   You square!   │\n' +
                    '│                 │\n' +
                    '└─────────────────┘');
            });

            it('applies padding (5) to the drawn box', function() {
                const box = new Box('Hello, Box!\n\n\nYou square!', {size: 5});

                expect(box.toString()).to.equal(
                    '┌─────────────────────────────────────────┐\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '│               Hello, Box!               │\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '│               You square!               │\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '│                                         │\n' +
                    '└─────────────────────────────────────────┘');
            });
        });
    });
});
