/*
 * Modified from https://github.com/ascoders/syntax-parser
 * Author: @ascoders
 * */

class Tokenizer {
  constructor(lexerConfig) {
    this.lexerConfig = lexerConfig
  }

  tokenize(input) {
    const tokens = []
    let token
    let lastPosition = 0

    // Keep processing the string until it is empty
    while (input.length) {
      // Get the next token and the token type
      const result = this.getNextToken(input)
      if (!result || !result.token) {
        throw Error(`Lexer: Unexpected string "${input}".`)
      }
      token = result.token
      if (!token.value) {
        throw Error(`Lexer: Regex parse error, please check your lexer config.`)
      }
      token.position = [lastPosition, lastPosition + token.value.length - 1]
      lastPosition += token.value.length
      // Advance the string
      input = input.substring(token.value.length)
      if (!result.config.ignore) {
        tokens.push(token)
      }
    }
    return tokens
  }

  getNextToken(input) {
    let result = null
    this.lexerConfig.forEach(eachLexer => {
      if (result) return
      eachLexer.regexes.forEach(regex => {
        if (result) return
        const token = this.getTokenOnFirstMatch({
          input,
          type: eachLexer.type,
          regex
        })
        if (token) {
          result = {
            token,
            config: eachLexer
          }
        }
      })
    })
    return result
  }

  getTokenOnFirstMatch({ input, type, regex }) {
    const matches = input.match(regex)
    if (matches) {
      return { type, value: matches[1] }
    }
  }
}

export const createLexer = lexerConfig => text =>
  new Tokenizer(lexerConfig).tokenize(text)
