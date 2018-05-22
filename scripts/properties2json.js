config = require("../intl-config.js");
let properties = require("properties-parser");
let path = require("path");
let FS = require("q-io/fs");
let Habitat = require("habitat");

Habitat.load();
let env = new Habitat();

let supportedLocales = env.get("SUPPORTED_LOCALES") || "*";

function getListLocales() {
  return new Promise(function(resolve, reject) {
    if (supportedLocales === "*") {
      FS.listDirectoryTree(path.join(process.cwd(), config.src))
        .then(function(dirTree) {
          let list = [];
          dirTree.forEach(function(i) {
            let that = i.split(config.src + "/");
            if (that[1]) {
              list.push(that[1]);
            }
          });
          return resolve(list);
        })
        .catch(function(e) {
          console.error(e);
          reject(e);
        });
    } else {
      resolve(supportedLocales);
    }
  });
}

function writeFile(entries) {
  let dictionary = entries.reduce(function(prevEntry, entry) {
    prevEntry[entry.locale] = entry.content;
    return prevEntry;
  }, {});
  let localesPath = path.join(process.cwd(), "src", "locales.json");
  FS.write(localesPath, JSON.stringify(dictionary, null, 2))
    .then(function() {
      console.info("Done writing: " + localesPath);
    })
    .catch(function(e) {
      console.error(e);
    });
}

function getContentMessages(locale) {
  return new Promise(function(resolve, reject) {
    properties.read(
      path.join(process.cwd(), config.src, locale, "messages.properties"),
      function(messageError, messageProperties) {
        if (messageError && messageError.code !== "ENOENT") {
          return reject(messageError);
        }

        resolve({ content: messageProperties || {}, locale: locale });
      }
    );
  });
}

function processMessageFiles(locales) {
  return Promise.all(locales.map(getContentMessages));
}

getListLocales()
  .then(processMessageFiles)
  .then(writeFile)
  .catch(function(err) {
    console.error(err);
  });
