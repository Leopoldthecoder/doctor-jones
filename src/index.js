import pangu from 'pangu/dist/shared/core'
import { merge } from './utils'
import defaultOptions from './default-options'

const dj = (input, userOptions) => {
  const options = merge(defaultOptions, userOptions)
  const { spacing, successiveExclamationMarks } = options

  let output = input

  if (spacing) {
    output = pangu.spacing(output)
  }

  if (!successiveExclamationMarks) {
    output = output.replace(/！{2,}/g, '！')
  }

  return output
}

export default dj
