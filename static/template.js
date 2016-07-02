var templates = {}

function addTemplate(key, template, true) {
  if(templates[key]) console.warn("Overwritting template");
  templates[key] = template;
}

function buildTemplate(template, data) {
  var isArray = Array.isArray(data);
  var templateString = "";
  if(isArray) {

  } else {
    for(key in data) {
      var regex = `\\[item[ ]*([a-z]*)\\]((.|\s)*)(\\[\/item\\])`;
      var re = new RegExp(regex);
      var exists = re.test(template);
      if(exists) {
        template.replace()
      }
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
    [other_data deep]

    [/other_data deep]
  </div>
</div>`;
