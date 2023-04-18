<template>
  <v-app>
    <v-app-bar absolute fixed flat app color="transparent">
      <div
        class="logo-container"
        v-if="$route.fullPath !== '/professorrafael'"
        @click="$router.push('/')"
      >
        <h1 class="logo-first-word">MEU</h1>
        <h1 class="logo-second-word">SISU</h1>
      </div>
      <div class="logo-container" v-else @click="$router.push('/')">
        <h1 class="logo-first-word blue-text">MEU</h1>
        <h1 class="logo-second-word blue-text">SISU</h1>
      </div>

      <v-spacer></v-spacer>
      <div class="router">
        <div v-if="$route.fullPath === '/'">
          <router-link
            to="/professorrafael"
            class="menu-text"
            v-if="pinia.checkSession()"
            >Professor Rafael</router-link
          >
          <router-link to="/sobre" class="menu-text">Sobre</router-link>
        </div>
        <div v-if="$route.fullPath === '/sobre'">
          <router-link to="/" class="menu-text">Home</router-link>
          <router-link
            to="/professorrafael"
            class="menu-text"
            v-if="pinia.checkSession()"
            >Professor Rafael</router-link
          >
        </div>
        <div v-if="$route.fullPath === '/professorrafael'">
          <router-link to="/" class="menu-text">Home</router-link>
          <router-link to="/sobre" class="menu-text">Sobre</router-link>
        </div>
        <div v-if="$route.fullPath === '/login'">
          <router-link to="/" class="menu-text">Home</router-link>
        </div>
      </div>
    </v-app-bar>

    <v-main class="main">
      <router-view />
    </v-main>

    <div class="footer" height="100px">
      Utilizamos cookies e tecnologias semelhantes para melhorar a sua
      experiência. Não temos ligações com Governo Federal ou outras
      instituições.
    </div>
  </v-app>
</template>

<!-- 
  TODO:
  - Colocar notas do ENEM;
-->

<script lang="ts">
import { useStore } from "@/stores/global";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  setup() {
    const pinia = useStore();

    return {
      pinia,
    };
  },

  methods: {
    getRandomString(size: number) {
      var randomString = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < size; i++) {
        randomString += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return randomString;
    },
  },

  created() {

    if (this.pinia.user_session_id === "")
      this.pinia.$patch({ user_session_id: this.getRandomString(100)});

    axios
      .get("https://mysisu.rj.r.appspot.com/refresh", {
        headers: {
          key: "89<OOJNQJKzr*{#",
        },
      })
      .then((response: any) => {
        if (this.pinia.last_updated != response.data) {
          this.pinia.$reset();
          localStorage.clear();

          var Cookies = document.cookie.split(";");
          for (var i = 0; i < Cookies.length; i++) {
            document.cookie =
              Cookies[i] + "=; expires=" + new Date(0).toUTCString();
          }

          this.pinia.$patch({ last_updated: response.data });
        }
      })
      .catch((error: any) => {
        if (error.response.status)
          this.$router.push("/erro/" + error.response.status);
          
        else this.$router.push("/erro/500");
      });
  },
});
</script>

<style lang="scss">
@import url("https://fonts.cdnfonts.com/css/proxima-nova-2");

.custom-text {
  background-image: url(assets/images/background-search.jpg);
  background-repeat: repeat !important;
  background-size: cover !important;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  font-weight: bold !important;
  text-transform: uppercase !important;
  -webkit-font-smoothing: antialiased !important;
}

body::-webkit-scrollbar {
  display: none;
}

#app {
  font-family: "Proxima Nova", sans-serif;
  padding: 20px;
  height: 100vh;
  overflow: hidden;
  padding-bottom: 0 !important;
}

.footer {
  position: relative;
  height: auto;
  bottom: 0;
  width: 100vw;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transform: translate(-20px, -20px);
  padding: 0 30px;
  text-align: center;
}

.logo-container {
  display: flex;
  flex-wrap: nowrap;
  font-size: 20px;
  white-space: nowrap;
  cursor: pointer;
}

.logo-first-word {
  font-weight: 500;
}

.logo-second-word {
  font-weight: 800;
}

.blue-text {
  color: #042369;
}

.router,
.router div {
  font-size: 20px !important;
  display: flex;
  gap: 16px;
}

.v-application {
  background: transparent !important;
}

.v-main {
  box-sizing: border-box;
  margin-bottom: 25px;
  display: flex;
}

.v-app-bar {
  z-index: 999999;
  position: relative;
  overflow: visible;
  height: 100px;
  padding: 0 10px;
}

.v-app-bar.v-toolbar {
  overflow: visible !important;
}

.menu-text {
  text-decoration: none;
  color: black;
  font-weight: 700;
  font-size: 1em;
}

@media screen and (min-width: 601px) and (max-width: 1200px) {
  .logo-container {
    font-size: 12px;
    padding-left: 5px;
  }

  .menu-text {
    font-size: 12px;
  }

  .router {
    transform: translateX(-5px);
  }

  #app {
    padding-top: 5px !important;
    height: calc(100vh + 15px) !important;
  }

  .main {
    --v-layout-top: 58px !important;
  }
}

@media screen and (max-width: 600px) {
  .logo-container {
    font-size: 12px;
    padding-left: 5px;
  }

  .router {
    transform: translateX(-5px);
  }

  .menu-text {
    font-size: 12px;
  }

  #app {
    padding: 8px;
    padding-bottom: 0 !important;
    padding-top: 0 !important;
    height: calc(100vh + 5px) !important;
  }

  .footer {
    transform: translate(-10px, -10px);
    font-size: 12px;
  }

  .main {
    --v-layout-top: 50px !important;
    margin-bottom: 15px !important;
  }
}
</style>
