import pangu from 'pangu/dist/shared/core'
import { merge } from './utils'
import defaultOptions from './default-options'

const fullwidthPunctuationSpaceAlphabets = /([，。：；！？（）、〈〉《》“”‘’「」『』〔〕【】〖〗⦗⦘〘〙…●～—])\s+([a-zA-Z0-9])/g
const alphabetsSpaceFullwidthPunctuation = /([a-zA-Z0-9])\s+([，。：；！？（）、〈〉《》“”‘’「」『』〔〕【】〖〗⦗⦘〘〙…●～—])/g
const dotsSpaceCjk = /(\.{3,})\s([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff])/g

const dj = (input, userOptions) => {
  const options = merge({}, defaultOptions, userOptions)
  const {
    spacing,
    spaceBetweenFullwidthPunctuationAndAlphabets,
    successiveExclamationMarks,
    replaceHalfwidthWithFullwidth,
    ellipsisTolerance,
    replaceWithCornerQuotes,
    halfwidthParenthesisAroundNumbers
  } = options

  let output = input

  if (spacing) {
    output = pangu.spacing(output).replace(dotsSpaceCjk, '$1$2')
  }

  if (!spaceBetweenFullwidthPunctuationAndAlphabets) {
    output = output
      .replace(fullwidthPunctuationSpaceAlphabets, '$1$2')
      .replace(alphabetsSpaceFullwidthPunctuation, '$1$2')
  }

  if (!successiveExclamationMarks) {
    output = output.replace(/！{2,}/g, '！')
  }

  if (replaceHalfwidthWithFullwidth) {
    let replacedOutput = ''
    let isOpenDoubleQuote = true
    let isOpenSingleQuote = true
    const len = output.length
    for (let i = 0; i < len; i++) {
      const code = output.charCodeAt(i)
      if ([33, 40, 41, 44, 58, 59, 63].indexOf(code) > -1) {
        replacedOutput += String.fromCharCode(code + 65248)
        const nextCode = output.charCodeAt(i + 1)
        if (nextCode === 32) {
          i++
        }
      } else if (code === 46) {
        replacedOutput += '。'
      } else if (code === 34) {
        replacedOutput += isOpenDoubleQuote ? '“' : '”'
        isOpenDoubleQuote = !isOpenDoubleQuote
      } else if (code === 39) {
        replacedOutput += isOpenSingleQuote ? '‘' : '’'
        isOpenSingleQuote = !isOpenSingleQuote
      } else {
        replacedOutput += output[i]
      }
    }
    output = replacedOutput
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
