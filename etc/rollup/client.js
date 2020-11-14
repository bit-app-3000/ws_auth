import nodeResolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/client/index.js',
  output: {
    file: 'dist/client/index.js',
    format: 'es'
  },
  external: ['firebase'],
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
    nodeResolve(),
    livereload()
  ]
}



// commonjs({
//   include: 'node_modules/**'
// }),
// {
//   browser: true,
//     jsnext: true
//   // main: true,
//   //dedupe: true
// }
