const db = require("../models");

module.exports = function(app) {
 
  app.get("/api/workouts", (req, res) => {

    db.Workout.find({})
      .then((err, results) => {
      if (err) throw err;
      res.json(results);
    })
  })

  
};
