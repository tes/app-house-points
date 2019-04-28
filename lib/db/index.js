const schools = require('./schools');

module.exports = {

  getEntitledSchools: async (tesIds) => {
    return schools.filter(s => tesIds.includes(s.tesId));
  },
  getSchool: async (schoolId) =>  {
    return schools.find(s => s.id === schoolId);
  },
  getHouse: async (schoolId, houseId) =>  {
    const school = schools.find(school => school.id === schoolId) || { houses: [] };
    return school.houses.find(house => house.id === houseId);
  }

}
