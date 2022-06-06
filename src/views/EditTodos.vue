<template>
  <div class="container d-flex flex-column justify-content-md-center align-items-center" style="">
    <div class="col-md-4">
      <div class="card">
        <div class="card-body">
          <h3>Edit Todos</h3>
          <hr>
          <form>
            <div class="mb-3 row">
              <label for="title" class="col-sm-2 col-form-label">Title</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="title" v-model="todos.title">
              </div>
            </div>
            <div class="mb-3 row">
              <label for="note" class="col-sm-2 col-form-label">Note</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="note" v-model="todos.note">
              </div>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary" @click.prevent="editTodos">Update</button>

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
  props:['id'],
  name: "EditTodos",
  data()
  {
    return {
      todos: {
          title: '',
          note: '',
      },
      errors: []
    }
  },
  methods:{
    editTodos(){
      API.put(`/todos/${this.id}`, this.todos)
          .then(response => {
            alert('updated successfully')
            router.push({name: 'home'})
          })
          .catch(error => console.log(error))
    }
  },
  mounted() {
    API.get(`/todos/${this.id}`)
        .then(res => {
          this.todos = res.data.data;
        })
        .catch((e) => console.log(e));
  }
}
</script>

<style scoped>

</style>
