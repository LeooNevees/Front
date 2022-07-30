<template>
  <div class="position-relative">
    <div class="container-fluid">
      <div class="mt-4 d-flex justify-content-center">
        <h2 class="fst-italic">Filmes e Séries</h2>
      </div>
      <div class="mt-4 d-flex justify-content-center">
        <form class="d-flex w-50" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Título, Descrição, Gênero ou Tipo (Filme/Série)"
            aria-label="Pesquisar"
            v-model="description"
          />
          <button class="btn btn-purple" type="button" v-on:click="getMovies">
            Buscar
          </button>
        </form>
      </div>

      <hr />

      <div class="position-relative top-50 start-50 mb-3">
        <router-link to="/movie/new">
          <button type="button" class="btn btn-outline-success"> + </button>
        </router-link>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <template v-for="movie in movies" v-bind:key="movie.id">
          <div class="col">
            <div class="card shadow">
              <img
                class="card-img-top"
                style="height: 300px"
                :src="'http://localhost/api/movies/image/' + movie.id"
                alt="..."
              />

              <div class="card-body shadow p-3 bg-body rounded">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="card-text fw-bold">
                    {{ capitalFirstLetter(movie.title) }}
                  </span>
                  <button
                    type="button"
                    class="btn text-danger"
                    v-on:click="initVote(movie)"
                  >
                    <i
                      class="bi me-1"
                      :class="[
                        parseInt(movie.quantity_vote) > 0 &&
                        movie.users_vote.includes(1)
                          ? 'bi-heart-fill'
                          : 'bi-heart',
                      ]"
                    ></i>
                  </button>
                </div>

                <small class="text-success">{{
                  treatmentVote(movie.quantity_vote)
                }}</small>

                <div
                  class="d-flex justify-content-between align-items-center mt-3"
                >
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-sm btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#modalDescriptionMovie"
                      v-on:click="modalDetailsMovie(movie.id)"
                    >
                      + Informações
                    </button>
                  </div>
                  <button
                    type="button"
                    class="btn btn-dark btn-sm ms-1"
                    disabled
                  >
                    {{ capitalFirstLetter(movie.genre_name) }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  <!-- Modal Description -->
  <div
    class="modal fade"
    id="modalDescriptionMovie"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ capitalFirstLetter(detailsMovies.title) }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <p>{{ capitalFirstLetter(detailsMovies.description) }}</p>

          <div class="mt-5">
            <div class="badge bg-primary text-wrap" style="width: 5rem">
              {{ detailsMovies.age_classification }} anos
            </div>
            <div class="badge bg-secondary text-wrap ms-1" style="width: 5rem">
              {{ detailsMovies.data_entry }}
            </div>
            <div class="badge bg-danger text-wrap ms-1" style="width: 5rem">
              {{ capitalFirstLetter(detailsMovies.type_entertainment_name) }}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-purple" data-bs-dismiss="modal">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "MovieBrowseView",
  data() {
    return {
      params: "",
      imageAsBase64: "",
      description: "",
      movies: [],
      detailsMovies: {
        title: "",
        description: "",
        type_entertainment_name: "",
      },
    };
  },
  methods: {
    getMovies() {
      this.params = "";
      if (this.description.trim() !== "") {
        this.params = "?description=" + this.description;
      }

      axios
        .get("http://localhost/api/movies/show" + this.params)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.message);
            this.movies = [];
            return false;
          }

          this.movies = response.data.message;
          localStorage.setItem("movies", JSON.stringify(response.data.message));
        })
        .catch(function (error) {
          console.error(error);
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

    treatmentVote(num) {
      if (num === "" || parseInt(num) == 0) {
        return "Nenhum voto";
      }

      return parseInt(num) > 1 ? num + " Votos" : num + " Voto";
    },

    modalDetailsMovie(id) {
      if (id === "") {
        alert(
          "Erro ao tentar abrir informações. Por favor recarregue a página"
        );
        return false;
      }

      let infos = localStorage.getItem("movies");
      infos = JSON.parse(infos);
      infos.forEach((element) => {
        if (element.id != id) {
          return;
        }

        this.detailsMovies = element;
      });
    },

    initVote(movie) {
      if (movie === "") {
        alert("Erro ao buscar dados do Filme. Por favor recarregue a página");
        return false;
      }

      let user = 1;
      console.log(movie.quantity_vote > 0 && movie.users_vote.includes(user));

      if (movie.quantity_vote > 0 && movie.users_vote.includes(user)) {
        this.removeVote();
        return true;
      }

      this.applyVote(movie.id);
    },

    applyVote(id) {
      if (id === "") {
        alert(
          "Parâmetros inválidos para votação. Por favor recarregue a página"
        );
        return false;
      }

      if (!confirm("Realmente deseja curtir esse Filme/Série?")) {
        return false;
      }

      axios
        .post("http://localhost/api/vote/create", {
          movie_id: id,
          users_id: 1,
        })
        .then((response) => {
          alert(response.data.message);
          this.getMovies();
          return true;
        })
        .catch(function (error) {
          if (error.response.data.error) {
            alert(error.response.data.message);
          }
        });
    },

    removeVote() {
      let user = "1";
      if (user === "") {
        alert("Erro ao desfazer o Voto. Por favor recarregue a Página");
        return false;
      }

      if (!confirm("Realmente deseja descurtir esse Filme/Série?")) {
        return false;
      }

      axios
        .delete("http://localhost/api/vote/destroy/" + user)
        .then((response) => {
          alert(response.data.message);
          this.getMovies();

          return true;
        })
        .catch(function (error) {
          if (error.response.data.error) {
            alert(error.response.data.message);
          }
        });
    },
  },

  mounted() {
    this.getMovies();
  },
});
</script>

<style scoped>
.btn-purple {
  color: white;
  background-color: #9003c4;
}
</style>
