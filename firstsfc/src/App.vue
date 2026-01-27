<script setup>
import { ref, onMounted } from 'vue'
// Imports the initialized Supabase client
import { supabase } from './lib/supabaseClient'

const instruments = ref([])
const isLoading = ref(true)

async function getInstruments() {
  try {
    const { data, error } = await supabase
      .from('instruments')
      .select()
    
    if (error) throw error
    instruments.value = data
  } catch (error) {
    console.error('Connection Error:', error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <div>
    <h1>Instrument List</h1>
    
    <p v-if="isLoading">Syncing with Supabase...</p>

    <ul v-else-if="instruments.length > 0">
      <li v-for="instrument in instruments" :key="instrument.id">
        {{ instrument.name }} <span v-if="instrument.type">- {{ instrument.type }}</span>
      </li>
    </ul>

    <p v-else>No instruments found in the database.</p>
  </div>
</template>

<style scoped>
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