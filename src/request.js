import parse from 'url-parse';

export default (url, options = {}) => {
  return fetch(url, Object.assign({
    credentials: 'same-origin',
    redirect: 'manual',
    method: 'GET',
    timeout: 5000,
    headers: {
      'Accept': 'application/json'
    }
  }, options))
  .then(res => {
    if (res.status === 401 && res.headers.has('Location')) {
      const redirectUrl = res.headers.get('Location');
      const url = parse(redirectUrl, true);
      url.query.returnUrl = encodeURIComponent(window.location);
      return window.location = url.toString();
    }
    return res.json()
  })
}

