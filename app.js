var crypto = require("crypto");
var express = require("express");
var db = require("./util/db.js");
var app = express();
app.use(express.static("static"));
app.listen(80);
app.get("/search", function(req, res) {
  var numResults = 100;
  res.send(generateDummyResults(numResults));
});

function generateDummyResults(num) {
  var payload = [];
  for(var i = 0; i < num; i++) {
    var str = crypto.randomBytes(16).toString("base64");
    payload.push(str);
  }
  return payload
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
