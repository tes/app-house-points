const oidc = require('../oidc');
const db = require('../db');
const applicationUrl = process.env.TES_HOUSE_POINTS_URL || 'http://localhost:3000';
const scopes = [
  'openid',
  'email',
  'profile',
  'x_tes_entitlements',
]

module.exports = {
  ensureAuthorised: (req, res, next) => {
    if (req.session.user) return next();
    const url = oidc.getAuthUrl({ redirectUrl: `${applicationUrl}/auth/return`, scopes });
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
      const { access_token: accessToken } = await oidc.requestToken({ redirectUrl: `${applicationUrl}/auth/return`, code: req.query.code })
      req.session.user = await oidc.requestUserInfo({ accessToken, scopes });
      res.redirect(302, `${applicationUrl}`);
    } catch(err) {
      next(err)
    }
  },
  login: async (req, res) => {
    res.redirect(applicationUrl);
  },
  logout: async (req, res) => {
    req.session.destroy((err) => {
      if(err) return res.status(500).json({ success: false });
      return res.status(200).json({ success: true });
    });
  },
}
