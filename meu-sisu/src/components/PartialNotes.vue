<template>
  <div class="card-course">
    <div class="list-options">
      <div
        class="option"
        @click="selected_day = i"
        v-for="(date, i) in getParciaisOptions(partials)"
        :class="selected_day === i ? 'selected' : ''"
      >
        {{ i + 1 }}º DIA
      </div>
    </div>
    <div class="parciais-list">
      <div
        class="item"
        v-for="(nota, i) in partials[selected_day].parciais"
        :key="i"
      >
        <div class="modalidade" :title="nota.modalidade">
          {{ nota.modalidade }}
        </div>
        <div class="corte">
          {{ nota.corte }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    partials: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    selected_day: 0 as any,
  }),

  methods: {
    getFormatedDate(date: string) {
      const dateArray = date.split("/");

      return `${dateArray[0]}/${dateArray[1]}`;
    },
    getParciaisOptions(parciais: any) {
      return parciais.map((parcial: any) => parcial.data);
    },
  },
});
</script>

<style scoped lang="scss">
.selected {
  color: rgb(0, 0, 0) !important;
}

.parciais-list::-webkit-scrollbar {
  width: 5px;
}

.parciais-list::-webkit-scrollbar-button {
  width: 5px;
  height: 5px;
}

.parciais-list::-webkit-scrollbar-track {
  background: #eee;
  border: thin solid lightgray;
  box-shadow: 0px 0px 3px #dfdfdf inset;
  border-radius: 10px;
}

.parciais-list::-webkit-scrollbar-thumb {
  background: #999;
  border: thin solid gray;
  border-radius: 10px;
}

.parciais-list::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
}

.parciais {
  .line {
    height: 2px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    background: rgb(182, 182, 182);

    p {
      background: #cccccc;
      padding: 0 10px;
      font-size: 14px;
      color: rgb(109, 109, 109);
    }
  }

  .list-options {
    display: flex;
    gap: 10px;

    .option {
      font-weight: 600;
      color: #707070;
      border-radius: 10px;
      padding: 4px 10px;
      padding-bottom: 0;
      cursor: pointer;
    }

    .option:hover {
      color: black;
    }
  }

  .parciais-list {
    margin-top: 7px;
    background-color: #eaeaea;
    border-radius: 10px;
    padding: 5px 15px;
    height: 230px;
    overflow-y: auto;

    .item {
      display: grid;
      grid-template-columns: 1fr 60px;
      border-bottom: 1px solid lightgrey !important;
      padding: 5px 0;

      .corte {
        text-align: center;
        font-weight: 600;
        color: #707070;
      }

      .modalidade {
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        /* number of lines to show */
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }

  .item:last-child {
    border-bottom: none !important;
  }
}

@media screen and (max-width: 660px) {
  .item {
    font-size: 0.6em !important;
  }

  .list-options {
    .option {
      font-size: 0.6em;
    }
  }

  .parciais-list {
    margin-top: 2px !important;
  }
}

@media screen and (min-width: 661px) and (max-width: 1000px) {
  .item {
    font-size: 0.7em !important;
  }

  .list-options {
    .option {
      font-size: 0.8em;
    }
  }
}

@media screen and (min-width: 1001px) and (max-width: 1400px) {
  .item {
    font-size: 0.85em;
  }
}

@media screen and (max-width: 1000px) {
  .parciais-list {
    height: 170px !important;
  }
}

@media screen and (min-width: 1001px) and (max-width: 1200px) {
  .parciais-list {
    height: 250px;
  }
}
</style>
