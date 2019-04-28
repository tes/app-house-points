const oidc = require('../oidc');
const db = require('../db');
const scopes = [
  'openid',
  'email',
  'profile',
  'x_tes_entitlements',
]

module.exports = {
  ensureAuthorised: (req, res, next) => {
    if (req.session.user) return next();
    const url = oidc.getAuthUrl('http://localhost:3001/cb', scopes);
    // Set status to 401 because 'fetch' transparently redirects on 3XX series status code resulting in a CORS violation
    res.redirect(401, url);
  },
  hasEntitlement: (name) => async (req, res, next) => {
    if (!req.session.user) res.status(401).json('Not authorised');
    const school = await db.getSchool(req.params.schoolId);
    if (!school) return res.status(403).json('Forbidden');
    if (!req.session.user.x_tes_entitlements.find(entitlement => entitlement.name === name && entitlement.tesId === school.tesId)) return res.status(403).json('Forbidden');
    next();
  },
  callback: async (req, res, next) => {
    try {
      const { access_token: accessToken } = await oidc.requestToken('http://localhost:3001/cb', req.query.code)
      req.session.user = await oidc.requestUserInfo(accessToken, scopes);

      // TODO Remove when we have entitlements configured in Salesforce
      req.session.user.x_tes_entitlements = [
        {
          name: 'House Points',
          tesId: 1083460,
        },
        {
          name: 'House Points',
          "tesId": 1058690,
        }
      ];

      res.redirect(302, 'http://localhost:3000');
    } catch(err) {
      next(err)
    }
  }
}


