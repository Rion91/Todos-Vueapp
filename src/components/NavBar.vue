<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Todos</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <router-link :to="{name: 'AddTodos'}">
              <li class="nav-item">
                <span class="nav-link active" aria-current="page" href="#">Create</span>
              </li>
            </router-link>
            <li class="nav-item">
              <a class="nav-link" href="#">{{ authUser.name }}</a>
            </li>
          </ul>
          <div>
            <button @click="logout" class="btn btn-warning">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import API from "@/config/API";
import router from "@/router";

export default {
  // name: "nav.vue"
  mounted() {
    this.fetchProfile()
  },
  data() {
    return {
      authUser: ''
    }
  },
  methods: {
    fetchProfile() {
      API.get('/profile')
          .then((response) => {
            this.authUser = response.data;
          })
          .catch((e) => console.log(e))
    },
    logout() {
      API.post('/logout')
          .then(() => {
            window.localStorage.removeItem('jwtToken')
            console.log('logout successfully')
            router.push({name: 'login'})
          })
          .catch((error) => console.log(error))
    }
  }
}
</script>

<style scoped>

</style>
