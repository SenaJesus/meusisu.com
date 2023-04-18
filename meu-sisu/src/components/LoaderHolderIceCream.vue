<template>
  <span class="loader"></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoaderHolderIceCream",
});
</script>

<style scoped lang="scss">
.loader {
  height: 150px;
  width: 100px;
  border-radius: 55px 55px 10px 10px;
  position: relative;
  background: #ff3d00;
  margin: auto;
  background-image: linear-gradient(
    0deg,
    #FDDC01 25%,
    #C500AB 25%,
    #C500AB 25%,
    #C500AB 50%,
    #00D3FF 50%,
    #00D3FF 50%,
    #00D3FF 75%,
    #321E65 75%);
  background-position: 0px 0px;
  background-size: auto 175px;
  background-repeat: repeat-y;
  animation: colorShift 6s linear infinite;
}
.loader:before {
  content: "";
  position: absolute;
  left: 10px;
  bottom: 15px;
  width: 15px;
  height: 100px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.5);
}

.loader:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 0);
  box-shadow: 0 15px 2px rgba(0, 0, 0, 0.25) inset;
  width: 32px;
  height: 45px;
  background: #e09c5f;
  border-radius: 0 0 12px 12px;
}

@keyframes colorShift {
  to {
    background-position: 0 175px;
  }
}
</style>
