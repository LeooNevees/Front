<template>
    <div class="container">
        <div class="position-absolute top-50 start-50 translate-middle w-25 h-75">

            <div class="text-center">
                <h2 class="text-danger">Hcosta</h2>
            </div>

            <div class="card text-center w-100 mt-5">
                <div class="card-body mt-1">
                    <h5 class="card-title">Login</h5>

                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" v-model="user" placeholder="user">
                        <label>Usuário</label>
                    </div>

                    <div class="form-floating">
                        <input type="password" class="form-control" v-model="password" placeholder="Password">
                        <label>Senha</label>
                    </div>

                    <div class="d-grid gap-2 mt-4 mb-3">
                        <button class="btn btn-success" type="button" v-on:click="checkLogin()">Acessar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginView",
  data() {
    return {
      isLogged: false,
      user: '',
      password: '',
    };
  },
  methods: {
    checkLogin(){
        this.validate();

        this.$emit('validateLogin', this.isLogged);
    },
    validate() {
        if (this.user.trim() == '') {
            alert('Necessário fornecer Usuário');
            return false;
        }

        if (this.password.trim() == '') {
            alert('Necessário fornecer Senha');
            return false;
        }
        
        this.isLogged = true;
        return true;
    },
  },
});
</script>
