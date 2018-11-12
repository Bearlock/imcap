import Vue from "vue";
import Vuex from "vuex";

import attention from "./modules/attention";
import affect from "./modules/affect";
import adaption from "./modules/adaption";
import engagement from "./modules/engagement";
import interrelatedness from "./modules/interrelatedness";

Vue.use(Vuex);

const mutations = {
  resetIntake(state) {
    state.firstName = "";
    state.lastName = "";
    state.diagnosis = "";
    state.birthDate = null;
    state.intakeDate =  null;
    state.reportDate = null;
    state.sessionLength = 0;
    state.therapists = [];
    state.author = "";
  },
  saveIntake(state, { type, value }) {
    state[type] = value;
  }
}

const store = new Vuex.Store({
  modules: {
    attention,
    affect,
    adaption,
    engagement,
    interrelatedness
  },
  state: {
    sex: null,
    firstName: "",
    lastName: "",
    diagnosis: "",
    birthDate: null,
    intakeDate: null,
    reportDate: null,
    duration: 0,
    therapists: [],
    author: "",
    measures: ["frequency", "support", "media", "poa"]
  },
  mutations,
  strict: false,
});

export default store;
