<template>
  <div class="position-relative">
    <div class="container-fluid">
      <div class="text-center">
        <img src="@/img/logos/nwStreaming.png" class="w-25 mt-5" />
      </div>
      <div class="mt-4 d-flex justify-content-center">
        <div class="card w-50 mt-4 shadow">
          <div class="card-body">
            <h5 class="card-title fst-italic text-center mb-4">
              Cadastro Usuário
            </h5>

            <div class="row g-2 mt-4">
              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    v-model="name"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInputGrid">Nome</label>
                </div>
              </div>
            </div>

            <div class="row g-2 mt-4">
              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="name@example.com"
                    v-model="email"
                  />
                  <label for="floatingInputGrid">E-mail</label>
                </div>
              </div>

              <div class="col-md">
                <div class="form-floating">
                  <select class="form-select" v-model="group_user">
                    <option selected>Selecione</option>
                    <option
                      v-for="group in groups"
                      v-bind:key="group.id"
                      :value="group.id"
                    >
                      {{ group.name }}
                    </option>
                  </select>
                  <label for="floatingSelectGrid">Grupo do Usuário</label>
                </div>
              </div>
            </div>

            <div class="row g-2 mt-4">
              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="name@example.com"
                    v-model="password"
                    maxlength="15"
                  />
                  <label for="floatingInputGrid">Senha</label>
                </div>
              </div>

              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="name@example.com"
                    v-model="confirm_password"
                    maxlength="15"
                  />
                  <label for="floatingInputGrid">Confirmar Senha</label>
                </div>
              </div>
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
              <router-link to="/user/login" class="me-md-4 w-25">
                <button class="btn btn-dark w-100" type="button">
                  Cancelar
                </button>
              </router-link>

              <button
                class="btn btn-purple-dark w-75"
                type="button"
                v-on:click="addUser"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "RegistrationView",
  data() {
    return {
      name: "",
      email: "",
      group_user: "Selecione",
      password: "",
      confirm_password: "",
      groups: {},
    };
  },
  methods: {
    getGroups() {
      axios
        .get("http://localhost/api/groups")
        .then((response) => {
          if (response.data.error) {
            alert(response.data.message);
            return false;
          }

          this.groups = response.data.message;
        })
        .catch(function (error) {
          if (error.response.data.error) {
            alert(error.response.data.message);
          }
        });
    },

    addUser() {
      if(this.validate() === false){
        return false;
      }

      console.log('iniciou o cadastro');
      
      axios
        .post("http://localhost/api/user/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          group_user: this.group_user,
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.message);
            return false;
          }

          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem(
            "authorization",
            JSON.stringify(response.data.authorization.token)
          );
          this.$router.push("/");
        })
        .catch(function (error) {
          console.log(error);
          
          if (error.response.data.error) {
            alert(error.response.data.message);
          }
        });
    },

    validate() {
      let inputs = {
        Nome: this.name,
        "E-mail": this.email,
        "Grupo de Usuário": this.group_user,
        Senha: this.password,
        "Confirmação Senha": this.confirm_password,
      };

      for (const [key, value] of Object.entries(inputs)) {
        if (value === "") {
          alert("Necessário preencher o campo " + key);
          return false;
        }
      }

      if (this.password !== this.confirm_password) {
        alert("As senhas não são iguais");
        return false;
      }

      return true;
    },
  },

  mounted() {
    this.getGroups();
  },
});
</script>


<style scoped>
.btn-purple-dark {
  color: white;
  background-color: #8402b3;
}
</style>
