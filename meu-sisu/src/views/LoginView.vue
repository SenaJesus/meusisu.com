<template>
  <div class="container">
    <p class="instruction">
      Olá! Essa página é dedicada somente ao Professor Rafael. Por favor, volte
      para a <strong> <a class="home-link" href="/">HOME</a></strong>
    </p>
    <div class="auth-form-wrapper">
      <form class="auth-form" @submit.prevent="submit">
        <div class="header">
          <h1>LOGIN</h1>
        </div>

        <div class="input-group">
          <label for="email">Usuário: </label>
          <input v-model="user" required placeholder="Usuário" class="" name="user" id="user" autocomplete="off" />
        </div>

        <div class="input-group">
          <label for="password">Senha: </label>
          <input v-model="password" required type="password" placeholder="Senha" class="" name="password" id="password" />
        </div>

        <div class="input-group">
          <vue-recaptcha :sitekey="siteKey" :load-recaptcha-script="true" @verify="handleSuccess" @expired="handleError"
            @error="handleError">
          </vue-recaptcha>
        </div>

        <v-btn type="submit" variant="outlined" :disabled="!formValid" :loading="loading">
          LOGIN
        </v-btn>

        <div v-cloak class="login-error">
          <div v-show="serverError">
            {{ serverError }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/stores/global";
import axios from "axios";
import { computed, ref } from "vue";
import { VueRecaptcha } from "vue-recaptcha";
import { useRouter } from "vue-router";

export default {
  components: { VueRecaptcha },

  setup() {
    const user = ref("");
    const password = ref("");
    const loading = ref(false);

    const serverError = ref("");
    const captch_token = ref("");
    const verified = ref(false);

    const pinia = useStore();
    const router = useRouter();

    const getErrorMessage = (err: any) => {
      let responseBody = err.response;
      if (!responseBody) {
        responseBody = err;
      } else {
        responseBody = err.response.data || responseBody;
      }
      return responseBody.message || JSON.stringify(responseBody);
    };

    const handleError = (response: any) => {
      verified.value = false;
      captch_token.value = "";
    };

    const handleSuccess = (recaptchaToken: string) => {
      verified.value = true;
      captch_token.value = recaptchaToken;
    };

    const submit = () => {
      loading.value = true;
      const numbers = new Date()
        .toLocaleDateString("pt-BR")
        .split("/")
        .map(Number);

      const token =
        (numbers[0] + 30) * 1046 + numbers[1] * 1231 - numbers[2] * 49;

      axios
        .post("https://mysisu.rj.r.appspot.com/login?google=" + captch_token.value + 
        "&ssid=" + btoa(user.value).toString() + 
        "&ssw=" + btoa(password.value).toString() + 
        "&token=" + btoa(token.toString()).toString(),
        {
          headers: {
            key: "89<OOJNQJKzr*{#",
            "User-Session": pinia.user_session_id
          },
        })
        .then((response: any) => {
          loading.value = false;
          pinia.$patch({ professor_auth: true });
          router.push({ name: "professorrafael" });
        })
        .catch((err: any) => {
          loading.value = false;
          console.log(err.config.data);
          serverError.value = "O usuário ou a senha estão incorretos.";
        });
    };

    return {
      handleSuccess,
      handleError,
      submit,
      pinia,
      user,
      password,
      serverError,
      verified,
      captch_token,
      loading
    };
  },

  data() {
    return {
      rules: {
        required: (value: any) => !!value || "Preencha esse campo!",
      },
    };
  },

  computed: {
    formValid() {
      if (this.user != "" && this.password != "" && this.verified) return true;

      return false;
    },
    siteKey() {
      return "6LfIopckAAAAAOoEKXQ27p5aYgcx3M0Lhn8zVjRy";
    },
  },
};
</script>

<style scoped lang="scss">
.login-error {
  margin: auto;
  padding-top: 10px;
  color: tomato;
  font-weight: 600;
}

.home-link {
  text-decoration: none;
  color: black;
}

.container {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .auth-form-wrapper {
    background: whitesmoke;
    border-radius: 10px;
    border: 2px solid lightgray;
    padding: 50px 30px;

    form {
      background: whitesmoke;
      border-radius: 10px;
    }

    .auth-form {
      display: flex;
      flex-direction: column;

      .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        label {
          font-weight: 600;
          margin-bottom: 5px;
        }

        input {
          padding: 10px;
          border: 1px solid lightgray;
          border-radius: 5px;
          background: white;
        }
      }
    }
  }
}

.instruction {
  margin-bottom: 40px;
  width: 360px;
  text-align: center;
}

@media screen and (max-width: 550px) {
  .login-form {
    width: 90vw;
  }

  .instruction {
    margin-bottom: 40px;
    width: 300px;
    text-align: center;
  }

  .auth-form-wrapper {
    padding: 20px 20px !important;
  }
}
</style>
