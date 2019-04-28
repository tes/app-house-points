const oidc = require('../oidc');
const db = require('../db');
const { TES_HOUSE_POINTS_URL } = require('../constants');
const scopes = [
  'openid',
  'email',
  'profile',
  'x_tes_entitlements',
]

module.exports = {
  ensureAuthorised: (req, res, next) => {
    if (req.session.user) return next();
    const url = oidc.getAuthUrl({ redirectUrl: `${TES_HOUSE_POINTS_URL}/auth/return`, scopes });
    // Set status to 401 because 'fetch' transparently redirects on 3XX series status code resulting in a CORS violation
    res.redirect(401, url);
  },
  hasEntitlement: (productName) => async (req, res, next) => {
    if (!req.session.user) res.status(401).json('Not authorised');
    const school = await db.getSchool(req.params.schoolId);
    if (!school) return res.status(403).json('Forbidden');
    if (!req.session.user.x_tes_entitlements.find(entitlement => entitlement.productName === productName && entitlement.employerOnlineId === school.tesId)) return res.status(403).json('Forbidden');
    next();
  },
  return: async (req, res, next) => {
    try {
      const { access_token: accessToken } = await oidc.requestToken({ redirectUrl: `${TES_HOUSE_POINTS_URL}/auth/return`, code: req.query.code })
      req.session.user = await oidc.requestUserInfo({ accessToken, scopes });
      res.redirect(302, `${TES_HOUSE_POINTS_URL}`);
    } catch(err) {
      next(err)
    }
  }
}
