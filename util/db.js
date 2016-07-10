var mysql = require("mysql2");
try {
  var dbConfig = JSON.parse(fs.readFileSync("dbconf.json"));
} catch(e) {
  dbConfig = {};
  console.warn("No config file found, attempting to use unsafe parameters!");
}

var conn = mysql.createConnection({
  host: dbConfig.host || "localhost",
  user: dbConfig.user || "root",
  password: dbConfig.password || "root",
  database: dbConfig.database || "wiki_dev"
});

var db = {
  // Gets article by its defined title
  fetch: function(title, cb) {
    var q = "SELECT * FROM article where title = :title";
    conn.query(q, {title: title}, function(err, data) {
      if(err) {
        logError("fetch", q, err);
        cb([]);
      }
      else cb(data);
    });
  },

  // Fulltext searches titles and bodies and returns an array of results
  search: function(query, cb) {
    var q = `SELECT title
             FROM articles
             WHERE MATCH(title, body)
             AGAINST (:query IN NATURAL LANGUAGE MODE)`;
    conn.query(q, {query: query}, function(err, data) {
      if(err) {
        logError("search", q, err);
        cb([]);
      } else {
        cb(data);
      }
    });
  }
}

module.exports = db;
