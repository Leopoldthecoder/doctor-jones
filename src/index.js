import pangu from 'pangu/dist/shared/core'
import { merge, composeRegExp } from './utils'
import { CJK, FULLWIDTH_PUNCTUATION, ALPHABETS_AND_NUMBERS } from './consts'
import defaultOptions from './default-options'

const fullwidthPunctuationSpaceAlphabets = composeRegExp({
  flags: 'g',
  parts: [FULLWIDTH_PUNCTUATION, /\s+/, ALPHABETS_AND_NUMBERS]
})
const alphabetsSpaceFullwidthPunctuation = composeRegExp({
  flags: 'g',
  parts: [ALPHABETS_AND_NUMBERS, /\s+/, FULLWIDTH_PUNCTUATION]
})
const dotsSpaceCjk = composeRegExp({
  flags: 'g',
  parts: ['(\\.{3,})', '\\s', CJK]
})

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
