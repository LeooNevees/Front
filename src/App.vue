<template>
  <SystemMovie />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SystemMovie from "./components/SystemMovie.vue";
import LoginView from "./views/user/LoginView.vue";

export default defineComponent({
  name: "App",
  components: {
    SystemMovie,
    LoginView,
  },
});
</script>

<style>
</style>
