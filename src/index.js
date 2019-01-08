import pangu from 'pangu/dist/shared/core'
import { merge } from './utils'
import defaultOptions from './default-options'

const dotsSpaceCjk = /(\.{3,})\s([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g

const dj = (input, userOptions) => {
  const options = merge(defaultOptions, userOptions)
  const {
    spacing,
    successiveExclamationMarks,
    ellipsisTolerance,
    replaceWithCornerQuotes,
    halfwidthParenthesisAroundNumbers
  } = options

  let output = input

  if (spacing) {
    output = pangu.spacing(output).replace(dotsSpaceCjk, '$1$2')
  }

  if (!successiveExclamationMarks) {
    output = output.replace(/！{2,}/g, '！')
  }

  if (ellipsisTolerance === 'none' || ellipsisTolerance === '...') {
    const invalidEllipsis =
      ellipsisTolerance === 'none' ? /[。，、.]{2,}/g : /[。，、]{2,}/g
    output = output.replace(invalidEllipsis, '……')
  }

  if (
    replaceWithCornerQuotes === 'double' ||
    replaceWithCornerQuotes === 'single'
  ) {
    output = output
      .replace(
        replaceWithCornerQuotes === 'double' ? /(“)(.*)(”)/g : /(‘)(.*)(’)/g,
        '「$2」'
      )
      .replace(
        replaceWithCornerQuotes === 'double' ? /(‘)(.*)(’)/g : /(“)(.*)(”)/g,
        '『$2』'
      )
  }

  if (halfwidthParenthesisAroundNumbers) {
    output = output.replace(/([^\s])\s*(（)(\s*[0-9.]+\s*)(）)/g, '$1 ($3)')
  }

  return output
}

export default dj
