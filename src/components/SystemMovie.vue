<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
        <NavBar v-if="!isLoginPage"/>

      <main
        class="col"
        :class="[isMenuActive ? 'position-relative' : 'position-absolute']"
      >
        <a
          href="#"
          data-bs-target="#sidebar"
          data-bs-toggle="collapse"
          class="border rounded-3 p-1 text-decoration-none text-dark"
          v-on:click="setMenu"
          v-if="!isLoginPage"
          ><i class="bi bi-list bi-lg py-2 p-1"></i> Menu</a
        >

        <router-view :class="[isLoginPage ? 'mt-5' : '']"></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";

export default defineComponent({
  name: "SystemMovie",
  components: {
    NavBar,
  },

  data() {
    return {
      isMenuActive: true,
    };
  },

  methods: {
    setMenu() {
      this.isMenuActive = this.isMenuActive ? false : true;
    },
  },

  computed: {
    isLoginPage() {
      if (this.$route.name == "login" || this.$route.name == "registration") {
        return true;
      }
      return false;
    },
  },
});
</script>
