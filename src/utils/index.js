export const merge = (target, ...sources) => {
  for (let i = 0, j = sources.length; i < j; i++) {
    const source = sources[i] || {}
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        const value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}

export const composeRegExp = ({ flags = 'g', parts }) =>
  new RegExp(parts.map(part => String(part).slice(1, -1)).join(''), flags)
