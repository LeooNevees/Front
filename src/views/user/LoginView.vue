<template>
  <div class="position-absolute w-100 h-100 body-login">
    <div class="container">
      <div class="position-absolute top-50 start-50 translate-middle w-25 h-75">
        <div class="text-center">
          <img src="@/img/logos/nwStreaming.png" class="w-100" />
        </div>

        <div class="card text-center w-100 mt-5 shadow">
          <div class="card-body mt-1">
            <h5 class="card-title">Login</h5>

            <div class="form-floating mb-3 mt-4">
              <input
                type="email"
                class="form-control"
                v-model="email"
                placeholder="email"
              />
              <label>E-mail</label>
            </div>

            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                v-model="password"
                placeholder="Password"
              />
              <label>Senha</label>
            </div>

            <div class="d-grid gap-2 mt-4">
              <button
                class="btn btn-purple-dark"
                type="button"
                v-on:click="checkLogin()"
              >
                Acessar
              </button>

              <router-link to="/" class="btn btn-secondary">
                Voltar
              </router-link>

              <router-link to="/user/registration" class="btn btn-link mt-4 text-decoration-none">
                Cadastre-se
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      isLogged: false,
      email: "",
      password: "",
    };
  },
  methods: {
    checkLogin() {
      this.validate();

      axios
        .post("http://localhost/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {

          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem(
            "authorization",
            JSON.stringify(response.data.authorization.token)
          );
          this.$router.push("/");
        })
        .catch(function (error) {
          if (error.response.data.error) {
            alert(error.response.data.message);
          }
        });
    },

    validate() {
      if (this.email.trim() == "") {
        alert("Necessário fornecer Usuário");
        return false;
      }

      if (this.password.trim() == "") {
        alert("Necessário fornecer Senha");
        return false;
      }

      this.isLogged = true;
      return true;
    },
  },
});
</script>


<style scoped>
.btn-purple-dark {
  color: white;
  background-color: #8402b3;
}

.body-login {
  background-color: #e3e3e6;
}
</style>
