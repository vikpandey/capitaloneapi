var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/unicorns', function (req, res) {

  //var horn = req.query.Horns;
  var horn = req.body.Horns;
  var hornTest = parseInt(horn);
  var description = req.body.Horn_description;
  var limbs = req.body.Limbs;
  var failureMessage = new Array();

  if(!Number.isInteger(hornTest) || isArray(horn)) {
    if(isArray(horn)) {
      failureMessage.push("Horn is an Array, expected int");
    }
    else {
      failureMessage.push("Horns is a " + typeof horn + " expected int");
    }
  }

  if(typeof description != "string") {

    if(isArray(description)) {
      failureMessage.push("Horns_description is an Array, expected String");
    }
    else {
      failureMessage.push("Horn_description is a "+ typeof description + " expected String");
    }
  }

  if(!Array.isArray(limbs)) {
    failureMessage.push("Limbs is a " + typeof limbs + " expected Array");
  }

  var fail = "{“Failure”: “Formatting errors detected”,“Errors”: " + failureMessage + "}";
  console.log(fail);
  if(failureMessage.length > 0) {
    res.status(500).send({success: false, error: {message: 'Formatting errors detected, Errors :' + failureMessage}});
  }
  else {
    res.status(200).send({success: true, status: {message: 'message sent successfully'}});
  }

});

router.post('/coders', function (req, res) {

  var language = req.body.Languages;
  var name = req.body.Name;
  var failMessage = new Array();

  var result = isArray(language);
  console.log("result is:- "+ result);

  if(!isArray(language)) {
    failMessage.push("Languages is a " + typeof language + " expected arrayList");
  }

  if(typeof name != "string") {

    if(isArray(name)) {
      failMessage.push("Name is an array expected String");
    }
    else {
      failMessage.push("name is a "+ typeof name + " expected String");
    }
  }

  var failure = "{“Failure”: “Formatting errors detected”,“Errors”: " + failMessage + "}";
  console.log(failure);
  if(failMessage.length > 0) {
    res.status(500).send({success: false, error: {message: 'Formatting errors detected, Errors :' + failure}});
  }
  else {
    res.status(200).send({success: true, status: {message: 'message sent successfully'}});
  }

});

function isArray(obj) {
  return (typeof obj !== 'undefined' &&
  obj && obj.constructor === Array);
}


module.exports = router;
