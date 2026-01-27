<script setup>
import { ref } from 'vue'

// Hardcoded data based on your requirements
const instruments = ref([
  { id: 1, name: 'violin' },
  { id: 2, name: 'viola' },
  { id: 3, name: 'cello' },
  { id: 4, name: 'guitar' }
])
</script>

<template>
  <div>
    <h1>Instrument List</h1>
    <ul>
      <li v-for="instrument in instruments" :key="instrument.id">
        {{ instrument.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Matching the clean bulleted style */
h1 {
  font-family: sans-serif;
  color: #333;
}
ul {
  list-style-type: disc;
  padding-left: 40px;
}
li {
  font-family: sans-serif;
  font-size: 1.2rem;
  margin-bottom: 8px;
  text-transform: capitalize;
}
</style>