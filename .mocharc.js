module.exports = {
    diff: true,
    extension: ['js'],
    package: './package.json',
    reporter: 'spec',
    slow: 75,
    timeout: 2000,
    ui: 'bdd',
    recursive: true,
    file: [
        'test/setup.js',
    ],
    require: [
        'choma',
        'chai/register-expect',
    ],
};
