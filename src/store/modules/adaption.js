import _ from "lodash";

export const actions = {};
export const getters = {
  frequencyAvg: state => _.sum(_.values(state.frequency)) / _.keys(state.frequency).length,
  supportAvg: state => _.sum(state.support) / state.support.length
};
export const mutations = {
  saveScore: (state, { measure, attribute, score }) => state[measure][attribute] = score,
  setParagraph: (state, paragraph) => state.paragraph = paragraph
};

export default {
  namespaced: true,
  state: {
    paragraph: "",
    frequency: {
      joins: 0,
      adjusts: 0,
      turns: 0,
      stops: 0
    },
    support: {
      joins: 0,
      adjusts: 0,
      turns: 0,
      stops: 0
    },
    media: {
      joins: "",
      adjusts: "",
      turns: "",
      stops:"" 
    },
    poa: {
      joins: "",
      adjusts: "",
      turns: "",
      stops:"" 
    },
  },
  actions,
  getters,
  mutations
};
