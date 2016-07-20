var crypto = require("crypto");
var express = require("express");
var db = require("./util/db.js");
var vulcanize = require("vulcanize");
var fs = require("fs")
;;var app = express();
app.get(function(req, res) {
  if(!req.query.rebuild && req.body.rebuild) {
    return next();
  }
  console.log("rebuilding");
  var vulcan = new vulcanize({
    abspath: `${__dirname}/static`
  });
  vulcan.process("dv_index.html", function(err, inlinedHtml) {
    fs.writeFile("static/index.html", inlinedHtml, "utf8", function(err) {
      if(err) console.error(err);
      next();
    });
  });
});
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
    post.body = computeRandomBody(1, 50, query);
    payload.push(post);
  }
  return payload;
}

function computeRandomBody(min, max, query) {
  var numSections = randomRange(min, max);
  if(numSections == 1) {
    return computeRandomString(20, 400) + query + computeRandomString(20, 400);
  }
  var infuseAt = randomRange(0, numSections -1);
  var body = [];
  for(var i = 0; i < numSections; i++) {
    var isSimple = Math.random() > 0.5;
    if(isSimple) {
      if(i == infuseAt) {
        body.push(computeRandomString(20, 400) + query + computeRandomString(20, 400));
      } else {
        body.push(computeRandomString(40, 800));
      }
    } else {
      var numParagraphs = randomRange(1, 8);
      var el = {};
      el.title = computeRandomString(20, 60);
      if(numParagraphs == 1) {
        if(i == infuseAt)
          el.body = computeRandomString(20, 300) + query + computeRandomString(20, 300);
        else
          el.body = computeRandomString(20, 600);
        body.push(el)
        continue;
      }
      el.body = [];
      var infuseAtParagraph = randomRange(0, numParagraphs -1);
      for(var j = 0; j < numParagraphs; j++) {
        if(i == infuseAt && j == infuseAtParagraph) {
          el.body.push(computeRandomString(20, 300) + query + computeRandomString(20, 300));
        } else {
          el.body.push(computeRandomString(40, 1000));
        }
      }
      body.push(el);
    }
  }
  return body;
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
});
