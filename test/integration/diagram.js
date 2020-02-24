const Diagram = require('../../src/diagram');
const outdent = require('outdent');

describe.only('Example diagrams', function() {
    it('is a simple diagram of three boxes with arrows', function() {
        const diagram = new Diagram()
            .box('left')
            .arrow(['<--'])
            .box('middle')
            .arrow(['-->', '<--'])
            .box('right');

        expect(diagram.toString()).to.equal(outdent`
            ┌──────────┐    ┌────────────┐    ┌───────────┐
            │          │    │            │───▶│           │
            │   left   │◀───│   middle   │    │   right   │
            │          │    │            │◀───│           │
            └──────────┘    └────────────┘    └───────────┘
        `);
    });

    it('is a diagram of three boxes of varying height from '
            + '(ltr) short to high', function() {
        const diagram = new Diagram()
            .box('short left')
            .line(3)
            .box('medium\nmiddle')
            .line(1)
            .box('high\n\nright');

        expect(diagram.draw()).to.equal(outdent`
            ┌────────────────┐    ┌────────────┐    ┌───────────┐
            │                │────│            │    │           │
            │   short left   │────│   medium   │    │   high    │
            │                │────│   middle   │────│           │
            └────────────────┘    │            │    │   right   │
                                  └────────────┘    │           │
                                                    └───────────┘
        `);
    });

    it('is a diagram of three boxes of varying height from '
            + '(ltr) high to short', function() {
        const diagram = new Diagram()
            .box('high\n\nleft')
            .line(3)
            .box('medium\nmiddle')
            .line(1)
            .box('short right');

        expect(diagram.draw()).to.equal(outdent`
            ┌──────────┐    ┌────────────┐    ┌─────────────────┐
            │          │────│            │    │                 │
            │   high   │    │   medium   │────│   short right   │
            │          │────│   middle   │    │                 │
            │   left   │    │            │    └─────────────────┘
            │          │────└────────────┘
            └──────────┘
        `);
    });

    it('is an Olympics podium', function() {
        const diagram = new Diagram()
            .box('   2   ', {size: 2})
            .box('1', {size: 3})
            .box('      3      ', {size: 1});

        expect(diagram.draw()).to.equal(outdent`
            ┌───────────────────┐┌───────────────────┐┌───────────────────┐
            │                   ││                   ││                   │
            │                   ││                   ││         3         │
            │         2         ││                   ││                   │
            │                   ││         1         │└───────────────────┘
            │                   ││                   │
            └───────────────────┘│                   │
                                 │                   │
                                 └───────────────────┘
        `);
    });

    it('features some spaced boxes', function() {
        const diagram = new Diagram()
            .box(`I feel so small`, {size: 0})
            .space(5)
            .box('Give me some space, man!');

        expect(diagram.draw()).to.equal(outdent`
            ┌───────────────┐               ┌──────────────────────────────┐
            │I feel so small│               │                              │
            └───────────────┘               │   Give me some space, man!   │
                                            │                              │
                                            └──────────────────────────────┘
        `);
    });


    it('is a nested diagram', function() {
        const inner = new Diagram()
            .box(`Yes yes girl`)
            .arrow(['-->'])
            .box('*Steal lemons*');

        const outer = new Diagram()
            .box(`Get lemons\n${inner}\n${inner}`)
            .arrow(['-->'])
            .box('Lemonade');

        expect(outer.draw()).to.equal(outdent`
            ┌────────────────────────────────────────────────────┐    ┌──────────────┐
            │                                                    │    │              │
            │   Get lemons                                       │───▶│   Lemonade   │
            │   ┌──────────────────┐    ┌────────────────────┐   │    │              │
            │   │                  │    │                    │   │    └──────────────┘
            │   │   Yes yes girl   │───▶│   *Steal lemons*   │   │
            │   │                  │    │                    │   │
            │   └──────────────────┘    └────────────────────┘   │
            │   ┌──────────────────┐    ┌────────────────────┐   │
            │   │                  │    │                    │   │
            │   │   Yes yes girl   │───▶│   *Steal lemons*   │   │
            │   │                  │    │                    │   │
            │   └──────────────────┘    └────────────────────┘   │
            │                                                    │
            └────────────────────────────────────────────────────┘
        `);
    });

    it('has no boxes', function() {
        const diagram = new Diagram()
            .arrow(['-->'])
            .space(2)
            .line(4)
            .arrow(['<--', '--x'])
            .space(10);

        expect(diagram.draw()).to.equal(outdent`
            ───▶      ────
                      ────◀───
                      ────
                      ───────X
        `);
    });


    it('has labeled lines and arrows', function() {
        const diagram = new Diagram()
            .box(`box`)
            .line(['label A', null, 'B'])
            .box('box')
            .arrow(['left:to the left', 'right:right'])
            .box('box');

        expect(diagram.draw()).to.equal(outdent`
            ┌─────────┐             ┌─────────┐                 ┌─────────┐
            │         │──┤label A├──│         │◀─┤to the left├──│         │
            │   box   │─────────────│   box   │                 │   box   │
            │         │──┤B      ├──│         │──┤right      ├─▶│         │
            └─────────┘             └─────────┘                 └─────────┘
        `);
    });
});
