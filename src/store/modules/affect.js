import _ from "lodash";

export const actions = {};
export const getters = {
  frequencyAvg: ({ frequency }) => _.sum(frequency) / frequency.length,
  supportAvg: ({ support }) => _.sum(support) / support.length
};
export const mutations = {
  setAttribute(state, attribute, properties) {
    const allowableProps = _.keys(state[attribute]);
    _.each(properties, (value, key) => {
      state[attribute][key] = (_.includes(allowableProps, key) && !_.isEmpty(value)) 
        ? value 
        : state[attribute][key];
    })
  }
};

export default {
  namespaced: true,
  state: {
    frequency: [0, 0, 0, 0],
    support: [0, 0, 0, 0],
    media: ["", "", "", ""],
    "point of attention": ["", "", "", ""],
    attributes: ["facial", "prosody", "body", "motion"]
  },
  actions,
  getters,
  mutations
}
