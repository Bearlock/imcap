import _ from "lodash";
import store from "@/store"

const startCase = word => _.startCase(word);
const convertPoa = word => word === "poa" ? "point of attention" : word;
const inputType = measure => (measure == "frequency" || measure == "support" ) ? "number" : "text";
const pluralize =  amount => amount > 1 ? "s" : "";
const hisHer = sex => sex == "Male" ? "his" : "her";
const heShe = sex => sex == "Male" ? "he" : "she";

function mediaTypeMapping(media) {
  const mediaMap = {
    "Instrument": "instrumental",
    "Movement": "movement",
    "Voice": "vocal",
    "Instrument, Movement": "instrumental and movement",
    "Instrument, Voice": "instrumental and vocal",
    "Movement, Voice": "movement and vocal",
    "Instrument, Movement, Voice": "instrumental, movement, and vocal"
  };
  return mediaMap[media];
}

function supportType(type) {
  switch(type) {
    case 1: {
      return "full physical support (hand over hand)";
    }
    case 2: {
      return "partial physical support (touch)";
    }
    case 3: {
      return "visual cues";
    }
    case 4: {
      return "verbal cues";
    }
    case 5: {
      return "independently";
    }
  }
}

function saveScore({ target }, measure, attribute, type) {
  const score = (measure == "frequency" || measure =="support") 
    ? parseInt(target.value)
    : target.value
  store.commit(`${type}/saveScore`, { measure, attribute, score });
}

export {
  startCase,
  convertPoa,
  inputType,
  pluralize,
  hisHer,
  heShe,
  supportType,
  mediaTypeMapping,
  saveScore
}
