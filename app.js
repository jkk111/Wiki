var crypto = require("crypto");
var express = require("express");
var db = require("./util/db.js");
var app = express();
app.use(express.static("static"));
app.listen(80);
app.get("/search", function(req, res) {
  var numResults = randomRange(50, 200);
  res.send(generateDummyResults(numResults, req.query.q));
});

function generateDummyResults(num, query) {
  var payload = [];
  for(var i = 0; i < num; i++) {
    var post = {};
    post.title = computeRandomString(randomRange(16, 40));
    post.body = computeRandomString(20, 400) + query + computeRandomString(20, 400);
    payload.push(post);
  }
  return payload
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computeRandomString(min, max) {
  if(min == max || !max) {
    return crypto.randomBytes(min).toString("base64");
  }
  var len = randomRange(min, max);
  return crypto.randomBytes(len).toString("base64");
}

app.get("/wiki/:article", function(req, res) {
  var article = db.fetch(req.params.article);
  if(!article) {
    res.send(notFound(req.params.article));
  } else {
    res.send(article);
  }
});

app.get("/search", function(req, res) {
  var results = db.fetch(req.query.q);
  res.send(results);
})
