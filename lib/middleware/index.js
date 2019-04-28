const db = require('../db');

const entitlements = [
  {
    name: 'House Points',
    onlineId: 1083460,
  },
  {
    name: 'House Points',
    "onlineId": 1058690,
  }
]

module.exports = {

  getEntitledSchools: (req, res) => {
    const onlineIds = entitlements.map(entitlment => entitlment.onlineId);
    const schools = db.getEntitledSchools(onlineIds);
    res.json(schools);
  },
  getSchool: (req, res, next) => {
    const schoolId = req.params.schoolId;
    const school = db.getSchool(schoolId);
    if (!school) return next();
    res.json(school);
  },
  addHousePoint: (req, res, next) => {
    const schoolId = req.params.schoolId;
    const houseId = req.params.houseId;

    const house = db.getHouse(schoolId, houseId);
    if (!house) return next();

    house.points++;

    res.json(house);
  },
  subtractHousePoint: (req, res, next) => {
    const schoolId = req.params.schoolId;
    const houseId = req.params.houseId;

    const house = db.getHouse(schoolId, houseId);
    if (!house) return next();

    house.points = Math.max(0, house.points - 1);

    res.json(house);
  },

}
