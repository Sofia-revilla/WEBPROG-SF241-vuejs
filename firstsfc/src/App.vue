<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])

async function getInstruments() {
  const { data, error } = await supabase
    .from('instruments')
    .select('name')

  if (error) {
    console.error('Fetch Error:', error.message)
  } else {
    console.log('Data fetched:', data)
    instruments.value = data
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <div class="list-container">
    <ul v-if="instruments.length > 0">
      <li v-for="(instrument, index) in instruments" :key="index">
        {{ instrument.name }}
      </li>
    </ul>
    <p v-else>No data found or loading...</p>
  </div>
</template>

<style scoped>
.list-container {
  padding: 40px;
  font-family: serif;
}
ul {
  list-style-type: disc;
}
li {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: black;
}
</style>