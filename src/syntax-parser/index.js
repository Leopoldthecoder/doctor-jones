import { createLexer } from './lexer'
import { tokenTypes } from '../consts'

export default createLexer([
  {
    type: tokenTypes.WHITESPACE,
    regexes: [/^(\s+)/]
  },
  {
    type: tokenTypes.CJK,
    regexes: [
      /^([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]+)/
    ]
  },
  {
    type: tokenTypes.FULLWIDTH_LEFT_PAREN,
    regexes: [/^(（)/]
  },
  {
    type: tokenTypes.FULLWIDTH_RIGHT_PAREN,
    regexes: [/^(）)/]
  },
  {
    type: tokenTypes.SUCCESSIVE_FULLWIDTH_EXCLAMATION,
    regexes: [/^(！{2,})/]
  },
  {
    type: tokenTypes.DOTS_AS_ELLIPSIS,
    regexes: [/^([.]{3})/]
  },
  {
    type: tokenTypes.INVALID_ELLIPSIS,
    regexes: [/^([。，、]{2,}|[.]{2}|[.]{4,})/]
  },
  {
    type: tokenTypes.FULLWIDTH_LEFT_SINGLE_QUOTE,
    regexes: [/^(‘)/]
  },
  {
    type: tokenTypes.FULLWIDTH_RIGHT_SINGLE_QUOTE,
    regexes: [/^(’)/]
  },
  {
    type: tokenTypes.FULLWIDTH_LEFT_DOUBLE_QUOTE,
    regexes: [/^(“)/]
  },
  {
    type: tokenTypes.FULLWIDTH_RIGHT_DOUBLE_QUOTE,
    regexes: [/^(”)/]
  },
  {
    type: tokenTypes.FULLWIDTH_PUNCTUATION,
    regexes: [
      /^([，。：；！？（）、〈〉《》“”‘’「」『』〔〕【】〖〗⦗⦘〘〙…●～—]+?)/
    ]
  },
  {
    type: tokenTypes.NUMBERS,
    regexes: [/^([0-9.]+)/]
  },
  {
    type: tokenTypes.ALPHABETS_AND_NUMBERS,
    regexes: [/^([a-zA-Z0-9]+)/]
  },
  {
    type: tokenTypes.MISC,
    regexes: [/^(.+)/]
  }
])
