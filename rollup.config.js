import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy'

import pkg from './package.json'

export default {
  input: 'src/AutoSearch.tsx',
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
    copy({
      targets: [
        { src: 'src/ReleaseNotes.mdx', dest: 'dist/' }
      ]
    }),
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
