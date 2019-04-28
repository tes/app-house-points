const { URL, URLSearchParams } = require('url');
const fetch = require('node-fetch');

module.exports = class Client {
  constructor({ id, secret, baseUrl }) {
    this._id = id;
    this._secret = secret;
    this._baseUrl = baseUrl;
  }

  getAuthUrl({ redirectUrl, scopes }) {
    const url = new URL(`${this._baseUrl}/auth`);
    url.searchParams.set('client_id', this._id);
    url.searchParams.set('redirect_uri', redirectUrl);
    url.searchParams.set('scope', scopes.join(' '));
    url.searchParams.set('response_type', 'code');
    return url.toString();
  }

  async requestToken({ redirectUrl, code }) {
    const searchParams = new URLSearchParams();
    searchParams.set('client_id', this._id);
    searchParams.set('client_secret', this._secret);
    searchParams.set('redirect_uri', redirectUrl);
    searchParams.set('code', code);
    searchParams.set('grant_type', 'authorization_code');
    const url = `${this._baseUrl}/token`;

    const res = await fetch(url, {
      method: 'POST',
      body: searchParams.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
    })

    if (res.status >= 400) throw new Error(`${url} returned status: ${res.status}`)

    return await res.json();
  }

  async requestUserInfo({ accessToken, scopes }) {
    const url = `${this._baseUrl}/userinfo`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (res.status >= 400) throw new Error(`${url} returned status: ${res.status}`)

    return await res.json();
  }
}
