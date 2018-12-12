var express = require('express');//this is found in routes, and is the only thing file within this folder you should look at
var router = express.Router();
var mongoose = require('mongoose');

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
  }
});

router.param('candidate', function(req, res, next, id) {//finds candidate
  var query = Voting.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error("can't find candidate")); }
    req.candidate = candidate;
    return next();
  });
});


router.get('/voting/:candidate',function(req,res) {//returns candidate from previous function
  res.json(req.candidate);
});

router.put('/voting/:candidate/upvote', function(req, res, next) {//this function upvotes candidates after ballot is submitted
  console.log("Put Route"+req.candidate.Name);
  req.candidate.upvote(function(err, candidate){
    if (err) { return next(err); }
    res.json(candidate);
  });
});

router.delete('/voting/:candidate',function(req,res) {//This function deletes the candidate from admin.html
  req.candidate.remove();
  res.sendStatus(200);
});

router.get('/voting', function(req, res, next) {//returns array of candidates for both hmtl pages
  console.log("Get Route");
  Voting.find(function(err, candidates){
    if(err){ console.log("Error"); return next(err); }
    res.json(candidates);
  console.log("res.json Get Route");
  });
  console.log("returningGet Route");
});

router.post('/voting', function(req, res, next) {
  console.log("Post Route");
  var candidate = new Voting(req.body);
  console.log("Post Route");
  console.log(candidate);
  candidate.save(function(err, candidate){
		console.log("Error "+err);
		if(err){  return next(err); }
    console.log("Post Route before json");
		res.json(candidate);
	});
});

module.exports = router;
