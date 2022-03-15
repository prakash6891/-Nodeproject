const NodeGeocoder = require('node-geocoder');
const cityName = document.getElementById('cityName');
const city_name= document.getElementById('city_name')
  
const options = {
    provider: 'mapquest',
    //fetch: 'http',
    apiKey: 'YZdQAcbznG8O6iPGsAMcRFWX8CPu0v4K', 
    formatter : null
  };
  
  const geocoder = NodeGeocoder(options);
  
module.exports = geoLoc;