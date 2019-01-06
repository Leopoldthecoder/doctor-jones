import test from 'ava'
import dj from '../dist/index.cjs.js'

test('do nothing', t => {
  const input = '增加文字的readabitily...'
  const output = dj(input, { spacing: false })
  t.is(output, input)
})

test('spacing', t => {
  const input = '你的jira上还有70多个bug没修'
  const output = dj(input, { spacing: true })
  t.is(output, '你的 jira 上还有 70 多个 bug 没修')
})
