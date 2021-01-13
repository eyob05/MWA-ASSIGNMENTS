module.exports.addTwoNumbers=function(req,res){
    var urlNumber=parseInt(req.params.num1);
    var queryStringNumber=parseInt(req.query.num2);
    var sum=urlNumber + queryStringNumber;
    
    var tot="sum of "+urlNumber+" + "+queryStringNumber+" = "+sum;
    console.log("Sum of these two numbers is ",tot);
    res.status(200).json(tot);
}
