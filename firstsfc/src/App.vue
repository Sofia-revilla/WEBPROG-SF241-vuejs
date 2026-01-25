<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

// Initialize as an empty array to prevent 'v-for' errors
const instruments = ref([])

async function getInstruments() {
  // 1. Destructure { data, error } directly from the Supabase call
  const { data, error } = await supabase
    .from('instruments')
    .select('name') // We only need the 'name' column for your desired result

  if (error) {
    console.error('Error fetching instruments:', error.message)
  } else {
    // 2. Assign the fetched array to your ref
    instruments.value = data
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <div class="container">
    <ul>
      <li v-for="(instrument, index) in instruments" :key="index">
        {{ instrument.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Basic styling to match the clean look in your target image */
.container {
  padding: 20px;
  font-family: serif; /* Standard browser serif font for the list */
}

ul {
  list-style-type: disc;
  padding-left: 40px;
}

li {
  font-size: 1.2rem;
  line-height: 1.6;
}
</style>