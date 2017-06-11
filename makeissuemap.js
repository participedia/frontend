function nickify(before) {
  if (!before) return "";
  try {
    return before
      .trim()
      .replace("&amp", "")
      .replace("#039;", "")
      .replace(/[.,\-()&$£;~]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
  } catch (e) {
    console.log("exception in nickify, before = ", before);
  }
}

let LineByLineReader = require("line-by-line");
let lr = new LineByLineReader("categorymaps.txt");

let general_issue = "";
let issue_map = {};
let issue_list = [];
lr.on("line", function(line) {
  if (line.trim() !== "") {
    if (line[0] === "\t") {
      // add the thing after the tab as an option to the current heading
      issue_map[general_issue].push(nickify(line.slice(1, line.length)));
    } else {
      let issue = nickify(line);
      general_issue = issue;
      issue_list.push(issue);
      issue_map[general_issue] = [];
    }
  }
});
lr.on("end", function() {
  issue_map["issue"] = issue_list;
  console.log(JSON.stringify(issue_map, null, 4));
});
