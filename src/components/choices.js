const caseChoiceData = require("./case.choices.json");
const methodChoiceData = require("./method.choices.json");
const orgChoiceData = require("./organization.choices.json");
const issueChoiceData = require("./issuemap.json");

let choiceData = {};
for (let key in caseChoiceData) {
  if (!caseChoiceData.hasOwnProperty(key)) continue;
  choiceData[key] = caseChoiceData[key];
}
for (let key in methodChoiceData) {
  if (!methodChoiceData.hasOwnProperty(key)) continue;
  choiceData[key] = methodChoiceData[key];
}
for (let key in orgChoiceData) {
  if (!orgChoiceData.hasOwnProperty(key)) continue;
  choiceData[key] = orgChoiceData[key];
}
for (let key in issueChoiceData) {
  if (!issueChoiceData.hasOwnProperty(key)) continue;
  choiceData[key] = issueChoiceData[key];
}

export function getChoices(property) {
  if (choiceData[property]) {
    return choiceData[property];
  } else {
    console.error(
      `No choice data for property: ${property}, returning sample data`
    );
    return ["vanilla", "chocolate", "strawberry"];
  }
}

export function makeLocalizedChoices(intl, property) {
  let choices = getChoices(property).map(function(v) {
    return {
      text: intl.formatMessage({ id: v }),
      value: v
    };
  });
  return choices.sort(function(a, b) {
    if (typeof a == undefined) return -1;
    if (typeof b == undefined) return 1;
    if (!a.text) return -1;
    if (!b.text) return 1;
    if (typeof a == typeof {}) {
      if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
      if (a.text.toLowerCase() === b.text.toLowerCase()) return 0;
    } else {
      if (a < b) {
        return -1;
      }
      if (a == b) {
        return 0;
      }
    }
    return 1;
  });
}
