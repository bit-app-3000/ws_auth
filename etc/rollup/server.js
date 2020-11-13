import commonjs from '@rollup/plugin-commonjs'
import run from '@rollup/plugin-run'

export default {
  input: 'src/server/index.js',
  external: ['http', 'fs', 'path', 'find-my-way', 'primus', 'primus-emit'],
  output: {
    file: 'dist/server/index.js',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    run()
  ]
}

// import { nodeResolve } from '@rollup/plugin-node-resolve'
// nodePolyfills(),
// nodeResolve({
//   preferBuiltins: true
//   ///   jsnext: true,
//   // modulesOnly: true,
//   // main: true
// }),
// resolve(),
