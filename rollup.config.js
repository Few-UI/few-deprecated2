/* eslint-env node */
// import acornJSX from 'acorn-jsx';
// import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

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
        typescript(),
        // https://github.com/znck/example-functional-rollup-plugin-vue/blob/master/rollup.config.js
        /*
        buble( {
            objectAssign: 'Object.assign',
            jsx: 'h'
        } ),
        */
        /*
        // alternatives for buble
        babel( {
            presets: [ '@babel/preset-react' ]
        } ),
        */
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs( { // converts date-fns to ES modules
            // special setup for react
            // https://zh4ui.net/post/2018-12-23-rollup-typescript-react/
            namedExports: {
                'node_modules/react/index.js': [
                    'createElement',
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
    // https://rollupjs.org/guide/en/#acorninjectplugins
    // required when try to export ES6 code without babel/bubble
    // acornInjectPlugins: [ acornJSX( ) ]
};
