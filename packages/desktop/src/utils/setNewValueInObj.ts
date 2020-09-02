function setNewValueInObj<S> (obj: S, path: string, value: unknown): S | false {
  const props = path.split('.')
  let i: number, n: number

  if (!(typeof obj === 'object')) {
    return false
  }

  for (i = 0, n = props.length - 1; i < n; ++i) {
    obj = obj[props[i]] = obj[props[i]] || {}
  }
  obj[props[i]] = value
  return obj
}

export default setNewValueInObj
