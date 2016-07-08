var crypto = require("crypto");
var express = require("express");
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
