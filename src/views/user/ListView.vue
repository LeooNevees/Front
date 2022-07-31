<template>
  <div class="position-absolute w-100 h-100 body-login">
    <div class="container">
      <div class="position-absolute top-50 start-50 translate-middle w-75 h-75">
        <h3 class="card-title fst-italic text-center mb-4">
          Controle de Usuários
        </h3>
        <div class="card text-center w-100 mt-5 shadow">
          <div class="card-body mt-1">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Grupo</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in users"
                  v-bind:key="user.id"
                  :class="[
                    isAdmin(user.group_id) ? 'bg-grey-light' : '',
                  ]"
                >
                  <td>{{ user.id }}</td>
                  <td>{{ capitalFirstLetter(user.user_name) }}</td>
                  <td>{{ capitalFirstLetter(user.group_name) }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link"
                      v-on:click="deleteUser(user.id)"
                      :disabled="isAdmin(user.group_id)"
                    >
                      <i class="bi bi-trash-fill text-danger"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
  name: "ListView",
  data() {
    return {
      users: {},
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

    getUser() {
      if (!JSON.parse(localStorage.getItem("authorization"))) {
        alert("Parâmetros inválidos. Por favor recarregue a página");
        return false;
      }

      axios
        .get("http://localhost/api/user/show", {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("authorization")),
          },
        })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.message);
            return false;
          }

          this.users = response.data.message;
        })
        .catch(function (error) {
          if (error.response.data.error) {
            alert(error.response.data.message);
          }
        });
    },

    capitalFirstLetter(str) {
      if (str.trim() === "") {
        return "";
      }
      let newStr = str.toLowerCase();

      return newStr[0].toUpperCase() + newStr.substr(1);
    },

    deleteUser(id) {
      if (id === "") {
        alert("Parâmetros inválidos. Por favor recarregue a página");
        return false;
      }

      if (!confirm("Realmente deseja excluir o usuário? ")) {
        return false;
      }

      axios
        .delete("http://localhost/api/user/destroy/" + id, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("authorization")),
          },
        })
        .then((response) => {
          alert(response.data.message);
          if (response.data.error) {
            return false;
          }

          this.getUser();
        })
        .catch(function (error) {
          if (error.response.data.error) {
            alert(error.response.data.message);
          }
        });
    },

    isAdmin(idGroup) {
      return idGroup == 1 ? true : false;
    },
  },

  mounted() {
    this.getUser();
  },
});
</script>


<style scoped>
.bg-grey-light {
  background-color: #f0eba8;
}
</style>
