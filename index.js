const { parse } = require('request/lib/cookies');
const {nextISSTimesForMyLocation} = require('./iss');

nextISSTimesForMyLocation((error, body) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  const arr = JSON.parse(body).response;
  console.log(typeof arr)
  for (let i in arr) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(arr[i].risetime);
    const duration = arr[i].duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
  
});