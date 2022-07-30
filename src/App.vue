<template>
  <SystemMovie v-if="isLogged" @validateLogin="setLogged" />
  <!-- <LoginView v-else @validateLogin="setLogged" /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SystemMovie from "./components/SystemMovie.vue";
import LoginView from "./views/LoginView.vue";

export default defineComponent({
  name: "App",
  components: {
    SystemMovie,
    LoginView,
  },
  data() {
    return {
      isLogged: true,
    };
  },
  methods: {
    setLogged(status) {
      this.isLogged = status;
    },
  },
});
</script>

<style>
</style>
