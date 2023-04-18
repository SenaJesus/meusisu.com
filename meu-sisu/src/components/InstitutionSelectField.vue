<template>
  <div class="container">
    <div class="select-btn" :class="expanded ? 'open' : ''">
      <input @focusin="expanded = true" @focusout="close" class="btn-text" type="text" v-model="searching"
        :placeholder="selected ? selected.universidade : placeholder" />
      <span class="delete-btn" v-if="selected != null || selected != undefined" @click="removeSelection">
        <i class="fa-solid fa-x"></i>
      </span>
      <span class="arrow-dwn" v-else @click="expanded = !expanded">
        <i class="fa-solid fa-chevron-down"></i>
      </span>
    </div>
    <ul class="list-items" v-if="filteredInstitutions.length > 0">
      <li class="item" v-for="institution in filteredInstitutions" @click="select(institution as Institution)"
        :class="selected === institution ? 'checked' : ''"
      >
        <span class="item-text">{{ (institution as Institution).universidade }}</span>
      </li>
    </ul>
    <ul class="list-items" v-else>
      <li class="item">Sem resultados...</li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { Institution, State } from "@/models";
import { placeholder } from "@babel/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "InstitutionSelectField",

  emits: ["input"],

  props: {
    placeholder: {
      type: String,
      default: "Selecione uma opção",
    },
    institutions: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    selected: null as any,
    searching: "",
    expanded: false,
  }),

  computed: {
    filteredInstitutions() {
      const filtered = this.institutions.filter((institution: any) => {
        return this.removeAccents((institution.universidade as string))
          .toLocaleLowerCase()
          .includes(this.removeAccents(this.searching.toLowerCase()));
      });

      if (filtered.length === 1 && this.selected) return this.institutions;

      return filtered;
    },
  },

  methods: {
    removeAccents(text: string) {
      text = text.toLowerCase();
      text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
      text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
      text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
      text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
      text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
      text = text.replace(new RegExp("[Ç]", "gi"), "c");
      return text;
    },
    removeSelection() {
      this.searching = "";
      this.selected = null;
      this.$emit("input", null);
    },
    close() {
      setTimeout(() => {
        this.expanded = false;
      }, 200);
    },
    select(institution: Institution) {
      this.selected = institution;
      this.searching = institution.universidade;
      this.$emit("input", institution);
      this.close();
    },
  },

  watch: {
    searching(newValue, oldValue) {
      if (newValue === "" && this.selected !== null) this.removeSelection();
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
}

input {
  width: 100%;
  height: 50px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 8px;
}

.select-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);

  .arrow-dwn,
  .delete-btn {
    display: flex;
    height: 25px;
    width: 25px;
    color: #fff;
    font-size: 16px;
    border-radius: 50%;
    background: #321e65;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    position: absolute;
    right: 12px;
  }

  .delete-btn i {
    font-size: 12px;
  }
}

.select-btn .btn-text {
  font-size: 17px;
  font-weight: 400;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 40px;
}

.select-btn .btn-text:focus-visible {
  outline: none;
}

.select-btn.open .arrow-dwn {
  transform: rotate(-180deg);
}

.list-items {
  margin-top: 10px;
  border-radius: 8px;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  display: none;
  position: absolute;
  width: 100%;
  max-height: calc(100vh - 500px);
  overflow-y: scroll;
  z-index: 99999;
  overflow-x: hidden;
}

.list-items::-webkit-scrollbar {
  width: 8px;
}

.list-items::-webkit-scrollbar-button {
  width: 8px;
  height: 5px;
}

.list-items::-webkit-scrollbar-track {
  background: #eee;
  border: thin solid lightgray;
  box-shadow: 0px 0px 3px #dfdfdf inset;
  border-radius: 10px;
}

.list-items::-webkit-scrollbar-thumb {
  background: #999;
  border: thin solid gray;
  border-radius: 10px;
}

.list-items::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
}

.select-btn.open ~ .list-items {
  display: block;
}

.list-items .item {
  display: flex;
  align-items: center;
  list-style: none;
  min-height: 50px;
  cursor: pointer;
  transition: 0.3s;
  padding: 0 10px;
  border-radius: 8px;
}

.list-items .item:hover {
  background-color: #e5e1f0;
}

.item .item-text {
  font-size: 16px;
  font-weight: 400;
  color: #333;
  padding: 3px;
  overflow-wrap: break-word;
  max-width: 100%;
}

.item .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 4px;
  margin-right: 12px;
  border: 1.5px solid #c0c0c0;
  transition: all 0.3s ease-in-out;
}

.item.checked .checkbox {
  background-color: #321e65;
  border-color: #321e65;
}

.checkbox .check-icon {
  color: #fff;
  font-size: 11px;
  transform: scale(0);
  transition: all 0.2s ease-in-out;
}

.item.checked .check-icon {
  transform: scale(1);
}

@media screen and (max-width: 768px) {

  input {
    height: 35px;
  }
  .select-btn {

    .arrow-dwn,
    .delete-btn {
      height: 20px;
      width: 20px;
    }
  }

  .select-btn .btn-text {
    font-size: 14px;
  }
}
</style>
