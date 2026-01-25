<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])

async function getInstruments() {
  const { data, error } = await supabase
    .from('instruments')
    .select('name') // Fetching only the 'name' column

  if (error) {
    console.error('Supabase Error:', error.message)
  } else {
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
    <p v-else>Loading instruments...</p>
  </div>
</template>

<style scoped>
.list-container {
  padding: 40px;
  font-family: serif; /* Standard serif to match your goal image */
}
ul {
  list-style-type: disc;
}
li {
  font-size: 1.2rem;
  margin-bottom: 5px;
}
</style>