<template>
  <div class="col-auto col-md-2 col-xxl-1 px-0">
    <div
      id="sidebar"
      class="collapse collapse-horizontal show border-end bg-grey bg-gradient"
    >
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
        <img src="@/img/logos/nwStreamming.png" class="w-100" />
        <hr class="text-light w-100" />
        <span class="mt-2 w-100 fs-6 d-none d-sm-inline text-light text-center"
          >Bem-vindo, Leonardo</span
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
            <router-link
              to="/home"
              class="nav-link align-middle px-0 text-purple"
            >
              <i class="fs-4 bi-house"></i>
              <span class="ms-1 d-none d-sm-inline"> Pagina Inicial</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/movie/browse"
              class="nav-link align-middle px-0 text-purple"
            >
              <i class="fs-4 bi-film text-"></i>
              <span class="ms-1 d-none d-sm-inline text-"> Filmes/Séries</span>
            </router-link>
          </li>

          <!-- <li>
            <a
              href="#submenu2"
              data-bs-toggle="collapse"
              class="nav-link px-0 align-middle text-purple"
            >
              <i class="fs-4 bi-film text-"></i>
              <span class="ms-1 d-none d-sm-inline text-"> Filmes/Séries</span>
            </a>
            <ul
              class="collapse nav flex-column ms-1"
              id="submenu2"
              data-bs-parent="#menu"
            >
              <li class="w-100">
                <router-link
                  to="/movie/browse"
                  class="nav-link align-middle px-0"
                >
                  <span class="ms-1 d-none d-sm-inline text-light"> Mural</span>
                </router-link>
              </li>

              <li class="w-100">
                <router-link to="/movie/new" class="nav-link align-middle px-0">
                  <span class="ms-1 d-none d-sm-inline text-light"> Cadastrar Novo</span>
                </router-link>
              </li>
            </ul>
          </li> -->

          <li>
            <a href="#" class="nav-link px-0 align-middle text-danger">
              <i class="fs-4 bi-people"></i>
              <span class="ms-1 d-none d-sm-inline"> Sair</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
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