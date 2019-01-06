import pangu from 'pangu/dist/shared/core'
import { merge } from './utils'

const defaultOptions = {
  spacing: true
}

export default (input, userOptions) => {
  const options = merge(defaultOptions, userOptions)
  const { spacing } = options

  let output = input
  if (spacing) {
    output = pangu.spacing(output)
  }

  return output
}
