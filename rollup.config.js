import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import { eslint } from 'rollup-plugin-eslint'
import { uglify } from 'rollup-plugin-uglify'

const isProd = process.env.NODE_ENV === 'prod'
const getConfig = (format, min = false) => {
  const output = Object.assign(
    isProd
      ? {
          file: `dist/index.${format}.${min ? 'min.' : ''}js`,
          format
        }
      : {
          file: 'build/index.js',
          format: 'cjs'
        },
    format === 'umd' ? { name: 'dj' } : {}
  )
  return {
    input: 'src/index.js',
    output,
    plugins: [
      eslint(),
      buble(),
      resolve(),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false
      }),
      min ? uglify() : null
    ],
    watch: {
      clearScreen: false
    }
  }
}

export default (isProd
  ? [
      getConfig('cjs', false),
      getConfig('cjs', true),
      getConfig('umd', false),
      getConfig('umd', true)
    ]
  : getConfig())
