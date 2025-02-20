<script setup>
import { ref, watchEffect } from 'vue';
import { saveCategories, loadCategories } from '@/db/index.js';

const categories = ref([]);
const newCategory = ref('');

const addCategory = () => {
  if (!newCategory.value.trim()) return;
  categories.value.push({ id: Date.now(), name: newCategory.value });
  newCategory.value = '';
};

watchEffect(() => saveCategories(JSON.parse(JSON.stringify(categories.value))));

loadCategories().then((data) => (categories.value = data));
</script>

<template>
  <div>
    <input v-model="newCategory" @keyup.enter="addCategory" placeholder="Nouvelle catégorie" />
    <ul>
      <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
    </ul>
  </div>
</template>
