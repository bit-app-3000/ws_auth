// import dev from 'rollup-plugin-dev'

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/client/index.js',
  output: {
    file: 'dist/client/index.js',
    format: 'iife'
  },
  plugins: [
    serve({
      open: false,
      contentBase: ['dist/assets', 'dist/client', 'src/static'],
      historyApiFallback: true,
      host: 'localhost',
      port: 9494,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }),
    resolve(),
    livereload()
  ]
}
