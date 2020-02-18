module.exports = function(config) {
    config.set({
        files: [
            'src/**/*',
            'test/**/*',
        ],
        mutator: 'javascript',
        packageManager: 'npm',
        reporters: ['html', 'progress'],
        testRunner: 'mocha',
        transpilers: [],
        testFramework: 'mocha',
        coverageAnalysis: 'perTest',
        mochaOptions: {
            spec: ['./test/**/*'],
        },
        thresholds: {
            high: 80,
            low: 60,
            break: 50,
        },
    });
};
