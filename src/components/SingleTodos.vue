<template>
  <div class="card text-dark ms-3 " :class="{ 'bg-success': todo.isComplete }">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>
        {{ todo.username }}
      </span>
      <button class="border border-0 btn btn-info" @click="toggleComplete">
        <i class="fas fa-check-circle"></i> {{toggleButtonText}}
      </button>
      <button class="btn btn-danger" @click="deleteTodo()">Delete</button>
      <router-link :to="{name: 'EditTodos', params:{id: todo.id}}">
        <button class="btn btn-warning">Edit</button>
      </router-link>

    </div>
    <div class="card-body">
      <h5 class="card-title">{{ todo.title }}</h5>
      <p class="card-text">{{ todo.note }}</p>
    </div>
    <div class="card-footer">
      <p class="card-text">{{ todo.created_at }}</p>
    </div>
  </div>
</template>

<script>
import API from "@/config/API";

export default {
  props: ['todo'],
  computed: {
    toggleButtonText() {
      return this.todo.isComplete ? 'Mark As uncompleted' : 'Mark As completed'
    }
  },
  methods: {
    deleteTodo() {
      API.delete(`/todos/${this.todo.id}`)
          .then((response) => {
            this.$emit('deleted')
          })
          .catch()
    },
    toggleComplete(event) {
      API.patch(`/todos/${this.todo.id}/toggle-complete`, {})
          .then(res => {
            this.$emit('deleted')
          })
          .catch(e => console.log(e))
    }
  }
  // name: "SingleTodos"
}
</script>

<style scoped>

</style>
