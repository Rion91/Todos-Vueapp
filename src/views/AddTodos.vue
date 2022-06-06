<template>
  <div class="container d-flex flex-column justify-content-md-center align-items-center" style="">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <h3>Add Todos</h3>
          <hr>
          <form>
            <div class="mb-3 row">
              <label for="title" class="col-sm-2 col-form-label">Title</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="title" v-model="title">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="note" class="col-sm-2 col-form-label">Note</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="note" v-model="note">
              </div>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary" @click.prevent="addTodos">Save</button>

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
  name: "AddTodos",
  data()
  {
    return {
      title: '',
      note: '',
      errors:[]
    }
  },
  methods:{
    addTodos()
    {
      API.post('/todos', {
        title: this.title,
        note: this.note
      })
          .then(res => {
            alert('successfully added')
            router.push({name: 'home'})
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
