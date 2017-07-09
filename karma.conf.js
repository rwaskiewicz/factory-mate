module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" },
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"],
            '**/*.js.map': ['sourcemap']
        },
        reporters: ["karma-typescript", "spec"],
        browsers: ["Chrome"],
        karmaTypescriptConfig: {
            compilerOptions: {
                lib: ["es6", "dom"]
            }
        }
    });
}; 