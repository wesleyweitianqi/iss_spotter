

  const { nextISSTimesForMyLocation } = require('./iss_promised');

  // see index.js for printPassTimes 
  // copy it from there, or better yet, moduralize and require it in both files
  
  // Call 
  nextISSTimesForMyLocation()
    .then((body) => {
      for (let passTime of body) {
        const datetime = new Date(0)
        datetime.setUTCSeconds(passTime.risetime)
        const duration = passTime.duration
        console.log(`Next pass at ${datetime} for ${duration} seconds!`);

      }
    })
    .catch((error) => {
      console.log("it didn't work: ", error.message)
    })


  