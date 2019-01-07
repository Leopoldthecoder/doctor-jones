import test from 'ava'
import dj from '../src'
import defaultOptions from '../src/default-options'

const dumbOptions = {}
Object.keys(defaultOptions).forEach(key => {
  dumbOptions[key] = !defaultOptions[key]
})

test('do nothing', t => {
  const input = '增加文字的readabitily...'
  const output = dj(input, dumbOptions)
  t.is(output, input)
})

test('spacing', t => {
  const input = '你的jira上还有70多个bug没修'
  const output = dj(input, Object.assign(dumbOptions, { spacing: true }))
  t.is(output, '你的 jira 上还有 70 多个 bug 没修')
})

test('remove successive exclamation marks', t => {
  const input = '上台拿衣服！！！'
  const output = dj(
    input,
    Object.assign(dumbOptions, { successiveExclamationMarks: false })
  )
  t.is(output, '上台拿衣服！')
})
