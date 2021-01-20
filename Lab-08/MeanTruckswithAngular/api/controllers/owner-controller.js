const mongoose = require("mongoose");
const Truck = mongoose.model("Truck");

module.exports.getTruckOwner = function (req, res) {
  const truckId = req.params.truckId;
  Truck.findById(truckId).exec(function (err, truck) {
    const response = {
      status: 200,
      message: truck.owner
    }
    if (err) {
      response.status = 404,
        response.message = { message: "Truck owner not found" };
      res.status(response.status).json(response.message);
    } else {
      res.status(response.status).json(response.message)
    }

  });
}

module.exports.updateOwner = function (req, res) {
  const truckId = req.params.truckId
  Truck.findById(truckId).select("owner").exec(function (err, Owner) {
    if (Owner) {
      console.log(req.body)

      Owner.owner = req.body

      Owner.save(function (err, updateowner) {
        if (updateowner) {
          console.log("owner  saved")
          res.status(200).json(updateowner)
        } else {
          console.log("owner found but not saved")
          res.status(204).json(err)
        }
      })
    } else {

      console.log("owner not found")
      res.status(204).json(err)
    }
  })
}
var _addowner = function (req, res, truck) {

  truck.owner=req.body

  truck.save(function (err, updatedTruck) {
    var response = {
      status: 200,
      message: []
    };

    if (err) {
      response.status = 500,
        response.message = err
    } else {
      response.status = 200,
        response.message = updatedTruck.owner
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.addTruckOwner = function (req, res) {
  const truckId = req.params.truckId
 
  Truck.findById(truckId).select("owner").exec(function (err, truck) {
   
    const response = {
      status: 200,
      message: truck
    }
    if (err) {
      response.status = 400;
      response.message = err
    } else if (!truck) {
      response.status = 404,
        response.message = { "message": "Game Id not found" };
    }
    if (truck) {
      
      _addowner(req, res, truck);
    } else {
      res.status(response.status).json(response.message);
    }
  })
}
module.exports.deleteOwner = function (req, res) {
  const truckId = req.params.truckId;
  Truck.findById(truckId).select("owner").exec(function (err, truck) {
    var response = {
      status:200,
      
    };
    if (err) {
      response.status = 500,
        response.message = err
    } else if (!truck) {
      response.status = 404,
        response.message = { "message": "truck Id not found" };
    }
    
     else {
      _deletePublisher(req, res, truck);
    }
  })
}
var _deletePublisher = function (req, res, truck) {

  
  truck.owner.remove();
  truck.save(function (err, truck) {
    
   if (err) {
      
    res.status(500).json("owner not found");
    }
    
    res.status(200).json({"message":"owner deleted sucssessfully"});

  });
  
}