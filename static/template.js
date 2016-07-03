var templates = {}

function addTemplate(key, template) {
  if(templates[key]) console.warn("Overwritting template");
  templates[key] = template;
}

function buildTemplate(template, data) {
  var isArray = Array.isArray(data);
  var templateString = "";
  if(isArray) {

  } else {
    for(item in data) {
      // Testing visible at https://regex101.com/r/nV7wQ4/2
      // TODO (jkk111): Learn to regex.
      var regex = `\\[${item}[ ]?([a-z]*)?\\](.*?(?=\\[\\/${item}\\]))?`;
      var re = new RegExp(regex);
      var exists = re.test(template);
      if(exists) {
        template.replace(re, function() {
          var deep, isArray;
          var pre = template.substring(0, arguments[3]);
          var post = template.substring(arguments[3] + arguments[4].length);
          console.log(arguments);
          console.log(template.substring(arguments[3]));
          return "arguments"; // << So what should happen here is the returned value should replace the matched part of the string, however that may not be possible in this case
        })
        console.log(template);
      } else {
        console.log("hi");
      }
    }
  }
}

function indexedReplace(base, key, data) {
  var index = base.indexOf(`[${key}]`);
  if(index == -1) {
    // Base version doesn't exist however value could be an object/array
    index = base.indexOf(`[${key} repeat]`);
    if(index != -1) {
      // It's an array, take the next section for each value;
    } else if(base.indexOf(`[${key} deep]`) != -1) {

    }
  } else {
    // Its a simple key replacement!
    while(base.indexOf(`[${key}]`) != -1) {
      base.replace(`[${key}]`, data);
    }
  }
}


var a = `<div class="incoherent-class">
  [main]
  <div class="test">
    [items repeat]
      <h1 class="title">
        [title]
      </h1>
      <div class="entry">
        [entry]
      </entry>
    [/items]
  </div>
  <div class="other-data">
  </div>
</div>`;

var testData = {
  main: "testing",
  items: [
    {
      title: "yes",
      entry: "this is true"
    },
    {
      title: "no",
      entry: "This is not true"
    },
  ],
  other_data: {
    name: "the thing"
  }
}
console.log("hello world");
buildTemplate(a, testData);
