/* global XMLHttpRequest */

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function readTextFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status === "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

export function toTitleCase(str) {
  try {
    if (str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  } catch (e) {
    console.trace(e);
    return str;
  }
}

export function deDupeThings(things) {
  const thingIds = things.map(thing => thing.id);
  const uniqueIds = Array.from(new Set(thingIds));

  return uniqueIds.map(id => {
    // filter things to create array of items for each id
    const filteredItems = things.filter(m => m.id === id);
    // select last item in filtered items list
    return filteredItems[filteredItems.length - 1];
  });
}
