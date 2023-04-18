<template>
  <div class="about">
    <h1 class="custom-text"> SOBRE </h1>
    <div class="about-top">
      <h2>O PROJETO</h2>
      <p>
        A plataforma Meu SiSU é um projeto desenvolvido por vestibulandos recém-formados no 
        Colégio Técnico de Campinas (COTUCA) com o objetivo de facilitar a busca por cursos 
        e instituições de ensino superior. A plataforma foi desenvolvida utilizando a 
        linguagem de programação JavaScript, o framework Vue.js e o framework Vuetify. 
        A ideia surgiu a partir de necessidades comuns de nós estudantes ao nos depararmos
        com o mar de informações e possibilidades que é o SiSU. Esperamos que a plataforma seja útil
        para você e que possa te ajudar a escolher o seu curso de graduação.
      </p>
    </div>
    <div class="about-down">
      <h2>OS CRIADORES</h2>
      <div class="profiles">
        <div class="a-box">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../assets/images/profile-jeje.jpg">
              </div>
            </div>
          </div>
          <div class="text-container">
            <h3 class="custom-text">Jesus Sena</h3>
            <div>
              Campinas, SP - 19 anos
            </div>
            <div class="icons-container">
              <a target="_blank" href="https://www.instagram.com/jesussenafernandes/"><img class="icon instagram" src="../assets/images/instagram.png"></a>
              <a target="_blank" href="https://github.com/SenaJesus"><img class="icon github" src="../assets/images/github.png"></a>
            </div>
          </div>
        </div>
        <div class="a-box">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../assets/images/profile-roro.jpg">
              </div>
            </div>
          </div>
          <div class="text-container">
            <h3 class="custom-text">Rodrigo Smith</h3>
            <div>
              Campinas, SP - 19 anos
            </div>
            <div class="icons-container">
              <a target="_blank" href="https://www.instagram.com/rdgsmithh/"><img class="icon instagram" src="../assets/images/instagram.png"></a>
              <a target="_blank" href="https://www.linkedin.com/in/rodrigo-smith-b02378165/"><img class="icon linkedin" src="../assets/images/linkedin.png"></a>
              <a target="_blank" href="https://github.com/digo-smithh"><img class="icon github" src="../assets/images/github.png"></a>
            </div>
          </div>
        </div>
        <div class="a-box">
          <div class="img-container">
            <div class="img-inner">
              <div class="inner-skew">
                <img src="../assets/images/profile-vini.jpg">
              </div>
            </div>
          </div>
          <div class="text-container">
            <h3 class="custom-text">Vinícius Cotrim</h3>
            <div>
              Campinas, SP - 19 anos
            </div>
            <div class="icons-container">
              <a target="_blank" href="https://www.instagram.com/coutrims/"><img class="icon instagram" src="../assets/images/instagram.png"></a>
              <a target="_blank" href="https://www.linkedin.com/in/vinícius-cotrim-06588a209/"><img class="icon linkedin" src="../assets/images/linkedin.png"></a>
              <a target="_blank" href="https://github.com/Cotrims"><img class="icon github" src="../assets/images/github.png"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutView",
});
</script>

<style scoped lang="scss">

.icons-container {
  width: 50px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}
.icon {
  width: 20px;
  opacity: .7;
}

.github {
  width: 16px;
  transform: translate(2px,2px);
}

.linkedin {
  width: 1.37em;
  transform: translateY(0.03em);
}
.custom-text {
  background-image: url(../assets/images/background-search.jpg);
  background-repeat: repeat;
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
  font-weight: 800;
  -webkit-font-smoothing: antialiased;
}

h1 {
  margin-bottom: 25px;
}

.about {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 110px);
  flex: 1;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  background: #e3e3e3;
  padding: 60px 80px;
  overflow: auto;
  gap: 10px;
}

.about::-webkit-scrollbar {
  width: 8px;
}

.about::-webkit-scrollbar-button {
  width: 8px;
  height: 5px;
}

.about::-webkit-scrollbar-track {
  background: #eee;
  border: thin solid lightgray;
  box-shadow: 0px 0px 3px #dfdfdf inset;
  border-radius: 10px;
}

.about::-webkit-scrollbar-thumb {
  background: #999;
  border: thin solid gray;
  border-radius: 10px;
}

.about::-webkit-scrollbar-thumb:hover {
  background: #7d7d7d;
}
.about-down {
  margin-top: 30px;
}

.profiles {
  margin-top: 15px;
  display: flex;
  overflow: auto;
  gap: 30px;
  justify-content: flex-start;

  .profile {
    background: whitesmoke;
    border-radius: 10px;
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

.a-box {
  display: inline-block;
  width: 240px;
  text-align: center;
}

.img-container {
  height: 230px;
  width: 200px;
  overflow: hidden;
  border-radius: 0px 0px 20px 20px;
  display: inline-block;
}

.img-container img {
  transform: skew(0deg, -13deg);
  height: 270px;
  margin: -35px 0px 0px -70px;
}

.inner-skew {
  display: inline-block;
  border-radius: 20px;
  overflow: hidden;
  padding: 0px;
  transform: skew(0deg, 13deg);
  font-size: 0px;
  margin: 30px 0px 0px 0px;
  background: #c8c2c2;
  height: 250px;
  width: 200px;
}

.text-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 120px 20px 20px 20px;
  border-radius: 20px;
  background: #fff;
  margin: -120px 0px 0px 0px;
  line-height: 19px;
  font-size: 14px;
}

.text-container h3 {
  margin: 20px 0px 10px 0px;
  color: #04bcff;
  font-size: 18px;
}

@media screen and (max-width: 900px) {
  .profiles {
    flex-wrap: wrap;
    justify-content: center;
  }

  p {
    font-size: 0.8em;
  }

  h2 {
    font-size: 1em;
  }
}

@media screen and (max-width: 425px) {
  .profiles {
    flex-wrap: wrap;
  }

  .about {
    padding: 25px 20px 25px !important;
  }
}
</style>
