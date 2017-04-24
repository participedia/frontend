const choiceData = require("./choiceData.json");

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
