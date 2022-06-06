<template>
  <div id="app">
    <div class="container" v-if="currentRouteName !== 'login' && currentRouteName !== 'register'">
      <NavBar/>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import NavBar from "@/components/NavBar";
import API from "@/config/API";

export default {
  components: {
    NavBar
  },
  data()
  {
    return{
      todos: {}
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    },
  },
}
</script>
