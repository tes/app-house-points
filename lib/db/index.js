const schools = require('./schools');

module.exports = {

  getEntitledSchools: (onlineIds) => {
    return schools.filter(s => onlineIds.includes(s.onlineId));
  },
  getSchool: (schoolId) =>  {
    return schools.find(s => s.id === schoolId);
  },
  getHouse: (schoolId, houseId) =>  {
    const school = schools.find(school => school.id === schoolId) || { houses: [] };
    return school.houses.find(house => house.id === houseId);
  }

}
