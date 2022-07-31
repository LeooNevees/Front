<template>
  <div class="col-auto col-md-2 col-xxl-1 px-0">
    <div
      id="sidebar"
      class="collapse collapse-horizontal show border-end bg-grey bg-gradient"
    >
    <!-- <div
      id="sidebar"
      class="collapse collapse-horizontal show border-end bg-grey bg-gradient position-fixed"
      style="width: 17%"
    > -->
      <div
        class="
          d-flex
          flex-column
          align-items-center align-items-sm-start
          px-3
          pt-2
          text-white
          min-vh-100
        "
      >
        <img src="@/img/logos/nwStreaming.png" class="w-100" />
        <hr class="text-light w-100" />
        <span
          class="mt-2 w-100 fs-6 d-none d-sm-inline text-light text-center"
          >{{ nameUser }}</span
        >
        <hr class="text-light w-100" />
        <ul
          class="
            nav nav-pills
            flex-column
            mb-sm-auto mb-0
            align-items-center align-items-sm-start
          "
          id="menu"
        >
          <li class="nav-item">
            <router-link to="/" class="nav-link align-middle px-0 text-purple">
              <i class="fs-4 bi-house"></i>
              <span class="ms-1 d-none d-sm-inline"> Pagina Inicial</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/user/list"
              class="nav-link align-middle px-0 text-purple"
              v-if="privilegeAdm"
            >
              <i class="fs-4 bi-people"></i>
              <span class="ms-1 d-none d-sm-inline text-"> Usuários</span>
            </router-link>
          </li>

          <li v-if="!isLogged">
            <router-link
              to="/user/login"
              class="nav-link align-middle px-0 text-purple"
            >
              <i class="fs-4 bi-box-arrow-right"></i>
              <span class="ms-1 d-none d-sm-inline text-"> Acessar</span>
            </router-link>
          </li>
          <li v-else>
            <a
              href="#"
              class="nav-link px-0 align-middle text-danger"
              v-on:click="logout"
            >
              <i class="fs-4 bi-box-arrow-left"></i>
              <span class="ms-1 d-none d-sm-inline"> Sair</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  data() {
    return {
      isLogged: false,
      privilegeAdm: false,
    };
  },
  methods: {
    setUser() {
      if (
        localStorage.getItem("authorization") &&
        localStorage.getItem("authorization") !== ""
      ) {
        this.isLogged = true;

        var infoUser = JSON.parse(localStorage.getItem("user"));
        this.privilegeAdm = infoUser.group == 1 ? true : false;
      }
    },

    logout() {
      if(!confirm('Realmente deseja Sair? ')){
        return false;
      }

      let token = JSON.parse(localStorage.getItem("authorization"));

      axios
        .post(
          "http://localhost/api/user/logout",
          {},
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
        .then((response) => {
          this.$router.push("/user/login");
        })
        .catch(function (error) {
          console.error(error);
          if (error.response.data.error) {
            alert(error.response.data.message);
          }

          if (error.response.data.message) {
            alert(error.response.data.message);
          }
        });
      this.setParamsLogout();
    },

    setParamsLogout() {
      localStorage.removeItem("user");
      localStorage.removeItem("authorization");
      this.isLogged = false;
      this.privilegeAdm = false;
    },
  },
  computed: {
    nameUser() {
      if (localStorage.getItem("user")) {
        let retUser = JSON.parse(localStorage.getItem("user"));
        if (retUser !== "") {
          let str = retUser.name.split(" ");
          str = str[0].toLowerCase();
          return "Bem-vindo(a), " + str[0].toUpperCase() + str.substr(1);
        }
      }

      return "Seja bem-vindo(a)";
    },
  },

  mounted() {
    this.setUser();
  },
});
</script>

<style scoped>
.text-purple {
  color: #a602e2;
}

.bg-red {
  background-color: #610b0b;
}

.bg-grey {
  background-color: #0f0e0e;
}
</style>