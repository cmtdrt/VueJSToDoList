<script setup>
const todo = defineModel('todo');
</script>

<template>
  <div class="todo-item">
    <!-- On met un id unique à chaque tâche -->
    <input :id="`todo-${todo.task}`" type="checkbox" v-model="todo.checked" />
    <label :for="`todo-${todo.task}`" :class="{ done: todo.checked }">
      {{ todo.task }}
    </label>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.done {
  text-decoration: line-through;
  color: gray;
}
</style>
