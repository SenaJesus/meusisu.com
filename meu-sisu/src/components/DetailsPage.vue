<template>
  <div class="details-section">
    <div class="image"></div>
    <div class="details" v-if="!loading">
      <div class="summary">
        <div class="back-btn" @click="hideDetails()">
          <v-icon icon="mdi-arrow-left-circle" size="x-large"></v-icon>
        </div>
        <div class="informations">
          <div class="curso">
            <p class="course-name">{{ course?.curso }}</p>
            <p class="university-name">{{ course?.universidade }}</p>
          </div>
          <div class="description">
            <div class="column">
              <p class="info-text">{{ course?.turno }} - {{ course?.grau }}</p>
            </div>
            <div class="column">
              <p class="info-text">
                <v-icon slot="prepend" icon="mdi-school" size="small"></v-icon>
                {{ course?.campus }}
              </p>
              <p class="info-text">
                <v-icon slot="prepend" icon="mdi-map-marker-circle" size="small"></v-icon>
                {{ course?.cidade }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="years-list">
        <div style="height: 10px"></div>
        <year-card :enem="course.enem[i]" :informations="year" :theme="'dark'" v-for="(year, i) in course?.cortes"
          :key="i" :parciais="i === course?.cortes.length - 1 ? course.parciais : null"></year-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import YearCard from "./YearCard.vue";
import LoaderHolderIceCream from "../components/LoaderHolderIceCream.vue";
import LoaderHolderGlass from "../components/LoaderHolderGlass.vue";
import { useStore } from "@/stores/global";

export default defineComponent({
  emits: ["hide"],

  components: {
    "loader-holder-ice-cream": LoaderHolderIceCream,
    "loader-holder-glass": LoaderHolderGlass,
    "year-card": YearCard,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    course: null as any,
    loading: true,
  }),

  setup() {
    const pinia = useStore();

    return {
      pinia,
    };
  },

  mounted() {
    if (this.id !== "") {
      axios
        .get("https://mysisu.rj.r.appspot.com/get_data_id", {
          headers: {
            key: "89<OOJNQJKzr*{#",
            path: this.id,
            "User-Session": this.pinia.user_session_id,
          },
        })
        .then((response: any) => {
          this.course = response.data[0];
          this.course.parciais = eval(this.course?.parciais);
          this.loading = false;
        })
        .catch((error: any) => {
          this.$router.push("/erro/" + error.response.status);
        });
    }
  },

  methods: {
    hideDetails() {
      this.$emit("hide");
    },
  },

  name: "DetailsPage",
});
</script>

<style scoped lang="scss">
.image {
  background-image: url(../assets/images/background-search.jpg);
  height: 50px;
  background-size: cover;
  background-position-y: 15%;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: red;
  margin-top: 200px;
}

.years-list {
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
}

.informations {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  color: #707070;
}

.details {
  padding: 6vh 10vw;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary {
  display: flex;
  margin-bottom: 25px;
  width: 100%;
}

.back-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-btn:hover {
  cursor: pointer;
}

.back-btn ion-icon {
  font-size: 100px;
  color: #321e65;
  cursor: pointer;
}

.curso {
  font-weight: 600;
  color: #434343;
  margin-bottom: 10px;
  border-bottom: 1px solid #dbdbdb;
  line-height: 35px;
}

.course-name {
  font-size: 2em;
  line-height: 30px;
}

.university-name {
  margin-top: 10px;
  font-size: 1.2em;
  font-weight: 500;
  padding-bottom: 10px;
  line-height: 20px;
}

.description {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-wrap: wrap;
}

.column {
  margin-left: 20px;
  color: #707070;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.column:first-child {
  display: flex !important;
  flex-direction: row;
  font-size: 16px;
  font-weight: 600;
}

p {
  margin: 0;
  display: flex;
  gap: 10px;
}

@media screen and (max-width: 1200px) {
  .course-name {
    font-size: 1.7em;
  }

  .university-name {
    font-size: 1em;
  }

  .column {
    font-size: 14px !important;
  }
}

@media screen and (max-width: 1000px) {
  .details {
    padding: 60px 50px !important;
  }

  .back-btn {
    width: 40px;
    height: 35px;

    ion-icon {
      font-size: 80px !important;
    }
  }
}

@media screen and (max-width: 800px) {
  .description {
    flex-direction: column;
    gap: 10px;
  }

  .informations {
    padding-right: 20px !important;
  }
}

@media screen and (max-width: 680px) {
  .course-name {
    font-size: 1.9em;
  }

  .university-name {
    font-size: 0.8em;
  }

  .details {
    padding: 20px 10px 50px 10px !important;
  }

  .informations {
    padding: 0 10px;
  }

  .column {
    margin-left: 0;
    gap: 5px;
  }

  .description {
    font-size: 3px !important;
    gap: 10px;
    display: flex;
    flex-direction: column;
  }

  .summary {
    margin-bottom: 10px;
    gap: 8px;
  }

  .weights .weights-list {
    padding-left: 10px !important;
  }

  :deep(.v-icon--size-x-large) {
    font-size: 20px;
  }
}

@media screen and (max-width: 500px) {
  .curso {
    margin-bottom: 5px;
  }

  .course-name {
    font-size: 1.35em!important;
    line-height: 27px!important;
  }

  .university-name {
    margin-top: 5px;
    font-size: 0.8em;
    padding-bottom: 5px;
  }

  .info-text {
    font-size: 13px;
  }

  .description {
    gap: 7px;
  }

  .informations {
    padding: 0 5px;
  }

  .details {
    padding-top: 10px !important;
    gap: 5px;
  }

  .back-btn {
    width: 25px !important;
  }
}
</style>
