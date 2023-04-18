<template>
  <div class="card-course">
    <p class="course-name">{{ course.curso }}</p>
    <div class="card-first-line">
      <div class="course-details">
        <p>{{ course.grau }} // {{ course.turno }}</p>
      </div>
    </div>
    <div class="course-institution">
      <div class="abreviation" :title="course.universidade">
        {{ course.sigla }}
      </div>
      -
      <div class="course-campus">
        <p>{{ course.cidade }}</p>
      </div>
    </div>
    <v-spacer></v-spacer>
    <div class="course-note">
      {{ course.universidade }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    year: null as any,
    corte: null as any,
  }),

  mounted() {
    const cortes = this.course.cortes;

    // this.year = cortes[cortes.length - 1].ano
    // this.corte = cortes[0].edicoes[0].find((edicao: any) => edicao.modalidade === "Ampla concorrência")?.corte
  },
});
</script>

<style scoped lang="scss">
.card-course {
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px 18px 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-course:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.course-name {
  font-weight: 600;
  font-size: 1.5em;
  color: #321e65;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-first-line {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

.course-details {
  color: #6d6d6d;
  transform: translateY(-1px);
}

.location-outline {
  color: #38b9af;
  --ionicon-stroke-width: 60px;
  font-size: 20px;
  padding-right: 5px;
}

.course-infos {
  color: #969696;
  font-size: 0.8em;
}

.course-institution {
  display: flex;
  padding-top: 5px;
  gap: 6px;

  .abreviation {
    display: flex;
  }
}

.course-campus {
  display: flex;
  gap: 5px;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.course-note {
  margin-top: 15px;
  padding-top: 5px;
  color: #6d6d6d;
  border-top: 1px solid #321e653f;
}

@media screen and (max-width: 660px) {
  .course-name {
    font-size: 20px;
  }
  .course-note {
    font-size: 14px;
    margin-top: 10px;
  }
  .course-details {
    font-size: 14px;
  }
  .course-institution {
    font-size: 15px;
  }
}

@media screen and (max-width: 425px) {
  .course-note {
    margin-top: 10px !important;
    color: #6d6d6d;
    font-size: 12px;
  }

  .course-name {
    font-size: 1.15em;
    font-size: 18px;
  }

  .course-details {
    font-size: 12px;
  }
  .course-institution {
    font-size: 13px;
  }
}
</style>
