const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new 
exports.create = (req, res) => {
    const tutorial = {
        timeStamp: req.body.Timestamp,
        from: req.body.From,
        duration: req.body.Duration,
        direction: req.body.Direction,
        country : req.body.CallerCountry
      };
};


// Delete all
exports.deleteAll = (req, res) => {
  
};
