module.exports = (url, options = {}) => {
  return fetch(url, Object.assign({
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }, options))
  .then(res => res.json())
}

