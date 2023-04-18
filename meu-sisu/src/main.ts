import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueClientRecaptcha from 'vue-client-recaptcha'

import App from "./App.vue";
import router from "./router";
import "../node_modules/vue-client-recaptcha/dist/style.css";


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia().use(piniaPluginPersistedstate);

import "./assets/main.css";

const app = createApp(App);

app.component("VueClientRecaptcha", VueClientRecaptcha);  
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");
