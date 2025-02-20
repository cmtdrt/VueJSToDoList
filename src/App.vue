<script setup>
import { ref, watchEffect } from 'vue';
import ToDoList from './components/ToDoList.vue';
import { useIndexedDB } from './composables/useIndexedDB.js';

const todos = ref([]);
const { saveToDB, loadFromDB } = useIndexedDB('todosDB', 'todos');

watchEffect(() => {
  saveToDB(todos.value);
});

loadFromDB().then((savedTodos) => {
  if (savedTodos) {
    todos.value = savedTodos;
  }
});
</script>

<template>
  <div>
    <h1>Ma ToDoList</h1>
    <ToDoList v-model:todos="todos" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
div {
  margin-top: 40%;
}
</style>
