<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])
const loading = ref(true)
const error = ref(null)

async function getInstruments() {
  try {
    loading.value = true
    // Fetching from the 'instruments' table you just created
    const { data, error: dbError } = await supabase
      .from('instruments')
      .select('*')

    if (dbError) throw dbError
    instruments.value = data
  } catch (e) {
    error.value = e.message
    console.error("Connection Error:", e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <div class="container">
    <h1>Musical Instruments</h1>

    <p v-if="loading">Loading from Supabase...</p>

    <div v-else-if="error" class="error-box">
      <strong>Connection Error:</strong> {{ error }}
    </div>

    <ul v-else-if="instruments.length > 0">
      <li v-for="item in instruments" :key="item.id">
        {{ item.name }}
      </li>
    </ul>

    <p v-else>No data found in the instruments table.</p>
  </div>
</template>

<style scoped>
.container { font-family: sans-serif; padding: 40px; }
.error-box { color: white; background: #e74c3c; padding: 15px; border-radius: 5px; }
ul { list-style: square; line-height: 2; }
li { text-transform: capitalize; font-size: 1.2rem; }
</style>