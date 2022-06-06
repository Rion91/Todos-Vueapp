<template>
  <div class="container d-flex flex-column justify-content-md-center align-items-center" style="height: 100vh">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body" style="background-color: #d3d3d3">
          <h3>Register</h3>
          <hr>
          <form>
            <div class="form-outline mb-4">
              <input type="text" id="name" class="form-control" autofocus v-model="name"/>
              <label class="form-label" for="name">Name</label>
            </div>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email" id="email" class="form-control" v-model="email"/>
              <label class="form-label" for="email">Email address</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
              <input type="password" id="password" class="form-control" v-model="password"/>
              <label class="form-label" for="password">Password</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password" id="confirm-password" class="form-control" v-model="password_confirmation"/>
              <label class="form-label" for="confirm-password">Confirm Password</label>
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block" @click.prevent="register">Register</button>

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
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: []
    }
  },
  methods: {
    register() {
      this.errors = [];
      API.post('/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
          .then(() => {
            alert('successfully registered')
            router.push({name: 'login'})
          })
          .catch(({response}) => {
            const statusCode = response.status

            if (statusCode === 422) {
              const errors = response.data.errors
              Object.keys(errors).map((error) => {
                this.errors.push(errors[error][0])
              })
            }
          })
    }
  }
}
</script>
<style scoped>

</style>

