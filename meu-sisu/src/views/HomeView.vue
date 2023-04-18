<template>
  <div class="background"></div>
  <div class="home">
    <div class="top-area" v-show="!show_details">
      <div class="parallax-wrap">
        <span value="15"><img src="/src/assets/images/circulo-2.png" /></span>
        <span value="5"></span>
        <span value="5"></span>
        <span value="-5"><img src="/src/assets/images/circulo-4.png" /></span>
        <span value="15"></span>
        <span value="5"><img src="/src/assets/images/circulo-3.png" /></span>
        <span value="-5"><img src="/src/assets/images/circulo-4.png" /></span>
      </div>
      <div class="wrapper">
        <div class="welcome-content">
          <div class="text">
            <p>
              Bem-vindos ao <strong>Meu SiSU</strong>! Aqui você pode consultar
              as suas chances de realizar o curso dos seus sonhos em todas as
              faculdades do Brasil!
            </p>
            <p>
              Para começar, você pode inserir algumas informações nos campos
              abaixo!
            </p>
          </div>
        </div>
        <div class="search-field" v-show="!show_details">
          <location-select-field
            @input="selected_location = $event"
            :locations="locationsList"
            :placeholder="'Localização'"
          ></location-select-field>
          <institution-select-field
            @input="selected_institution = $event"
            :institutions="institutionsList"
            :placeholder="'Instituição'"
          ></institution-select-field>
          <courses-select-field
            @input="selected_course = $event"
            :courses="coursesList"
            :placeholder="'Curso'"
          ></courses-select-field>
        </div>
        <div v-if="show_details" style="height: 40px;"></div>
      </div>
    </div>
    <div class="down-area">
      <result-section
        v-if="!show_details"
        :list="results"
        :results-text="resultsText"
        @click="showDetails($event)"
      ></result-section>
      <details-section
        v-if="show_details"
        :id="selected_id"
        @hide="show_details = false"
      ></details-section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, toRaw } from "vue";
import axios from "axios";

import type { State, Institution, Course, CourseSearch } from "../models/index";
import LocationSelectField from "../components/LocationSelectField.vue";
import InstitutionSelectField from "../components/InstitutionSelectField.vue";
import CoursesSelectField from "@/components/CoursesSelectField.vue";
import { useStore } from "../stores/global";

document.addEventListener("mousemove", parallax);

function parallax(event: any) {
  document.querySelectorAll(".parallax-wrap span").forEach((shift: any) => {
    const position = shift.getAttribute("value");
    const x = (window.innerWidth - event.pageX * position) / 1000;
    const y = (window.innerHeight - event.pageY * position) / 1000;

    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

import get_search from "../data/data.json";
import locations_json from "../data/locations.json";
import courses_json from "../data/courses.json";
import institutions_json from "../data/institutions.json";

import LoaderHolderIceCream from "../components/LoaderHolderIceCream.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    "details-section": defineAsyncComponent({
      loader: () => import("../components/DetailsPage.vue"),
      loadingComponent: LoaderHolderIceCream,
      delay: 200,
    }),
    "result-section": defineAsyncComponent({
      loader: () => import("../components/ResultSection.vue"),
      loadingComponent: LoaderHolderIceCream,
      delay: 200,
    }),
    "location-select-field": LocationSelectField,
    "institution-select-field": InstitutionSelectField,
    "courses-select-field": CoursesSelectField,
  },

  data: () => ({
    data: get_search as CourseSearch[],
    locations: locations_json as State[],
    institutions: institutions_json as Institution[],
    courses: courses_json as Course[],
    selected_location: null as State | null,
    selected_institution: null as Institution | null,
    selected_course: null as Course | null,
    show_details: false,
    resultsText: "Exibindo todos os resultados...",
    selected_id: "",
  }),

  setup() {
    const pinia = useStore();

    return {
      pinia
    };
  },

  methods: {
    showDetails(id: string) {
      this.selected_id = id;
      this.show_details = true;
    },

    hideDetails() {
      this.show_details = false;
    },
  },

  computed: {
    results() {
      let result = this.data;

      if (
        !this.selected_location &&
        !this.selected_institution &&
        !this.selected_course
      )
        return result;

      if (this.selected_location)
        result = result.filter((course) => {
          return course.estado.sigla.toLowerCase() === this.selected_location?.sigla.toLowerCase();
        });

      if (this.selected_institution)
        result = result.filter((course: any) => {
          return this.selected_institution?.universidade.toLowerCase().includes(course.universidade.toLowerCase());
        });

      if (this.selected_course)
        result = result.filter((course: any) => {
          return this.selected_course?.curso.toLowerCase() === course.curso.toLowerCase();
        });

      if (result.length <= 0)
        this.resultsText =
          "Hummm, parece nenhum resultado corresponde à sua pesquisa...";
      else this.resultsText = "Exibindo resultados de sua busca...";

      return result;
    },
    institutionsList() {
      let result = toRaw(this.institutions);

      if (this.selected_course)
        result = this.selected_course?.universidades as any;

      if (this.selected_location)
        result = result.filter((institution) => {
          return institution.estado.sigla === this.selected_location?.sigla;
        });

      return result;
    },
    coursesList() {
      let result = toRaw(this.courses);

      if (this.selected_location)
        result = result.filter((course) => {
          return course.estados.some(
            (location) => location.sigla === this.selected_location?.sigla
          );
        });

      if (this.selected_institution)
        result = result.filter((course) => {
          return course.universidades.some(
            (institution) =>
              institution.universidade_id ===
              this.selected_institution?.universidade_id
          );
        });

      return result;
    },
    locationsList() {
      const result = toRaw(this.locations);

      if (this.selected_course && !this.selected_institution)
        return this.selected_course.estados;

      if (this.selected_institution && !this.selected_course)
        return [this.selected_institution.estado];

      return result;
    },
  },
});
</script>

<style scoped lang="scss">
.background {
  background: white;
  width: 100vw;
  height: 100vh;
  position: fixed;
  margin: 0;
  left: 0;
  top: 0;
}

.home {
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 5px;
}

.top-area,
.down-area {
  display: flex;
}

.top-area {
  z-index: 10;
  justify-content: center;
  border-radius: 5px 5px 0 0;
  background: #321e65;
  position: relative;
  transition: 0.3s all ease-in-out;
}

.wrapper {
  max-width: 900px;
  margin-bottom: -25px;
  padding: 0 24px;
}

.down-area {
  flex-direction: column;
  background: #eaeaea;
  border-radius: 0 0 5px 5px;
  flex: 1;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
}

@media screen and (max-width: 600px) {
  .down-area::-webkit-scrollbar {
    display: none;
}
}

.down-area::-webkit-scrollbar {
  width: 8px;
}

.down-area::-webkit-scrollbar-button {
  width: 8px;
  height: 5px;
}

.down-area::-webkit-scrollbar-track {
  background: #eee;
  border: thin solid lightgray;
  box-shadow: 0px 0px 3px #dfdfdf inset;
  border-radius: 10px;
}

.down-area::-webkit-scrollbar-thumb {
  background: #999;
  border: thin solid gray;
  border-radius: 10px;
}

.down-area::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
}

.welcome-content {
  display: flex;
  gap: 30px;
  margin-bottom: -25px;
  padding: 40px 60px 30px;
  min-height: 180px;
  align-items: center;
}

.welcome-content p {
  text-align: center;
  color: whitesmoke !important;
}

.welcome-content p:first-child {
  box-sizing: border-box;
  font-weight: 600;
}

.text {
  transform: translateY(-20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 18px;
}

:deep(.v-field__input) {
  flex-wrap: unset !important;
  overflow: hidden !important;
}

.v-input {
  background: white;
  border-radius: 5px;
}

:deep(.v-combobox__selection-text) {
  overflow: hidden;
  white-space: nowrap;
}

.search-field {
  display: flex;
  gap: 10px;
  background: url(../assets/images/background-search.jpg);
  flex: 1;
  background-size: cover;
  border-radius: 8px;
  z-index: 999;
  position: relative;
  padding: 7px;
  border: 3px solid #eaeaea;
}

@media screen and (max-width: 500px) {
  .text {
    font-size: 10px!important;
  }

  .search-field {
    padding: 6px;
    gap: 6px;
  }

  .welcome-content {
    min-height: 120px!important;
  }
}

@media screen and (min-width: 501px) and (max-width: 1200px) {
  .text {
    font-size: 14px;
  }
}

@media screen and (max-width: 650px) {
  .human-img {
    display: none;
  }

  .welcome-content {
    padding: 50px 0 10px 0;
    min-height: 150px;
  }

  .text {
    transform: translateY(-30px);
    font-size: 13px;
  }
}

@media screen and (max-width: 768px) {
  .results {
    grid-template-columns: 1fr !important;
  }

  .search-field {
    flex-direction: column;
  }
}

@media screen and (min-width: 500px) and (max-width: 768px) {

  .search-field {
    width: 70vw;
    margin: auto;
  }
}

@media screen and (max-width: 1150px) {
  .parallax-wrap {
    display: none !important;
  }
}

/* PARALAX */
.parallax-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}

.parallax-wrap span:nth-child(1) {
  top: 100px;
  left: 50px;
  z-index: 3;
  position: absolute;
}

.parallax-wrap span:nth-child(2) {
  top: 80px;
  left: 350px;
  z-index: 3;
  position: absolute;
}

.parallax-wrap span:nth-child(3) {
  top: 20px;
  left: 500px;
  z-index: 3;
  position: absolute;
}

.parallax-wrap span:nth-child(4) {
  top: 30px;
  left: 20px;
  z-index: 3;
  position: absolute;
}

.parallax-wrap span:nth-child(5) {
  top: 20px;
  left: 300px;
  z-index: 3;
  position: absolute;
}

.parallax-wrap span:nth-child(6) {
  top: 40px;
  left: 100px;
  z-index: 3;
  position: absolute;
}

.parallax-wrap span:nth-child(7) {
  top: 120px;
  left: 200px;
  z-index: 3;
  position: absolute;
}

.parallax-wrap span:nth-child(1) img {
  height: 120px;
  width: 120px;
  position: absolute;
}

.parallax-wrap span:nth-child(2) img {
  height: 80px;
  width: 80px;
  transform: rotate(30deg);
  position: absolute;
}

.parallax-wrap span:nth-child(3) img {
  height: 20px;
  width: 20px;
  position: absolute;
}

.parallax-wrap span:nth-child(4) img {
  height: 40px;
  width: 40px;
  position: absolute;
}

.parallax-wrap span:nth-child(5) img {
  height: 50px;
  width: 50px;
}

.parallax-wrap span:nth-child(6) img {
  height: 80px;
  width: 80px;
}

.parallax-wrap span:nth-child(7) img {
  height: 50px;
  width: 50px;
}
</style>
