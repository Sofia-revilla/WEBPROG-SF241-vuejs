<script setup>
import { ref, onMounted } from 'vue'
// Ensure this path correctly points to your lib folder
import { supabase } from './lib/supabase' 

const instruments = ref([])

async function getInstruments() {
  // Replace 'your_table_name' with the actual name of your table in Supabase
  const { data, error } = await supabase.from('instruments').select()
  
  if (error) {
    console.error('Error fetching instruments:', error)
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
    <ul>
      <li v-for="instrument in instruments" :key="instrument.id">
        {{ instrument.name }} - {{ instrument.type }}
      </li>
    </ul>
  </div>
</template>
<style></style>