const db = require("../models");

module.exports = function (app) {

  // Get request for all workout documents
  app.get("/api/workouts", (req, res) => {
    console.log("get route");
    let lastObj = {};

    db.Workout.find({})
      .then(results => {
        lastObj.data = results;
        lastObj.duration = 0;
        //defines an array of exercises
        let exerciseArr = results[results.length - 1]
        // finds each exercise in the above array
        let newArr = exerciseArr.exercises;
        // iterates through the array 
        newArr.forEach(item => {
          // totals the duration of all exercises in this workout
          lastObj.duration += item.duration;
        })
        // sends object back to be rendered by page
        res.json(lastObj);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // Creates a new workout
  app.post("/api/workouts/", ({ body }, res) => {
    console.log(body.exercises)
    db.Workout.create(body)
      .then(results => {
        res.json(results);
        console.log(results);
      })
      .catch(err => {
        res.json(err);
      });
  })

  // Updates exercies to the workout
  app.put("/api/workouts/:id", (req, res) => {
  
    db.Workout.updateOne(
      {
        // delineates the id of the workout to be updated
        _id: req.params.id
      },
      {
        // pushes new values into specified workout
        $push: {
          exercises: {
            type: req.body.type,
            name: req.body.name,
            duration: req.body.duration,
            weight: req.body.weight,
            reps: req.body.reps,
            sets: req.body.sets,
            distance: req.body.distance
          }
        }

      }
      .then(results => {
        res.json(results);
        console.log(results);
      })
      .catch(err => {
        res.json(err);
      });
  })

  // Get request for last 7 workouts
  app.get("/api/workouts/range", (req, res) => {
    // finds last 7 workouts, and organizes by most recent first
    db.Workout.find({}).sort({ _id: -1 }).limit(7)
      .then(results => {
        res.json(results);
        console.log(results);
      })
      .catch(err => {
        res.json(err);
      });
  })
};
