<template>
  <div class="container d-flex flex-column justify-content-md-center align-items-center" style="height: 100vh">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <h3>Login</h3>
          <hr>
          <form>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="staticEmail" v-model="email">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword" v-model="password">
              </div>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>

            <small v-for="error in errors" style="display: block">{{ error }}</small>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/config/API";
import router from "@/router";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errors: []
    }
  },
  computed: {
    credentials() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  methods: {
    login() {
      this.errors = [];
      API.post('/login', this.credentials)
          .then(response => {
            console.log('logined successfully')
            window.localStorage.setItem('jwtToken', response.data)
            router.push({name: 'home'})
            this.$router.go()
          })
          .catch(({response}) => {
            console.log(response)
            const statusCode = response.status

            if (statusCode === 422) {
              const errors = response.data.errors
              Object.keys(errors).map((error) => {
                this.errors.push(errors[error][0])
              })
            }

            if (statusCode === 401) {
              this.errors.push('The credentials are not valid')
            }
          })
    }
  }
}
</script>

<style scoped>

</style>
