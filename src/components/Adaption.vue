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
    <button @click="genParagraph()">Generate Adaption Paragraph</button>
    <p class="paragraph" v-if="adaptionParagraph">{{ adaptionParagraph }}</p>
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
  heShe,
  saveScore
} from "@/utils";

export default {
  methods: {
    startCase,
    convertPoa,
    inputType,
    saveScore,
    genTotalScoreSentence() {
      const { sex, adaptionFrequencyAvg, firstName } = this;
      switch(Math.floor(adaptionFrequencyAvg)) {
        case 0: {
          return `In the area of adaption, ${firstName} presented with constrictions the ability to vary ${hisHer(sex)} musical-play in response to the therapist. (Note: Adaption to play examines how ${firstName} follows what the therapist is doing as a play partner, but not necessarily how they respond to specific musical elements).`;
        }
        case 1:
        case 2: {
          return `In the area of adaption, ${firstName} occasionally displayed the ability to vary ${hisHer(sex)} musical-play in response to the therapist. (Note: Adaption to play examines how ${firstName} follows what the therapist is doing as a play partner, but not necessarily how they respond to specific musical elements).`;
        }
        case 3:
        case 4: {
          return `In the area of adaption, ${firstName} often displayed the ability to vary ${hisHer(sex)} musical-play in response to the therapist. (Note: Adaption to play examines how ${firstName} follows what the therapist is doing as a play partner, but not necessarily how they respond to specific musical elements).`;
        }
        case 5: {
          return `In the area of adaption, ${firstName} consistently displayed the ability to vary ${hisHer(sex)} musical-play in response to the therapist. (Note: Adaption to play examines how ${firstName} follows what the therapist is doing as a play partner, but not necessarily how they respond to specific musical elements).`;
        }
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
      switch(adaptionFrequency.joins) {
        case 0: {
          return `${firstName} appeared to display challenges joining into ${mediaTypeMapping(adaptionMedia.joins)} play as led by therapist's ${adaptionPOA.joins} ${adaptionSupportSentence()}.`;
        }
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
      switch(adaptionFrequency.adjusts) {
        case 0: {
          return `${_.capitalize(heShe(sex))} seemed to display challenges adapting ${hisHer(sex)} participation in ${mediaTypeMapping(adaptionMedia.joins)} play as lead by therapist's ${adaptionPOA.adjusts} ${adaptionSupportSentence()}.`;
        }
        case 1: {
          return `${_.capitalize(heShe(sex))} rarely adapted ${hisHer(sex)} participation in ${mediaTypeMapping(adaptionMedia.joins)} play as lead by therapist's ${adaptionPOA.adjusts} ${adaptionSupportSentence()}.`;
        }
        case 2: {
          return `${_.capitalize(heShe(sex))} occasionally adapted ${hisHer(sex)} participation in ${mediaTypeMapping(adaptionMedia.joins)} play as lead by therapist's ${adaptionPOA.adjusts} ${adaptionSupportSentence()}.`;
        }
        case 3: {
          return `${_.capitalize(heShe(sex))} frequently adapted ${hisHer(sex)} participation in ${mediaTypeMapping(adaptionMedia.joins)} play as lead by therapist's ${adaptionPOA.adjusts} ${adaptionSupportSentence()}.`;
        }
        case 4: {
          return `${_.capitalize(heShe(sex))} often adapted ${hisHer(sex)} participation in ${mediaTypeMapping(adaptionMedia.joins)} play as lead by therapist's ${adaptionPOA.adjusts} ${adaptionSupportSentence()}.`;
        }
        case 5: {
          return `${_.capitalize(heShe(sex))} consistently adapted ${hisHer(sex)} participation in ${mediaTypeMapping(adaptionMedia.joins)} play as lead by therapist's ${adaptionPOA.adjusts} ${adaptionSupportSentence()}.`;
        }
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

      const firstClause = adaptionSupport.turns == 5
        ? supportType(adaptionSupport.turns)
        : `When given ${supportType(adaptionSupport.turns)}`;

      switch(adaptionFrequency.turns) {
        case 0: {
          return `${firstClause}, ${firstName} appeared to display difficulties engaging in ${mediaTypeMapping(adaptionMedia.turns)} turn-taking in response to the therapist's ${adaptionPOA.turns}.`;
        }
        case 1: {
          return `${firstClause}, ${firstName} rarely illustrated the ability to enage in  ${mediaTypeMapping(adaptionMedia.turns)} turn-taking in response to the therapist's ${adaptionPOA.turns}.`;
        }
        case 2: {
          return `${firstClause}, ${firstName} occasionally illustrated the ability to enage in  ${mediaTypeMapping(adaptionMedia.turns)} turn-taking in response to the therapist's ${adaptionPOA.turns}.`;
        }
        case 3: {
          return `${firstClause}, ${firstName} frequently illustrated the ability to enage in  ${mediaTypeMapping(adaptionMedia.turns)} turn-taking in response to the therapist's ${adaptionPOA.turns}.`;
        }
        case 4: {
          return `${firstClause}, ${firstName} often illustrated the ability to enage in  ${mediaTypeMapping(adaptionMedia.turns)} turn-taking in response to the therapist's ${adaptionPOA.turns}.`;
        }
        case 5: {
          return `${firstClause}, ${firstName} consistently illustrated the ability to enage in  ${mediaTypeMapping(adaptionMedia.turns)} turn-taking in response to the therapist's ${adaptionPOA.turns}.`;
        }
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
      switch(adaptionFrequency.stops) {
        case 0: {
          return `Lastly, ${firstName} seemed to display challenges stopping ${hisHer(sex)} ${mediaTypeMapping(adaptionMedia.stops)} play when the therapist stopped the music ${adaptionSupportSentence(adaptionSupport.stops)}`;
        }
        case 1: {
          return `Lastly, ${firstName} rarely exhibited the capacity to stop ${hisHer(sex)} ${mediaTypeMapping(adaptionMedia.stops)} play when the therapist stopped the music ${adaptionSupportSentence(adaptionSupport.stops)}`;
        }
        case 2: {
          return `Lastly, ${firstName} occasionally exhibited the capacity to stop ${hisHer(sex)} ${mediaTypeMapping(adaptionMedia.stops)} play when the therapist stopped the music ${adaptionSupportSentence(adaptionSupport.stops)}`;
        }
        case 3: {
          return `Lastly, ${firstName} frequently exhibited the capacity to stop ${hisHer(sex)} ${mediaTypeMapping(adaptionMedia.stops)} play when the therapist stopped the music ${adaptionSupportSentence(adaptionSupport.stops)}`;
        }
        case 4: {
          return `Lastly, ${firstName} often exhibited the capacity to stop ${hisHer(sex)} ${mediaTypeMapping(adaptionMedia.stops)} play when the therapist stopped the music ${adaptionSupportSentence(adaptionSupport.stops)}`;
        }
        case 5: {
          return `Lastly, ${firstName} consistently exhibited the capacity to stop ${hisHer(sex)} ${mediaTypeMapping(adaptionMedia.stops)} play when the therapist stopped the music ${adaptionSupportSentence(adaptionSupport.stops)}`;
        }
      }
    },
    adaptionSupportSentence() {
      const { adaptionSupport } = this;
      return adaptionSupport.joins != 5 
        ? `while being provided with ${supportType(adaptionSupport.joins)}`
        : supportType(adaptionSupport.joins);
    },
    genParagraph() {
      this.$store.commit("adaption/setParagraph", _.join(
        [
          this.genTotalScoreSentence(),
          this.genJoinsSentence(),
          this.genAdjustsSentence(),
          this.genTurnsSentence(),
          this.genStopsSentence(),
        ],
        " "
      ));
    },
  },
  computed: {
    ...mapState({
      sex: state => state.sex,
      measures: state => state.measures,
      firstName: state => state.firstName,
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

.paragraph {
  text-align: left;
  font-size: 1.1em;
}
</style>
