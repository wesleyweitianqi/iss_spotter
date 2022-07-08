const { fetchMyIP,fetchCoordsByIP,fetchFlyoverByCordinates,nextISSTimesForMyLocation} = require('./iss');

// const IP =fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(error)
//     return
//   }
//   return ip
// })
// fetchCoordsByIP('72.140.85.83',(error, data) => {
//     if (error) {
//       console.log(error);
//       return
//     }
//     console.log(data)

// });

// fetchFlyoverByCordinates({latitude:'44.00648',longitude:'-79.450396'}, (error, array) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   for (let i of array) {
//     console.log(`risetime: ${i.datetime}, duration: ${i.duration}`)
//   }
// })
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});