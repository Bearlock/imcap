<template>
  <div>
    <h1>Adaption</h1>
    <table>
      <tr>
        <th></th>
        <th v-for="(measure, index) in measures" :key="index">{{ startCase(convertPoa(measure)) }}</th>
      </tr>
      <tr v-for="(attribute, aIndex) in adaptionAttributes" :key="aIndex">
        <td> {{ startCase(attribute) }} </td>
        <td v-for="(measure, mIndex) in measures" :key="mIndex">
          <input v-if="measure != 'media'" :type="inputType(measure)" @change="saveScore($event, measure, attribute, 'adaption')">
          <select v-else @change="saveScore($event, measure, attribute, 'adaption')">
            <option value="">Please select media</option>
            <option>Instrument</option>
            <option>Movement</option>
            <option>Voice</option>
            <option>Instrument, Movement</option>
            <option>Insturment, Voice</option>
            <option>Movement, Voice</option>
            <option>Instrument, Movement, Voice</option>
          </select>
        </td>
      </tr>
    </table>
    <button @click="genParagraph('adaption')">Generate Adaption Paragraph</button>
    <p v-if="adaptionParagraph">{{ adaptionParagraph }}</p>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

import { 
  startCase, 
  convertPoa, 
  inputType,
  supportType,
  mediaTypeMapping,
  hisHer, 
  heShe
} from "@/utils";

export default {
  methods: {
    startCase,
    convertPoa,
    inputType,
    genTotalScoreSentence() {
      const { sex, adaptionFrequencyAvg, firstName } = this;
      if(adaptionFrequencyAvg == 0) {
        return `In the area of adaption, ${firstName} presented with constrictions the ability to vary ${hisHer(sex)} musical-play in response to the therapist. (Note: Adaption to play examines how ${firstName} follows what the therapist is doing as a play partner, but not necessarily how they respond to specific musical elements).`;
      }
    },
    genJoinsSentence() {
      const {
        adaptionPOA,
        adaptionSupportSentence,
        adaptionFrequency,
        adaptionMedia,
        firstName,
      } = this;
      if(adaptionFrequency.joins == 0) {
        return `${firstName} appeared to display challenges joining into ${mediaTypeMapping(adaptionMedia.joins)} play as led by therapists ${adaptionPOA.joins} ${adaptionSupportSentence()}.`;
      }
    },
    genAdjustsSentence() {
      const {
        sex,
        adaptionMedia,
        adaptionFrequency,
        adaptionPOA,
        adaptionSupportSentence,
      } = this;
      if (adaptionFrequency.adjusts == 0) {
        return `${_.capitalize(heShe(sex))} seemed to display challenges adapting ${hisHer(sex)} participation in ${mediaTypeMapping(adaptionMedia.joins)} play as lead by therapists ${adaptionPOA.adjusts} ${adaptionSupportSentence()}.`;
      }
    },
    genTurnsSentence() {
      const {
        adaptionMedia,
        adaptionSupport,
        adaptionFrequency,
        adaptionPOA,
        firstName
      } = this;
      if (adaptionFrequency.turns == 0) {
        const firstClause = adaptionSupport.turns == 5 
          ? supportType(adaptionSupport.turns)
          : `When given ${supportType(adaptionSupport.turns)}`;

          return `${firstClause}, ${firstName} appeared to display difficulties engaging in ${mediaTypeMapping(adaptionMedia.turns)} turn-taking in response to the therapist's ${adaptionPOA.turns}.`;
      }
    },
    genStopsSentence() {
      const {
        adaptionMedia,
        adaptionSupport,
        adaptionFrequency,
        adaptionSupportSentence,
        firstName,
        sex
      } = this;
      if (adaptionFrequency.turns == 0) {
        return `Lastly, ${firstName} seemed to display challenges stopping ${hisHer(sex)} ${mediaTypeMapping(adaptionMedia.stops)} play when the therapist stopped the music ${adaptionSupportSentence(adaptionSupport.stops)}`;
      }
    },
    adaptionSupportSentence() {
      const { adaptionSupport } = this;
      return adaptionSupport.joins != 5 
        ? `while being provided with ${supportType(adaptionSupport.joins)}`
        : supportType(adaptionSupport.joins);
    },
    genParagraph(type) {
      switch(type) {
        case "adaption": {
          this.$store.commit("adaption/setParagraph", _.join(
            [
              this.genTotalScoreSentence(type),
              this.genJoinsSentence(),
              this.genAdjustsSentence(),
              this.genTurnsSentence(),
              this.genStopsSentence(),
            ],
            " "
          ));
        }
      }
    },
  },
  computed: {
    ...mapState({
      sex: state => state.sex,
      measures: state => state.measures,
      adaptionAttributes: state => _.keys(state.adaption.frequency),
      adaptionFrequency: state => state.adaption.frequency,
      adaptionSupport: state => state.adaption.support,
      adaptionMedia: state => state.adaption.media,
      adaptionPOA: state => state.adaption.poa,
      adaptionParagraph: state => state.adaption.paragraph
    }),
    adaptionFrequencyAvg() {
      return this.$store.getters['adaption/frequencyAvg'];
    },
  }
}
</script>

<style scoped>
table {
  margin: auto;
}
</style>
