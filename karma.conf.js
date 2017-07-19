module.exports = function (config) {
    var configuration = {
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" },
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"],
            '**/*.js.map': ['sourcemap']
        },
        reporters: ["karma-typescript", "spec"],
        karmaTypescriptConfig: {
            compilerOptions: {
                lib: ["es6", "dom"]
            }
        },
        browsers: ["Chrome"],
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
}; 