<template>
  <div class="result-section">
    <div class="results-area">
      <p class="title">{{ resultsText }}</p>
      <div style="height: 20px"></div>
      <div class="results" v-if="!loading" :class="showList.length == 1? 'one-column': ''">
        <search-card
          @click="click(course.id)"
          v-for="(course, i) in showList"
          :key="i"
          :course="course"
        ></search-card>
        <button @click="loadMore" v-if="!endOfList" class="load-button">
          Ver mais
        </button>
        <div style="height: 10px"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { CourseSearch } from "../models/index";
import LoaderHolderIceCream from "../components/LoaderHolderIceCream.vue";
import LoaderHolderGlass from "../components/LoaderHolderGlass.vue";
import SearchCard from "../components/SearchCard.vue";

export default defineComponent({
  emits: ["click"],

  components: {
    "loader-holder-ice-cream": LoaderHolderIceCream,
    "loader-holder-glass": LoaderHolderGlass,
    "search-card": SearchCard,
  },

  props: {
    list: {
      type: Array<CourseSearch>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
    },
    resultsText: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    showSize: 20
  }),

  methods: {
    click(id: string) {
      this.$emit("click", id);
    },
    loadMore() {
      this.showSize = this.showSize + 20;
    },
  },

  created() {
    this.loadMore();
  },

  computed: {
    showList() {
      return this.list.slice(0, this.showSize);
    },
    endOfList() {
      if (this.showSize >= this.list.length) return true

      return false;
    }
  },

  watch: {
    list() {
      this.showSize = 40;
    },
  },
});
</script>

<style scoped lang="scss">
.load-button {
  grid-column: span 2;
  border-radius: 10px;
  padding: 10px;
  width: 100px;
  margin: auto;
}

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
}

.results-area {
  display: flex;
  padding: 60px 8vw;
  padding-top: 50px;
  flex-direction: column;

  .title {
    font-weight: 600;
    font-size: 16px;
    color: #969696;
    margin-bottom: 10px;
  }
}

.results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 16px;
  max-height: 0px;
  transform: translateY(-20px);
}



@media screen and (max-width: 930px) {
  .results-area {
    padding: 60px 20px;
    padding-top: 50px;

    .title {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 530px) {
  .results-area {
    padding: 60px 10px;
    padding-top: 40px;
    .title {
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 768px) {
  .results {
    grid-template-columns: 1fr !important;
  }

  .load-button {
    grid-column: span 1;
  }
}
</style>
