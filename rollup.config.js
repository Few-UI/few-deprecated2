/* eslint-env node */
/**
 * For typescript compile, there are 2 different approach
 * - All in babel, which means:
 *   - no tsc and tslib at all
 *     - u can still use tsc --noEmit as 'tslint'
 *   - use @babel/preset-typescript to transpile typescript
 *   - More flexibility in babel feature
 *   - Loosing some typescript feature and type check
 *     - Industry practice is using prettier eslint to fill the type check part.
 *   - https://segmentfault.com/a/1190000021695864
 *
 * - tsc approach
 *   - use tsc + tslib to compile
 *   - all typescript feature support
 *   - complexity comes when we need cusotmization, possibly we have to do
 *     tsc + babel
 *   - How to use ES6 module with a proper tsconfig.json is still a question
 *     mark, the ES6 import will be processed by tsc too with tsconfig.target
 *     to ES5/ES3 and may cause double transpile side effect.
 *
 * - rollup + tsc + JSX + preserve problem
 *   - For tsc, when we set jsx:preserve, the tsc will leave the JSX as it is,
 *     convert *.tsx to *.jsx, and hoping some downstream processor will handle
 *     it.
 *   - At tsconfig, better to set target as ES6 since we will have follow up
 *     transpile.
 *   - At rollup + tsc layer, hack below is needed:
 *     // https://rollupjs.org/guide/en/#acorninjectplugins
 *     // required when try to export ES6 code without babel/bubble
 *     import acornJSX from 'acorn-jsx';
 *     export default {
 *         ...
 *         acornInjectPlugins: [ acornJSX( ) ]
 *     }
 *   - At rollup + babel layer, setup a follow-up transpiler after tsc:
 *     // https://github.com/znck/example-functional-rollup-plugin-vue/blob/master/rollup.config.js
 *     // tested, working. Buble has issue with vue3
 *     buble( {
 *         objectAssign: 'Object.assign',
 *         jsx: 'h'
 *     } ),
 *     // not tested, alternative.
 *     babel( {
 *         extensions: ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs']
 *         presets: [ '@babel/preset-react' ]
 *     } ),
 */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.ts',
    output: {
        file: 'public/bundle.js',
        format: 'iife', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: true
    },
    plugins: [
        resolve( {
            mainFields: [ 'module', 'main', 'jsnext:main', 'browser' ],
            extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
        } ), // tells Rollup how to find date-fns in node_modules
        babel( {
            exclude: 'node_modules/**',
            extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
            presets: [
                [ '@babel/preset-env', {
                    targets: {
                        // browsers: [ 'last 2 versions', 'ie >= 11' ]
                        browsers: [ 'last 1 chrome versions' ]
                    }
                } ],
                [ '@babel/preset-react', {
                    // pragma: 'this.$createElement'
                    // align with vue
                    pragma: 'h'
                } ],
                '@babel/preset-typescript'
            ],
            babelHelpers: 'bundled'
        } ),
        commonjs( { // converts date-fns to ES modules
            // special setup for react
            // https://zh4ui.net/post/2018-12-23-rollup-typescript-react/
            // https://github.com/rollup/rollup-plugin-commonjs/issues/211
            namedExports: {
                'node_modules/react/index.js': [
                    'createElement',
                    'memo',
                    // basic hook
                    'useState',
                    'useEffect',
                    'useContext',
                    // advance hook
                    'useReducer',
                    'useCallback',
                    'useMemo',
                    'useRef',
                    'useImperativeHandle',
                    'useLayoutEffect',
                    'useDebugValue'
                ],
                'node_modules/react-dom/index.js': [
                    'render'
                ],
                'node_modules/vue/index.js': [
                    'createApp',
                    'defineComponent',
                    'reactive',
                    'ref',
                    'h'
                ]
            }
        } ),
        // https://github.com/rollup/rollup/issues/487
        replace( {
            'process.env.NODE_ENV': JSON.stringify( production ? 'production' : 'development' )
        } ),
        production && terser(), // minify, but only in production
        !production && serve( {
            contentBase: 'public',
            host: '0.0.0.0',
            port: 8080
        } )
    ]
};
