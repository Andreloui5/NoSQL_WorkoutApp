const db = require("../models");

module.exports = function(app) {
 
  // Get request for all workout documents
  app.get("/api/workouts", (req, res) => {

    db.Workout.find({})
      .then(results => {
      res.json(results);
      console.log(results);
    })
    .catch(err => {
      res.json(err);
    });
  });

  // Creates a new workout
  app.post("/api/workouts", ({body}, res) => {

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
  app.post("/api/workouts/:id", (req, res) => {

    db.Workout.updateOne({_id: req.params.id})
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

    db.Workout.find({}).sort({_id:-1}).limit(7)
    .then(results => {
      res.json(results);
      console.log(results);
    })
    .catch(err => {
      res.json(err);
    });
  })
};
