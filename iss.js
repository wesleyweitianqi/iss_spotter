const request = require("request");
const { parse } = require("request/lib/cookies");

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
    const ip = JSON.parse(body).ip;
    callback(null, ip)
    
  })
}

const fetchCoordsByIP =function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    const {latitude, longitude} = parsedBody
    const loc = {latitude,longitude}
    callback(null, loc)
   
  });
}

const fetchFlyoverByCordinates = function(loc, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${loc.latitude}&lon=${loc.longitude}`, (error, response, body) => {
    if (error) {
      callback(error)
      return
    }
    // if (response.statusCode !== 200) {
    //   const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    //   callback(Error(msg), null);
    //   return;
    // }

    const parsedBody =JSON.parse(body)
    const arr = parsedBody.response;
    callback(null, arr)
  })
}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) { return callback(error,null)
    }
    fetchCoordsByIP(ip,(error,loc) => {
      if (error) { return callback(error,null)
      }
    fetchFlyoverByCordinates(loc,(error,arr) => {
      if(error) { return callback(error,null)
      }
    
      callback(arr)
      })
    })
  })
}
// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.
module.exports = { nextISSTimesForMyLocation };

module.exports = { fetchMyIP,fetchCoordsByIP, fetchFlyoverByCordinates,nextISSTimesForMyLocation };