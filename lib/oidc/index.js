const Client = require('./Client');

module.exports = new Client({
  id: process.env.TES_OIDC_CLIENT_ID,
  secret: process.env.TES_OIDC_CLIENT_SECRET,
  baseUrl: process.env.TES_OIDC_PROVIDER_URL,
});
