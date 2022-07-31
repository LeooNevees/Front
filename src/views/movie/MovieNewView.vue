<template>
  <div class="position-relative">
    <div class="container-fluid">
      <div class="mt-4 d-flex justify-content-center">
        <div class="card w-50 mt-5 shadow">
          <div class="card-body">
            <h5 class="card-title fst-italic text-center mb-4">
              Cadastro Filmes/Séries
            </h5>

            <div class="row g-2 mt-4">
              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    v-model="title"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInputGrid">Título</label>
                </div>
              </div>

              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="name@example.com"
                    maxlength="4"
                    @input="year_entry = onlyNumbers(year_entry)"
                    v-model="year_entry"
                  />
                  <label for="floatingInputGrid">Ano Lançamento</label>
                </div>
              </div>
            </div>

            <div class="row g-2 mt-4">
              <div class="form-floating">
                <textarea
                  class="form-control"
                  placeholder="Leave a comment here"
                  v-model="description"
                  style="height: 100px"
                ></textarea>
                <label for="floatingTextarea2">Descrição</label>
              </div>
            </div>

            <div class="row g-2 mt-4">
              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="name@example.com"
                    @input="duration = onlyNumbers(duration)"
                    v-model="duration"
                    maxlength="3"
                  />
                  <label for="floatingInputGrid">Duração (minutos)</label>
                </div>
              </div>

              <div class="col-md">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="name@example.com"
                    @input="
                      age_classification = onlyNumbers(age_classification)
                    "
                    v-model="age_classification"
                    maxlength="2"
                  />
                  <label for="floatingInputGrid">Classificação de Idade</label>
                </div>
              </div>
            </div>

            <div class="row g-2 mt-4">
              <div class="col-md">
                <div class="form-floating">
                  <select class="form-select" v-model="genre_id">
                    <option selected>Selecione</option>
                    <option
                      v-for="genre in genres"
                      v-bind:key="genre.id"
                      :value="genre.id"
                    >
                      {{ genre.name }}
                    </option>
                  </select>
                  <label for="floatingSelectGrid">Gênero</label>
                </div>
              </div>

              <div class="col-md">
                <div class="form-floating">
                  <select class="form-select" v-model="type_entertainment_id">
                    <option selected>Selecione</option>
                    <option
                      v-for="typeEntertainment in types"
                      v-bind:key="typeEntertainment.id"
                      :value="typeEntertainment.id"
                    >
                      {{ typeEntertainment.name }}
                    </option>
                  </select>
                  <label for="floatingSelectGrid">Tipo de Entretenimento</label>
                </div>
              </div>
            </div>

            <div class="mb-3 mt-4">
              <label for="formFile" class="form-label">Imagem</label>
              <input
                class="form-control"
                type="file"
                v-on:change="selectImage"
                :key="image"
              />
            </div>

            <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
              <router-link to="/" class="me-md-4 w-25">
                <button class="btn btn-dark" type="button">Cancelar</button>
              </router-link>

              <button
                class="btn btn-success w-50"
                type="button"
                v-on:click="addMovie"
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
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "MovieNewView",
  data() {
    return {
      title: "",
      description: "",
      duration: "",
      age_classification: "",
      image: 0,
      year_entry: "",
      genre_id: "Selecione",
      type_entertainment_id: "Selecione",
      user: 1,
      file: "",
      genres: {},
      types: {},
    };
  },

  methods: {
    getInformations() {
      axios
        .get("http://localhost/api/genre/")
        .then((response) => {
          if (response.data.error) {
            alert(response.data.message);
            return false;
          }

          this.genres = response.data.message;
        })
        .catch(function (error) {
          alert('Erro ao tentar fazer requisição. Por favor tente mais tarde');
          console.error(error);
          if (error.response.data.error) {
            alert(error.response.data.message);
          }

          if (error.response.data.message) {
            alert(error.response.data.message);
          }
        });

      axios
        .get("http://localhost/api/typeEntertainment/")
        .then((response) => {
          if (response.data.error) {
            alert(response.data.message);
            return false;
          }

          this.types = response.data.message;
        })
        .catch(function (error) {
          alert('Erro ao tentar fazer requisição. Por favor tente mais tarde');
          console.error(error);
          if (error.response.data.error) {
            alert(error.response.data.message);
          }

          if (error.response.data.message) {
            alert(error.response.data.message);
          }
        });
    },

    validateForm() {
      let inputs = {
        Título: this.title,
        Descrição: this.description,
        Duração: this.duration,
        "Classificação de Idade": this.age_classification,
        "Ano de Lançamento": this.year_entry,
        Gênero: this.genre_id,
        "Tipo de Entretenimento": this.type_entertainment_id,
      };

      for (const [key, value] of Object.entries(inputs)) {
        if (value === "") {
          alert("Necessário preencher o campo " + key);
          return false;
        }
      }

      return true;
    },

    selectImage(ev) {
      this.file = ev.target.files[0];
    },

    addMovie() {
      if (this.validateForm() == false) {
        return false;
      }

      let data = new FormData();
      data.append("title", this.title);
      data.append("description", this.description);
      data.append("duration", this.duration);
      data.append("age_classification", this.age_classification);
      data.append("year_entry", this.year_entry);
      data.append("genre", this.genre_id);
      data.append("type_entertainment", this.type_entertainment_id);
      data.append("image", this.file);

      axios
        .post("http://localhost/api/movies/create", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("authorization")),
          },
        })
        .then((response) => {
          alert(response.data.message);

          if (response.data.error) {
            return false;
          }

          this.clearInputs();
        })
        .catch(function (error) {
          alert('Erro ao tentar fazer requisição. Por favor tente mais tarde');
          console.error(error);
          if (error.response.data.error) {
            alert(error.response.data.message);
          }

          if (error.response.data.message) {
            alert(error.response.data.message);
          }
        });
    },

    clearInputs() {
      this.title = "";
      this.description = "";
      this.duration = "";
      this.age_classification = "";
      this.image++;
      this.year_entry = "";
      this.genre_id = "Selecione";
      this.type_entertainment_id = "Selecione";
    },

    onlyNumbers(value) {
      return (value + "").replace(/\D+/g, "");
    },

    validatePage() {
      if (
        !localStorage.getItem("authorization") ||
        localStorage.getItem("authorization") === ""
      ) {
        this.$router.push("/user/login");
      }
    },
  },

  mounted() {
    this.validatePage();

    this.getInformations();
  },
});
</script>

<style scoped>
.btn-purple {
  color: white;
  background-color: #9003c4;
}
</style>
