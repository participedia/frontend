const caseChoiceData = require("./case.choices.json");
const methodChoiceData = require("./method.choices.json");
const orgChoiceData = require("./organization.choices.json");

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

console.log(choiceData);

export default function getChoices(property) {
  if (choiceData[property]) {
    return choiceData[property];
  } else {
    console.error(
      `No choice data for property: ${property}, returning sample data`
    );
    return ["vanilla", "chocolate", "strawberry"];
  }
}
