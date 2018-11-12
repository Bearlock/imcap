<template>
  <div>
    <h1>{{ college }}</h1>
    <h2>Intake Session Summary</h2>
    <div>
      <div class="row form" v-show="formVisible">
        <div class="column">
          <div class="input-div">
            <label for="first-name">First Name</label>
            <input id="firstName" class="input-field" @change="saveIntake($event, 'firstName')">
          </div>
          <div class="input-div">
            <label for="last-name">Last Name</label>
            <input id="last-name" class="input-field" @change="saveIntake($event, 'lastName')">
          </div>
          <div class="input-div">
            <label for="sex">Sex</label>
            <select id="sex"  class="input-field" @change="saveIntake($event, 'sex')">
              <option value="">Please select one</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div class="input-div">
            <label for="diagnosis">Diagnosis</label>
            <input id="diagnosis" class="input-field" @change="saveIntake($event, 'diagnosis')">
          </div>
          <div class="input-div">
            <label for="author">Author</label>
            <input id="author" class="input-field" @change="saveIntake($event, 'author')">
          </div>
        </div>
        <div class="column">
          <div class="input-div">
            <label for="therapists">Therapist(s)</label>
            <input id="therapists" class="input-field" @change="saveIntake($event, 'therapists')">
          </div>
          <div class="input-div">
            <label for="duration">Duration</label>
            <input id="duration" type="number" class="input-field" @change="saveIntake($event, 'duration')">
          </div>
          <div class="input-div">
            <label for="birth-date">Birth Date</label>
            <input id="birth-date" type="date" class="input-field" @change="saveIntake($event, 'birthDate')">
          </div>
          <div class="input-div">
            <label for="intake-date">Intake Date</label>
            <input id="intake-date" type="date" class="input-field" @change="saveIntake($event, 'intakeDate')">
          </div>
          <div class="input-div">
            <label for="report-date">Report Date</label>
            <input id="report-date" type="date" class="input-field" @change="saveIntake($event, 'reportDate')">
          </div>
        </div>
      </div>
      <button v-show="formVisible" id="showIntake" @click="toggleParagraph">Generate Paragraph</button>
      <button v-show="paragraphVisible" id="newForm" @click="newForm">New Form</button>
    </div>
    <div v-show="paragraphVisible">
      <p class="paragraph">
        {{ firstName }} is a {{ age }} year old who recently attended The Rebecca Center for Music Therapy at Molloy College for an Intake/Evaluation session to determine future placement in our program. {{ firstName }} participated in a {{ duration }} minute session facilitated by {{ therapistCount }} Board Certified Music Therapist{{ pluralize(therapists.length) }}{{ therapistString }}.
        
        The primary therapist is responsible for creating the music on the piano and/or guitar, while the co-therapist provides musical, physical, and sensory support in order to enhance musical engagement and relatedness. The aim of the session is to assess {{ firstName }}’s level of musical awareness and their capacity for musical engagement and relatedness within the context of musical-play. This is examined through the use of improvised music that takes into account {{ firstName }}’s unique responses, reactions, and interests to the music and with the instruments as well as through vocal responses, movement, and/or gestures. As {{ firstName }} takes part in co-creating music, the therapists assess their ability to musically engage in a related and communicative manner, based on five levels of musical responsiveness that are related to social-emotional developments, such as: 1) Musical Attention, 2) Musical-Affect, 3) Adaption to Musical-Play, 4) Musical Engagement, and  5) Musical Inter-relatedness.

        The Musical Emotional Profile (MEP) is based on the Individual Music-Centered Assessment Profile for Neurodevelopmental Disorders (IMCAP-ND). The MEP is a music-centered based music therapy profiling & system targeting the above mentioned five areas of musical responsiveness. The areas of responsiveness are based on social-emotional & developmental milestones and are consistent with the DIR/Floortime® A30Model™. Various modes of musical expression, such as use of instruments, voice, movement, and gestures, are observed. Each level is evaluated based on the duration and quality of {{ firstName }}'s musical responsiveness & within the context of musical-play. In addition, it is also noted what types of support (i.e., verbal, visual, physical) may be effective in order to help {{ firstName }} maximize their capacity to musically relate, communicate, and think while engaged in musical-play.
      </p>
    </div>
    <adaption></adaption>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import { mapState } from "vuex";
import { pluralize } from "@/utils";
import Adaption from "@/components/Adaption";

export default {
  components: { Adaption },
  data() {
    return {
      college: "The Rebecca Center for Music Therapy at Molloy College",
      paragraphVisible: false,
      formVisible: true,
    };
  },
  methods: {
    pluralize,
    saveIntake({ target }, type) {
      const value = type == "duration" ? parseInt(value) : value;
      this.$store.commit("saveIntake", { type, value: target.value })
    },
    toggleParagraph() {
      this.paragraphVisible = !this.paragraphVisible;
      this.formVisible = !this.formVisible;
    },
    newForm() {
      this.toggleParagraph();
      this.$store.commit("resetIntake");
      location.reload();
    },
  },
  computed: {
    ...mapState({
      sex: state => state.sex,
      firstName: state => state.firstName,
      lastName: state => state.lastName,
      diagnosis: state => state.diagnosis,
      birthDate: state => state.birthDate,
      intakeDate: state => state.intakeDate,
      reportDate: state => state.reportDate,
      duration: state => state.duration,
      therapists: state => state.therapists,
      author: state => state.author,
    }),
    age() {
      return this.birthDate ? moment().diff(this.birthDate.split("-"), "years") : 0;
    },
    therapistString() {
      const length = this.therapists.length;
        if (length > 1) {
          if (length > 2) {
            return ` (primary and co-therapists), ${_.join(_.initial(this.therapists), ", ")} and ${_.last(this.therapists)}`;
          }
            return ` (primary and co-therapist), ${_.join(this.therapists, " and ")}`;
        }
        return `, ${_.head(this.therapists)}`;
    },
    therapistCount() {
      const length = this.therapists.length;
      return length > 1 ? length : "a";
    }
  }
}
</script>

<style>
.row {
  display: flex;
}

.column {
  flex: 50%;
}

.input-field {
  /* To make sure that all text fields have the same font settings
     By default, textareas have a monospace font */
  font: 1em sans-serif;

  /* To give the same size to all text fields */
  width: 300px;
  box-sizing: border-box;

  /* To harmonize the look & feel of text field border */
  border: 1px solid #999;
  border-radius: 5px;
}

.input-field:focus {
  /* To give a little highlight on active elements */
  border-color: #000;
}

.form {
  /* Just to center the form on the page */
  margin: 0 auto;

  /* To see the limits of the form */
  padding: 1em;
  border: 1px solid #CCC;
  border-radius: 1em;
}

label {
  /* To make sure that all label have the same size and are properly align */
  display: inline-block;
  width: 90px;
  text-align: left;
}

.input-div {
  padding: 5px;
}

.paragraph {
  text-align: left;
  font-size: 1.1em;
}
</style>
