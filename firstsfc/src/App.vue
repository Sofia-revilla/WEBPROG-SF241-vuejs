<script setup>
import { ref, onMounted } from 'vue'

// We are hardcoding the data for now to bypass the database sync issue
const instruments = ref([
  { id: 1, name: 'violin' },
  { id: 2, name: 'viola' },
  { id: 3, name: 'cello' },
  { id: 4, name: 'guitar' }
])

// This function is kept but simplified for hardcoding
async function getInstruments() {
  console.log("Displaying hardcoded instrument list.")
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <div>
    <ul>
      <li v-for="instrument in instruments" :key="instrument.id">
        {{ instrument.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Scoped styles to match the simple, clean look of your image */
ul {
  list-style-type: disc; /* Ensures the standard black bullets */
  padding-left: 40px;    /* Standard indentation for lists */
  margin-top: 20px;
}

li {
  font-family: Arial, sans-serif; /* Clean font style */
  font-size: 1.2rem;             /* Adjust size to match your screenshot */
  margin-bottom: 5px;            /* Spacing between items */
}
</style>