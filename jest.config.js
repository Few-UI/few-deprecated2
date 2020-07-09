/* eslint-env node */
module.exports = {
    // roots: [ '<rootDir>' ],
    transform: {
        // '^.+\\.tsx?$': 'ts-jest'
        // TODO: switch to babel-jest later
        '^.+\\.tsx?$': [ 'babel-jest', {
                exclude: 'node_modules/**',
                presets: [
                    [ '@babel/preset-env', {
                        // modules: 'commonjs'
                        targets: {
                            // browsers: [ 'last 2 versions', 'ie >= 11' ]
                            browsers: [ 'last 1 chrome versions' ]
                        }
                    } ],
                    // https://github.com/facebook/create-react-app/blob/f5c3bdb65480f93b2d4a4c2f3214fc50753de434/packages/babel-preset-react-app/create.js
                    [ '@babel/preset-react', {
                        // pragma: 'this.$createElement'
                        // align with vue
                        pragma: 'h',
                        pragmaFrag: 'h.Fragment',
                        // development: true,
                        useBuiltIns: true
                    } ],
                    '@babel/preset-typescript'
                ]
                // babelHelpers: 'bundled',
                // extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
        } ]
    },
    // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    testMatch: [
        '**/*.test.[tj]s?(x)'
        // '**/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?(x)'
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}'
    ],
    moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json', 'node' ],
    /*
    globals: {
        'ts-jest': {
            babelConfig: {
                exclude: 'node_modules/**',
                presets: [
                    [ '@babel/preset-env', {
                        // modules: 'commonjs'
                        targets: {
                            // browsers: [ 'last 2 versions', 'ie >= 11' ]
                            browsers: [ 'last 1 chrome versions' ]
                        }
                    } ],
                    // https://github.com/facebook/create-react-app/blob/f5c3bdb65480f93b2d4a4c2f3214fc50753de434/packages/babel-preset-react-app/create.js
                    [ '@babel/preset-react', {
                        // pragma: 'this.$createElement'
                        // align with vue
                        pragma: 'h',
                        pragmaFrag: 'h.Fragment',
                        // development: true,
                        useBuiltIns: true
                    } ]
                    // '@babel/preset-typescript'
                ]
                // extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
            }
        }
    },
    */
    // this is needed even ts-jest is there
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    setupFiles: [
        // '<rootDir>/node_modules/babel-polyfill/dist/polyfill.js'
    ],
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'
    ]
};
