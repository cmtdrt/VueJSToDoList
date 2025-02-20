<script setup>
import { ref, computed, watch } from 'vue';
import ToDoItem from './ToDoItem.vue';

const props = defineProps(['todos']);
const emit = defineEmits(['update:todos']);

const localTodos = ref([...props.todos]); // Créer une copie locale pour éviter la mutation directe

const newTask = ref('');
const filter = ref('all');

const filteredTodos = computed(() => {
  if (filter.value === 'done') return localTodos.value.filter((todo) => todo.checked);
  if (filter.value === 'todo') return localTodos.value.filter((todo) => !todo.checked);
  return localTodos.value;
});

const addTask = () => {
  if (newTask.value.trim()) {
    localTodos.value.push({ task: newTask.value, checked: false });
    newTask.value = '';
    emit('update:todos', [...localTodos.value]); // Mise à jour propre des props
  }
};

const clearCompleted = () => {
  localTodos.value = localTodos.value.filter((todo) => !todo.checked);
  emit('update:todos', [...localTodos.value]); // Mise à jour propre des props
};

// Synchroniser localTodos avec props.todos si celui-ci change
watch(
  () => props.todos,
  (newTodos) => {
    localTodos.value = [...newTodos];
  },
  { deep: true },
);
</script>

<template>
  <div class="todo-list">
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Ajouter une tâche..." />
    <button @click="addTask">Ajouter</button>

    <select v-model="filter">
      <option value="all">Toutes</option>
      <option value="done">Complétées</option>
      <option value="todo">À faire</option>
    </select>

    <ul>
      <ToDoItem
        v-for="(todo, index) in filteredTodos"
        :key="index"
        v-model:todo="localTodos[index]"
      />
    </ul>

    <button @click="clearCompleted">Supprimer les tâches accomplies</button>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
button {
  margin-top: 10px;
}
</style>
