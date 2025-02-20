<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['filterChanged']);

const setFilter = (filter) => {
  emit('filterChanged', filter);
};
</script>

<template>
  <select @change="setFilter($event.target.value)">
    <option value="all">Toutes</option>
    <option value="done">Accomplies</option>
    <option value="todo">À faire</option>
  </select>
</template>
