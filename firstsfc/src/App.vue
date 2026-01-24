<template>
  <main>
    <ul>
      <li v-for="instrument in instruments" :key="instrument.id">
        {{ instrument.name }}
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient' 

const instruments = ref([])

async function getInstruments() {
  const { data, error } = await supabase.from('instruments').select()
  if (error) {
    console.error('Error fetching:', error)
  } else {
    instruments.value = data
  }
}

onMounted(() => {
  getInstruments()
})
</script>