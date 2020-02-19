const fs = require('fs');
const path = require('path');
const text2png = require('text2png');
const Diagram = require('..');

const cli = new Diagram()
    .box('Not actually a CLI\npackage. Not yet');

const easy = new Diagram()
    .box('Easy to use');

const awesome = new Diagram()
    .box('Pretty awesome');

const capable = new Diagram()
    .box('Needlessly capable');

const diagram = new Diagram()
    .container( capable + '\n' + cli)
    .arrow(['<--', '<--'])
    .box('cli-diagram is...\n\n\n\n\n')
    .arrow(['-->', '-->'])
    .container( easy + '\n' + awesome);

console.log(diagram.draw());

const png = text2png(diagram.draw(), {
    font: '18px Consolas',
    textAlign: 'left',
    color: 'white',
    backgroundColor: '#222222',
    padding: 10,
});
const filePath = path.join(__dirname, './example.png');
fs.writeFileSync(filePath, png);
console.log('Saved to ' + filePath);
