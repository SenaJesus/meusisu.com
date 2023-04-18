<template>
  <div class="card" :class="theme" v-show="informations.edicoes[0].length > 0 || informations.edicoes[1].length > 0">
    <div class="edition-informations">
      <div class="year-edition">
        <p class="year">{{ informations.ano }}</p>
        <div class="edition">
          <p v-if="informations.edicoes[0].length !== 0" @click="edicao = 0" :class="edicao === 0 ? 'active' : ''">
            1ª EDIÇÃO
          </p>
          <p v-else-if="testNextEdition()" style="display: none;"></p>
          <p v-if="informations.edicoes[1].length !== 0" @click="edicao = 1" :class="edicao === 1 ? 'active' : ''">
            2ª EDIÇÃO
          </p>
        </div>
      </div>
      <div class="vacacies text">
        <v-icon size="small" icon="mdi-account-group"></v-icon>
        {{
          informations.edicoes[edicao].length > 0
            ? getVagas(informations.edicoes[edicao]) + " Vagas"
            : "—"
        }}
      </div>
      <div class="weights">
        <div class="text">
          <v-icon size="small" icon="mdi-weight"></v-icon>
          Pesos:
        </div>
        <div class="weights-list">
          <div class="linguagens">
            <p>
              Linguagens, Codigos e suas Tecnologias:
              <p class="weight">{{ informations.edicoes[edicao][0]?.pesos.linguagens }}</p>
            </p>
            <p
              class="stats"
              v-if="informations.edicoes[edicao].length !== 0 && enem"
            >
              MIN: {{ enem?.minima.linguagens }} MED:
              {{ enem?.media.linguagens }} MAX: {{ enem?.maxima.linguagens }}
            </p>
          </div>
          <div class="humanas">
            <p>
              Ciencias Humanas:
              <p class="weight">{{ informations.edicoes[edicao][0]?.pesos.humanas }}</p>
            </p>
            <p
              class="stats"
              v-if="informations.edicoes[edicao].length !== 0 && enem"
            >
              MIN: {{ enem?.minima.humanas }} MED:
              {{ enem?.media.humanas }} MAX: {{ enem?.maxima.humanas }}
            </p>
          </div>
          <div class="natureza">
            <p>
              Ciencias da Natureza:
              <p class="weight">{{ informations.edicoes[edicao][0]?.pesos.natureza }}</p>
            </p>
            <p
              class="stats"
              v-if="informations.edicoes[edicao].length !== 0 && enem"
            >
              MIN: {{ enem?.minima.natureza }} MED:
              {{ enem?.media.natureza }} MAX: {{ enem?.maxima.natureza }}
            </p>
          </div>
          <div class="matematica">
            <p>
              Matematica e seus Tecnologias:
              <p class="weight"> {{ informations.edicoes[edicao][0]?.pesos.matematica }}</p>
            </p>
            <p
              class="stats"
              v-if="informations.edicoes[edicao].length !== 0 && enem"
            >
              MIN: {{ enem?.minima.matematica }} MED:
              {{ enem?.media.matematica }} MAX: {{ enem?.maxima.matematica }}
            </p>
          </div>
          <div class="redacao">
            <p>Redacao: <p class="weight">{{ informations.edicoes[edicao][0]?.pesos.redacao }}</p></p>
            <p
              class="stats"
              v-if="informations.edicoes[edicao].length !== 0"
            ></p>
          </div>
        </div>
      </div>
    </div>
    <div class="modalidades-section">
      <div class="modalidade-header">
        <div class="bonus">Bônus</div>
        <div class="corte">Corte</div>
        <div class="modalidade">Modalidade</div>
        <div class="vagas">Vagas</div>
        <div class="inscritos">Inscritos</div>
      </div>
      <div class="modalidades">
        <div
          v-if="informations.edicoes[edicao].length !== 0"
          v-for="modalidade in informations.edicoes[edicao]"
          class="modalidade-card"
        >
          <div class="bonus">{{ modalidade.bonus }}</div>
          <div class="corte">
            {{ modalidade.corte ? modalidade.corte : "—" }}
          </div>
          <div class="modalidade" :title="modalidade.modalidade">
            {{ modalidade.modalidade }}
          </div>
          <div class="vagas">{{ modalidade.vagas }}</div>
          <div class="inscritos">
            {{ modalidade.inscritos ? modalidade.inscritos : "—" }}
          </div>
        </div>
        <div v-else class="without-information">
          <div class="face">:(</div>
          <div class="text">
            <p>Esse curso não</p>
            <p>participou do SiSU nesta edição</p>
          </div>
        </div>
      </div>
      <button
        v-if="parciais"
        class="partials-button"
        @click="
          {
            partials = !partials;
          }
        "
      >
        <p v-if="!partials">Ver parciais</p>
        <p v-else>Esconder parciais</p>
      </button>
      <partials-notes
        v-if="parciais && partials"
        class="parciais"
        :partials="parciais"
      ></partials-notes>
    </div>
  </div>
</template>

<script lang="ts">
import { anyTypeAnnotation } from "@babel/types";
import { defineComponent } from "vue";
import PatialsNotes from "./PartialNotes.vue";

export default defineComponent({
  props: {
    informations: {
      type: Object,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    enem: {
      type: Object,
      required: false,
    },
    parciais: {
      type: Object,
      required: false,
    },
  },

  components: {
    "partials-notes": PatialsNotes,
  },

  data: () => ({
    edicao: 0,
    partials: false,
  }),

  mounted() {},

  methods: {
    getVagas(edicoes: any) {
      return edicoes.reduce((acc: any, edicao: any) => acc + edicao.vagas, 0);
    },
    getFormatedDate(date: string) {
      const dateArray = date.split("/");

      return `${dateArray[0]}/${dateArray[1]}`;
    },
    getParciaisOptions(parciais: any) {
      return parciais.map((parcial: any) => parcial.data);
    },
    testNextEdition() {
      this.edicao = 1
      return true;
    }
  },
});
</script>

<style scoped lang="scss">
@font-face {
  font-family: "212 Leahlee Sans";
  src: url("src/assets/fonts/212_Leahlee_Sans.ttf");
}

.expand-transition {
  transition: all 0.5s ease;
}
.expand-enter,
.expand-leave {
  height: 0;
  opacity: 0;
}

.modalidades::-webkit-scrollbar {
  width: 5px;
}

.modalidades::-webkit-scrollbar-button {
  width: 5px;
  height: 5px;
}

.modalidades::-webkit-scrollbar-track {
  background: #eee;
  border: thin solid lightgray;
  box-shadow: 0px 0px 3px #dfdfdf inset;
  border-radius: 10px;
}

.modalidades::-webkit-scrollbar-thumb {
  background: #999;
  border: thin solid gray;
  border-radius: 10px;
}

.modalidades::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
}

.without-information {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .face {
    font-size: 90px;
    font-family: "212 Leahlee Sans";
    color: #707070;
    white-space: nowrap;
    padding-top: 30px;
  }

  .text {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #707070;
  }
}

.partials-button {
  width: 150px;
  margin: auto;
  margin-top: 5px;
  color: #707070;
}

.card {
  padding: 30px;
  display: flex;
  flex: 1;
  width: 100%;
  border-radius: 16px;
  gap: 25px;
  justify-content: space-between;
}

.modalidade-header {
  display: flex;
  font-size: 0.8em;
  gap: 5px;

  .modalidade {
    font-weight: 600;
    flex: 1;
  }

  .corte {
    font-weight: 600;
    color: #707070;
    width: 70px;
  }

  .bonus {
    font-weight: 600;
    color: #707070;
    width: 45px;
  }

  .vagas {
    font-weight: 600;
    color: #707070;
    transform: translateX(-10px);
  }

  .inscritos {
    font-weight: 600;
    color: #707070;
  }
}

.modalidades-section {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
  max-width: 800px;
}

.modalidades {
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  overflow-y: auto;
  overflow-x: hidden;

  .modalidade-card:last-child {
    border-bottom: none !important;
  }

  .modalidade-card {
    border-bottom: 1px solid lightgrey;
    display: flex;
    align-items: center;
    padding: 5px 0;
    font-size: 1em;
    gap: 5px;

    .modalidade {
      font-weight: 600;
      flex: 1;
    }

    .corte {
      font-weight: 600;
      color: #707070;
      width: 70px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .bonus {
      font-weight: 600;
      color: #707070;
      width: 35px;
    }

    .vagas {
      font-weight: 600;
      width: 45px;
      color: #707070;
    }

    .inscritos {
      font-weight: 600;
      color: #707070;
      width: 20px;
    }
  }
}

.year-edition {
  display: flex;
  gap: 20px;

  .year {
    font-size: 1.7em;
    background-image: url("../assets/images/background-search.jpg");
    background-repeat: repeat !important;
    background-clip: text !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
    -webkit-font-smoothing: antialiased !important;
  }

  p {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .edition {
    display: flex;
    font-size: 0.6em !important;
    width: fit-content;
    align-items: center;
    

    p {
      padding: 5px 10px;
      border-radius: 8px;
      color: #707070;
    }

    p:hover,
    .active {
      cursor: pointer;
      color: black;
    }
  }
}

.weights {
  padding-top: 10px;

  .weights-list {
    padding-top: 10px;
    padding-left: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      line-height: 18px;
      display: flex;

      .weight {
        margin-left: 5px;
        color: #707070;
      }
    }

    .stats {
      display: flex;
      gap: 10px;
      font-size: 0.8em;
      font-weight: 600;
      color: #707070;
    }
  }
}

.text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}

.modality {
  display: flex;
  gap: 16px;
  margin-bottom: 25px;
  max-width: 900px;
}

.light {
  font-weight: 500;
  font-size: 1.25em;
  box-shadow: none;

  .modalidades {
    background: #dddddd;
    border-radius: 10px;
  }
}

.dark {
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

  .modalidades {
    background-color: #eaeaea;
    border-radius: 10px;
  }
}

@media screen and (max-width: 660px) {
  .card {
    flex-direction: column;
    gap: 20px;
    padding: 15px!important;
  }

  .modalidade-card {
    font-size: 0.6em!important;
  }

  .partials-button {
    font-size: 0.7em !important;
  }
}

@media screen and (min-width: 661px) and (max-width: 1000px){
  .modalidade-card {
    font-size: 0.7em!important;
  }
}

@media screen and (max-width: 1000px) {
  .card {
    flex-direction: column;
    gap: 20px;
  }

  .weights {
    .weights-list {
      padding: 4px 12px;
      font-size: 12px;
      gap: 2px;
    }
  }

  .text {
    font-size: 12px;
    align-items: start;
  }

  .modalidades {
    height: 170px!important;
  }

  .partials-button {
    font-size: 14px;
  }

  .card {
    padding: 25px;
  }
}

@media screen and (min-width: 601px) and (max-width: 1200px) {
  .card {
    flex-direction: column;
  }

  .year {
    font-size: 1.5em !important;
  }

  .year-edition .edition{
    font-size: 0.5em !important;
  }

  .modalidades {
    height: 250px;
  }
}

@media screen and (max-width: 600px) {
  .card {
    flex-direction: column;
  }
  .year {
    font-size: 1.3em !important;
  }

  .year-edition .edition{
    font-size: 0.4em !important;
  } 

  .year-edition {
    gap: 7px;
  }

  .modalidades {
    padding: 5px 10px;
  }

  .modalidade-header {
    font-size: 0.55em !important;
    padding: 0 5px;

  .corte {
    width: 30px!important;
  }

  .bonus {
    width: 25px;
  }

  .inscritos {
    width: 35px;
  }

  .vagas {
    width: 15px;
  }
}

  .modalidade-card {
    .corte {
      width: 30px!important;
    }

    .vagas {
      width: 20px!important;
    }

    .bonus {
      width: 18px!important;
    }
  }
}

@media screen and (min-width: 1001px) and (max-width: 1400px) {
  .modalidades .modalidade-card {
    font-size: 0.85em;
  }
}

@media screen and (min-width: 601px) and (max-width: 800px) {

  .modalidade-header {
    font-size: 0.7em;

  .corte {
    width: 40px!important;
  }
}

  .modalidade-card {

    .corte {
      width: 40px!important;
    }

    .vagas {
      width: 35px!important;
    }
  }
}
</style>
