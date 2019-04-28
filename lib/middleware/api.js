const db = require('../db');

module.exports = {

  getUser: async (req, res) => {
    if (!req.session.user) return res.json({ user: null, schools: [] });
    const entitlements = req.session.user ? req.session.user.x_tes_entitlements : [];
    const tesIds = entitlements.filter(entitlement => entitlement.productName === 'House Points').map(entitlement => entitlement.employerOnlineId);
    const schools = await db.getEntitledSchools(tesIds);
    return res.json({ user: req.session.user, schools });
  },
  getSchool: async (req, res, next) => {
    const schoolId = req.params.schoolId;
    const school = await db.getSchool(schoolId);
    if (!school) return next();
    res.json(school);
  },
  addHousePoint: async (req, res, next) => {
    const schoolId = req.params.schoolId;
    const houseId = req.params.houseId;
    const house = await db.getHouse(schoolId, houseId);
    if (!house) return next();
    house.points++;
    res.json(house);
  },
  subtractHousePoint: async (req, res, next) => {
    const schoolId = req.params.schoolId;
    const houseId = req.params.houseId;
    const house = await db.getHouse(schoolId, houseId);
    if (!house) return next();
    house.points = Math.max(0, house.points - 1);
    res.json(house);
  },

}
