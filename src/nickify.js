function nickify(before) {
  if (!before) return "";
  try {
    return before
      .replace("&amp", "")
      .replace("#039;", "")
      .replace(/[.,\-()&$£;~]/g, "")
      .replace(/\s+/g, "_")
      .toLowerCase();
  } catch (e) {
    console.log("exception in nickify, before = ", before);
  }
}

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
    var nick = nickify(line)
    console.log(nick+"="+line);
})
