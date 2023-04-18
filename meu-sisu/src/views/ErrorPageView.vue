<template>
  <div class="not-found-container">
    <div class="not-found">
      <div class="container" v-if="$route.params.code">
        <div class="glitch" :title="'ERRO ' + $route.params.code.toString()">
          ERRO {{ $route.params.code }}
        </div>
        <p>Algo de errado ocorreu, levaremos você de volta em instantes</p>
      </div>
      <div class="container" v-else>
        <div class="glitch" :title="'NOT FOUND'">NOT FOUND</div>
        <p>Algo de errado ocorreu, levaremos você de volta em instantes</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorPageView",

  mounted() {
    setTimeout(() => {
      this.$router.push("/");
    }, 6000);
  },
});
</script>

<style scoped lang="scss">
.not-found-container {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  left: 0;
  z-index: 999999;
  background: whitesmoke;
}
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  .glitch {
    animation: glitch 1s linear infinite;
    font-size: 2.5em;
  }

  @keyframes glitch {
    2%,
    64% {
      transform: translate(2px, 0) skew(0deg);
    }

    4%,
    60% {
      transform: translate(-2px, 0) skew(0deg);
    }

    62% {
      transform: translate(0, 0) skew(5deg);
    }
  }

  .glitch:before,
  .glitch:after {
    content: attr(title);
    position: absolute;
    left: 0;
  }

  .glitch:before {
    animation: glitchTop 1s linear infinite;
    clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  }

  @keyframes glitchTop {
    2%,
    64% {
      transform: translate(2px, -2px);
    }

    4%,
    60% {
      transform: translate(-2px, 2px);
    }

    62% {
      transform: translate(13px, -1px) skew(-13deg);
    }
  }

  .glitch:after {
    animation: glitchBotom 1.5s linear infinite;
    clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  }

  @keyframes glitchBotom {
    2%,
    64% {
      transform: translate(-2px, 0);
    }

    4%,
    60% {
      transform: translate(-2px, 0);
    }

    62% {
      transform: translate(-22px, 5px) skew(21deg);
    }
  }
}

@import url("https://fonts.googleapis.com/css?family=Montserrat:700");

.container {
  font-family: "Montserrat", "sans-serif";
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1em;

  a {
    color: black;
  }

  p {
    margin-top: 5px;
    font-size: 0.8em;
    padding: 0 15px;
  }
}

@media screen and (max-width: 600px) {
  .container {
    font-size: 0.7em;
  }
}
</style>
