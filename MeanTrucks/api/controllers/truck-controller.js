const mongoose = require("mongoose");
const Truck = mongoose.model("Truck");

// module.exports.getAllTrucks = function (req, res) {
//   Truck.find(function (err, trucks) {
//     if (trucks) {
//       console.log(trucks)
//       res.status(200).json(trucks)
//     } else {
//       console.log("not found")
//       res.status(200).json(trucks)
//     }
//   });
// }



module.exports.getAllTrucks = function (req, res) {

  var offset = 0;
  var count = 10;
  const maxCount = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
    if (count > 5) {
      count = 5;
    }
  }

  console.log(count);
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({ message: "QueryString offset and count should be numbers" });
    return;
  }

  if (count > maxCount) {
    res.status(400).json({ message: "Count exceded the max number of 7" });
    return;
  }

  //using mongooose
  Truck.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, trucks) {
      const response = {
        status: 200,
        message: trucks,
      };
      if (err) {
        console.log("Error finding trucks ");
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

module.exports.getOneTruck = function (req, res) {
  const truckId = req.params.truckId;
  Truck.findById(truckId).exec(function (err, truck) {
    const response={
      status:200,
      message:truck,
    };
    if (err) {
      console.log("Found Errors ", err);
      response.status = 500;
      response.message = err;
    } else if(!truck){
      response.status = 404;
      response.message = { message: "Truck ID not found" };
    }
res.status(response.status).json(response.message);
  });
};

module.exports.addOneTruck = function (req, res) {
  //  const truck=req.body;
  Truck.create({
    vinNumber: req.body.vinNumber,
    model: req.body.model,
    year: req.body.year,
    mileage: req.body.mileage,
    color: req.body.color,
     owner: req.body.owner,

  }, function (err, truck) {
    const response = {
      status: 201,
      message: truck,
    };
    if (err) {
      response.status=400,
      response.message=err
       res.status(response.status).json(response.message)
} else {
      
      res.status(response.status).json(response.message)
    }
  });
}

module.exports.updateTruck=function(req,res){
  const truckId=req.params.truckId
   Truck.findById(truckId).select("-owner").exec(function(err,truck){
     const response={
       status:204,
       message:truck,
     };
     if(err){
      response.status = 500,
      response.message = {message: "truck ID not found"};
      res.status(response.status).json(response.message)
     }else if(!truck){
      response.status = 404,
      response.message = {message: "truck ID not found"};
      res.status(response.status).json(response.message)
     }
    else{
       truck.vinNumber=req.body.vinNumber;
       truck.model=req.body.model;
       truck.year=req.body.year;
       truck.mileage=req.body.mileage;
       truck.color=req.body.color;
       truck.save(function(err,updateTruck){

         if(updateTruck){
          response.status = 200,
          response.message = updateTruck
          res.status(response.status).json(response.message)
         }else{
          response.status = 500,
          response.message = err
          res.status(response.status).json(response.message)
         }
       })
      }
      
      })
}
module.exports.deleteTruck=function(req,res){
  const truckId=req.params.truckId;
  Truck.findByIdAndRemove({_id:truckId},function(err){
    const response={
      status:200,
      }
    if(err){
      response.status=500,
      res.status(response.status).json("Truck Id not found")
    }else{

      res.status(response.status).json("deleted succssfully")
      
    }
  })
}