<template>
  <div class="professor">
    <div class="top-area" v-show="!show_details">
      <div class="wrapper">
        <div class="search-field">
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
        @hide="hideDetails()"
      ></details-section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw, defineAsyncComponent } from "vue";
import axios from "axios";

import type { State, Institution, Course, CourseSearch } from "../models/index";

import LocationSelectField from "@/components/LocationSelectField.vue";
import InstitutionSelectField from "@/components/InstitutionSelectField.vue";
import CoursesSelectField from "@/components/CoursesSelectField.vue";

import get_search from "../data/data.json";
import locations_json from "../data/locations.json";
import courses_json from "../data/courses.json";
import institutions_json from "../data/institutions.json";

import { useStore } from "@/stores/global";
import LoaderHolderGlass from "@/components/LoaderHolderGlass.vue";

export default defineComponent({
  name: "ProfessorView",

  components: {
    "details-section": defineAsyncComponent({
      loader: () => import("../components/DetailsPage.vue"),
      loadingComponent: LoaderHolderGlass,
      delay: 300,
    }),
    "result-section": defineAsyncComponent({
      loader: () => import("../components/ResultSection.vue"),
      loadingComponent: LoaderHolderGlass,
      delay: 1000,
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
    selected_course: null as Course | null,
    selected_institution: null as Institution | null,
    selected_location: null as State | null,
    show_details: false,
    resultsText: "Insira termos de busca...",
    selected_id: "",
  }),

  setup() {
    const { checkSession } = useStore();
    const pinia = useStore();

    return {
      checkSession,
      pinia,
    };
  },

  beforeCreate() {
    if (!this.checkSession()) this.$router.push({ name: "login" });
  },

  computed: {
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
          return course.estado.sigla === this.selected_location?.sigla;
        });

      if (this.selected_institution)
        result = result.filter((course: any) => {
          return this.selected_institution?.universidade?.includes(
            course.sigla
          );
        });

      if (this.selected_course)
        result = result.filter((course: any) => {
          return this.selected_course?.curso === course.curso;
        });

      if (result.length <= 0)
        this.resultsText =
          "Hummmn, parece nenhum resultado corresponde à sua pesquisa...";
      else this.resultsText = "Exibindo resultados de sua busca:";

      return result;
    },
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
});
</script>

<style scoped lang="scss">
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

.professor {
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
  background: url("../assets/images/bannerrafael.png");
  border-radius: 5px 5px 0 0;
  height: 28vh;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.wrapper {
  max-width: 900px;
  margin-bottom: -40px;
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 0 20px;
}

.search-field {
  display: flex;
  gap: 10px;
  flex: 1;
  background-size: cover;
  border-radius: 8px;
  z-index: 999;
  position: relative;
  padding: 7px;
  border: 3px solid #eaeaea;
  background: #ffffff;
}

.down-area {
  flex-direction: column;
  background: #e4e4e4;
  border-radius: 0 0 5px 5px;
  flex: 1;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
}

.search-button {
  background: #f9bb02;
  position: absolute;
  right: -25px;
  top: 10px;
  border-radius: 50%;
  padding: 10px 15px;
  color: #321e65;
  cursor: pointer;
  transition: 0.1s all ease-in-out;
}

.search-button:hover {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.41);
}

:deep(.v-combobox__selection-text) {
  overflow: hidden;
  white-space: nowrap;
}

@media screen and (max-width: 425px) {
  .text {
    font-size: 12px;
  }

  .top-area {
    height: 200px;
  }

  .search-field {
    grid-template-columns: 1fr !important;
  }

  .wrapper {
    margin-bottom: -140px;
  }

  .down-area {
    padding-top: 100px;
  }
}

@media screen and (max-width: 768px) {
  .search-field {
    flex-direction: column;
  }

  .search-button {
    top: 92%;
    right: calc(50% - 100px);
    width: 200px;
    padding: 8px 10px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
