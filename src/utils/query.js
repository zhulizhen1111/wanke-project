function query(search) {
  let obj = {}
  const _search = search || location.search.split('?')[1]
  if (_search) {
    _search.split('&').forEach(i => {
      let key = i.split('=')[0]
      let value = i.split('=')[1]
      obj[key] = value
    })
  }
  return obj
}

export {
  query
}