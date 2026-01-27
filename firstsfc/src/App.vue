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
      </li><script setup>
import { ref, onMounted } from 'vue'

// FIXED: Using './lib/supabaseClient' because 'lib' is a folder inside 'src'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])

async function getInstruments() {
  // Added await and matched the table name 'instruments'
  const { data, error } = await supabase.from('instruments').select()
  
  if (error) {
    console.error('Connection Error:', error.message)
  } else {
    instruments.value = data
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <div>
    <h1>Instrument List</h1>
    
    <p v-if="instruments.length === 0">Syncing with Supabase...</p>

    <ul v-else>
      <li v-for="instrument in instruments" :key="instrument.id">
        {{ instrument.name }} - {{ instrument.type }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Standard bullet styling */
ul {
  list-style-type: disc;
  padding-left: 40px;
}
li {
  font-family: Arial, sans-serif;
  font-size: 1.1rem;
  margin-bottom: 5px;
}
</style>
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