let { readdirSync: readdir } = require("fs");
let { execFileSync: exec } = require("child_process");
let {
  underscored,
  capitalize,
  startsWith,
  endsWith
} = require("underscore.string");

let countrynames = `"Afghanistan","Albania","Argentina","Australia","Austria","Bangladesh","Belgium","Bolivia","Brazil","Bulgaria","Cameroon","Canada","Cape Verde","Chile","China","Colombia","Czech Republic","Denmark","Deutschland","Dominican Republic","Egypt","Estonia","Ethiopia","Fiji","Finland","France","Germany","Ghana","Greece","Guatemala","Hungary","Iceland","India","Indonesia","Iraq","Ireland","Israel","Italy","Japan","Kenya","Latvia","Lebanon","Luxembourg","Madagascar","Malawi","Mexico","Mongolia","Morocco","Nepal","Netherlands","New Zealand","Nigeria","Pakistan","Palestinian Territory","Paraguay","Peru","Philippines","Poland","Portugal","Romania","Russia","Rwanda","Slovenia","South Africa","South Korea","Spain","Sweden","Switzerland","Taiwan","Tanzania","Tunisia","Turkey","Uganda","United Kingdom","United States","Uruguay","Zimbabwe"`
  .replace(/"/g, "")
  .split(",");

let notWorld = s => !startsWith(s, "world");
let notHigh = s => !endsWith(s.split(".")[0], "High");
let removeLow = s => s.replace("Low", "");
let countryfiles = readdir("public/img/countries");
let basepath =
  "http://assets.participedia.xyz.s3-website-us-east-1.amazonaws.com/countries/fullname/";
let countryurls = countryfiles
  .filter(notHigh)
  .filter(notWorld)
  .map(removeLow)
  .map(underscored)
  .map(a =>
    a
      .split("_")
      .map(capitalize)
      .join(" ")
  );

countrynames.forEach(s => console.log('curl -O "' + basepath + s + '.svg"'));

process.chdir("temp");
countrynames.forEach(s => exec("curl", ["-O", basepath + s + ".svg"]));
