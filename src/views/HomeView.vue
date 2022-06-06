<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-4 " v-for="todo in todos">
          <SingleTodos :todo="todo" @deleted="fetchTodos" />
        </div>
      </div>
    </div>
    <!--    <button @click="logout" class="btn btn-warning">Logout</button>-->
  </div>
</template>

<script>

import API from "@/config/API";
import router from "@/router";
import SingleTodos from "@/components/SingleTodos";


export default {
  components: {
    SingleTodos
  },

  data() {
    return {
      todos: {}
    }
  },
  computed() {

  },
  mounted() {
    this.fetchTodos()
  },
  methods: {
    fetchTodos() {
      this.todos = []
      API.get('/todos')
          .then((response) => {
            this.todos = response.data.data
          })
          .catch((error) => console.log(error))
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
