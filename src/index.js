import defaultOptions from './default-options'
import { tokenTypes, operationTypes } from './consts'
import { merge } from './utils'
import lexer from './syntax-parser'

const dj = (input, userOptions) => {
  if (!input) {
    return input
  }
  const options = merge({}, defaultOptions, userOptions)
  const {
    spacing,
    spaceBetweenFullwidthPunctuationAndAlphabets,
    successiveExclamationMarks,
    ellipsisTolerance,
    replaceWithCornerQuotes,
    halfwidthParenthesisAroundNumbers
  } = options

  // Diagnose
  const tokens = lexer(input)
  if (
    !tokens.some(
      token =>
        token.type === tokenTypes.CJK ||
        token.type === tokenTypes.FULLWIDTH_PUNCTUATION
    )
  ) {
    return input
  }

  let output = ''
  const op = []

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const nextToken = tokens[i + 1] || {}
    const prevToken = tokens[i - 1] || {}

    if (spacing) {
      if (
        (token.type === tokenTypes.CJK &&
          (nextToken.type === tokenTypes.ALPHABETS_AND_NUMBERS ||
            nextToken.type === tokenTypes.NUMBERS)) ||
        ((token.type === tokenTypes.ALPHABETS_AND_NUMBERS ||
          token.type === tokenTypes.NUMBERS) &&
          nextToken.type === tokenTypes.CJK)
      ) {
        op.push({
          type: operationTypes.ADD,
          position: token.position[1],
          content: ' '
        })
      }
    }

    if (!spaceBetweenFullwidthPunctuationAndAlphabets) {
      if (
        (prevToken.type === tokenTypes.FULLWIDTH_PUNCTUATION &&
          token.type === tokenTypes.WHITESPACE &&
          (nextToken.type === tokenTypes.ALPHABETS_AND_NUMBERS ||
            nextToken.type === tokenTypes.NUMBERS)) ||
        ((prevToken.type === tokenTypes.ALPHABETS_AND_NUMBERS ||
          prevToken.type === tokenTypes.NUMBERS) &&
          token.type === tokenTypes.WHITESPACE &&
          nextToken.type === tokenTypes.FULLWIDTH_PUNCTUATION)
      ) {
        op.push({
          type: operationTypes.REMOVE,
          position: token.position[0],
          length: token.position[1] - token.position[0] + 1
        })
      }
    }

    if (!successiveExclamationMarks) {
      if (token.type === tokenTypes.SUCCESSIVE_FULLWIDTH_EXCLAMATION) {
        op.push({
          type: operationTypes.REPLACE,
          position: token.position[0],
          length: token.position[1] - token.position[0] + 1,
          content: '！'
        })
      }
    }

    if (ellipsisTolerance === 'none' || ellipsisTolerance === '3dots') {
      if (
        (ellipsisTolerance === 'none' &&
          (token.type === tokenTypes.INVALID_ELLIPSIS ||
            token.type === tokenTypes.DOTS_AS_ELLIPSIS ||
            token.type === tokenTypes.TWO_DOTS)) ||
        (ellipsisTolerance === '3dots' &&
          (token.type === tokenTypes.INVALID_ELLIPSIS ||
            token.type === tokenTypes.TWO_DOTS))
      ) {
        op.push({
          type: operationTypes.REPLACE,
          position: token.position[0],
          length: token.position[1] - token.position[0] + 1,
          content: '……'
        })
      }
    }

    if (halfwidthParenthesisAroundNumbers) {
      if (
        prevToken.type === tokenTypes.FULLWIDTH_LEFT_PAREN &&
        token.type === tokenTypes.NUMBERS &&
        nextToken.type === tokenTypes.FULLWIDTH_RIGHT_PAREN
      ) {
        op.push(
          {
            type: operationTypes.REPLACE,
            position: prevToken.position[0],
            length: prevToken.position[1] - prevToken.position[0] + 1,
            content: '('
          },
          {
            type: operationTypes.REPLACE,
            position: nextToken.position[0],
            length: nextToken.position[1] - nextToken.position[0] + 1,
            content: ')'
          }
        )
      }
    }

    if (
      replaceWithCornerQuotes === 'double' ||
      replaceWithCornerQuotes === 'single'
    ) {
      switch (token.type) {
        case tokenTypes.FULLWIDTH_LEFT_SINGLE_QUOTE:
          op.push({
            type: operationTypes.REPLACE,
            position: token.position[0],
            length: token.position[1] - token.position[0] + 1,
            content: replaceWithCornerQuotes === 'double' ? '『' : '「'
          })
          break
        case tokenTypes.FULLWIDTH_RIGHT_SINGLE_QUOTE:
          op.push({
            type: operationTypes.REPLACE,
            position: token.position[0],
            length: token.position[1] - token.position[0] + 1,
            content: replaceWithCornerQuotes === 'double' ? '』' : '」'
          })
          break
        case tokenTypes.FULLWIDTH_LEFT_DOUBLE_QUOTE:
          op.push({
            type: operationTypes.REPLACE,
            position: token.position[0],
            length: token.position[1] - token.position[0] + 1,
            content: replaceWithCornerQuotes === 'double' ? '「' : '『'
          })
          break
        case tokenTypes.FULLWIDTH_RIGHT_DOUBLE_QUOTE:
          op.push({
            type: operationTypes.REPLACE,
            position: token.position[0],
            length: token.position[1] - token.position[0] + 1,
            content: replaceWithCornerQuotes === 'double' ? '」' : '』'
          })
          break
        default:
          break
      }
    }
  }

  // Operate
  if (!op.length) {
    return input
  }
  let currentOpIndex = 0
  for (let i = 0; i < input.length; i++) {
    const currentOp = op[currentOpIndex]
    if (!currentOp) {
      output += input[i]
      continue
    }

    const { position, type, content, length } = currentOp
    if (i === position) {
      switch (type) {
        case operationTypes.ADD:
          output += `${input[i]}${content}`
          break
        case operationTypes.REPLACE:
          output += content
          i += length - 1
          break
        case operationTypes.REMOVE:
          output += ''
          i += length - 1
          break
        default:
          break
      }
      currentOpIndex++
    } else {
      output += input[i]
    }
  }

  return output
}

export default dj
