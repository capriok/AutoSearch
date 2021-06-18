import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  input: 'src/AutoSearch.Form.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    sass({
      output: true,
      insert: true
    }),
    typescript()
  ],
  external: [
    'react',
    'react-dom'
  ]
}
