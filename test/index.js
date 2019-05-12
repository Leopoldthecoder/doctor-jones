import test from 'ava'
import random from 'chinese-random-name'
import dj from '../src'

const getRandomCharacters = random.generate

const dumbOptions = {
  spacing: false,
  spaceBetweenFullwidthPunctuationAndAlphabets: true,
  successiveExclamationMarks: true,
  ellipsisTolerance: 'all',
  replaceWithCornerQuotes: 'none',
  halfwidthParenthesisAroundNumbers: false
}

const getOptions = option => Object.assign({}, dumbOptions, option)

test('do nothing', t => {
  const chinese = getRandomCharacters(3)
  const input = `${chinese}readabitily...`
  const output = dj(input, dumbOptions)
  t.is(output, input)
})

test('spacing', t => {
  const chinese = [
    getRandomCharacters(3),
    getRandomCharacters(3),
    getRandomCharacters(3)
  ]
  const input = `${chinese[0]}abcd${chinese[1]}42${chinese[2]}xyz`
  const output = dj(input, getOptions({ spacing: true }))
  t.is(output, `${chinese[0]} abcd ${chinese[1]} 42 ${chinese[2]} xyz`)
})

test('remove space between fullwidth punctuation and alphabets/numbers', t => {
  const chinese = [getRandomCharacters(3), getRandomCharacters(3)]
  const input = `${chinese[0]}， 1 ${chinese[1]} xyz 。`
  const output = dj(
    input,
    getOptions({ spaceBetweenFullwidthPunctuationAndAlphabets: false })
  )
  t.is(output, `${chinese[0]}，1 ${chinese[1]} xyz。`)
})

test('remove successive exclamation marks', t => {
  const chinese = getRandomCharacters(3)
  const input = `${chinese}！！！`
  const output = dj(input, getOptions({ successiveExclamationMarks: false }))
  t.is(output, `${chinese}！`)
})

test('normalize ellipsis', t => {
  const chinese = [
    getRandomCharacters(3),
    getRandomCharacters(3),
    getRandomCharacters(3),
    getRandomCharacters(3)
  ]
  const input = `${chinese[0]}，，，${chinese[1]}、、${chinese[2]}...${
    chinese[3]
  }。。。。`
  const noneToleranceOutput = dj(
    input,
    getOptions({ ellipsisTolerance: 'none' })
  )
  const dotsToleratedOutput = dj(
    input,
    getOptions({ ellipsisTolerance: '...' })
  )
  t.is(
    noneToleranceOutput,
    `${chinese[0]}……${chinese[1]}……${chinese[2]}……${chinese[3]}……`
  )
  t.is(
    dotsToleratedOutput,
    `${chinese[0]}……${chinese[1]}……${chinese[2]}...${chinese[3]}……`
  )
})

test('replace quotation marks', t => {
  const chinese = [
    getRandomCharacters(3),
    getRandomCharacters(3),
    getRandomCharacters(3)
  ]
  const input = `${chinese[0]}：“${chinese[1]}‘${chinese[2]}’？”`
  const doubleQuoteOutput = dj(
    input,
    getOptions({ replaceWithCornerQuotes: 'double' })
  )
  const singleQuoteOutput = dj(
    input,
    getOptions({ replaceWithCornerQuotes: 'single' })
  )
  t.is(doubleQuoteOutput, `${chinese[0]}：「${chinese[1]}『${chinese[2]}』？」`)
  t.is(singleQuoteOutput, `${chinese[0]}：『${chinese[1]}「${chinese[2]}」？』`)
})

test('halfwidth parenthesis around numbers', t => {
  const chinese = getRandomCharacters(3)
  const input = `${chinese}（2019）`
  const output = dj(
    input,
    getOptions({ halfwidthParenthesisAroundNumbers: true })
  )
  t.is(output, `${chinese}(2019)`)
})
