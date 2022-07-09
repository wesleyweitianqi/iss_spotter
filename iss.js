const request = require("request");


const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null)
      return
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, body);
    // console.log(body);
  })
}
// fetchMyIP()
const fetchCoordsByIP =function(body, callback) {
  const ip =JSON.parse(body).ip;
  console.log(body)
  console.log(ip)
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // console.log(body)
    // if (!body.success) {
    //   const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
    //   callback(error, null);
    //   return;
    // }
    callback(null,body)
    
   
  });
}

const fetchFlyoverByCordinates = function(body, callback) {
  if (body) {
    const {latitude, longitude} = JSON.parse(body);
    request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
      if (error) {
      callback(error)
      return
    }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
    }
    callback(null, body);
  })
  } 
    
  callback(null, body);
  
 
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, body) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(body, (error, body) => {
      if (error) {
        return callback(error, null);
      }

      fetchFlyoverByCordinates(body, (error, body) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, body);
      });
    });
  });
};
// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.
module.exports = { fetchMyIP, nextISSTimesForMyLocation };

