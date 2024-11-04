<template>
  <div>
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodoText" type="text" placeholder="Add a new todo">
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo)">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="deleteTodo(todo)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Todo from '../domain/Todo'

export default {
  data() {
    return {
      newTodoText: '',
      todos: [],
    }
  },
  async mounted() {
    const rows = await Todo.findAll()
    this.todos = rows
  },
  methods: {
    async addTodo() {
      const todo = new Todo(this.newTodoText)
      todo.save()
      this.todos.push(todo)
      this.newTodoText = ''
    },
    async updateTodo(todo) {
      todo.update()
    },
    async deleteTodo(todo) {
      todo.delete()
      this.todos = this.todos.filter(t => t.id !== todo.id)
    },
  },
}
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
