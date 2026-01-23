<script setup>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

// 1. Initialize Supabase using Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 2. Reactive state
const items = ref([])
const loading = ref(true)
const errorMessage = ref(null)

// 3. The Fetch Function
async function fetchTableData() {
  try {
    loading.value = true
    // REPLACE 'your_table_name' with the actual name of your table in Supabase
    let { data, error } = await supabase
      .from('your_table_name') 
      .select('*')

    if (error) throw error
    items.value = data
  } catch (err) {
    errorMessage.value = err.message
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTableData()
})
</script>

<template>
  <div class="container">
    <h2>Instrument List</h2>

    <div v-if="loading">Loading data from database...</div>

    <div v-else-if="errorMessage" class="error">
      <strong>Error:</strong> {{ errorMessage }}
      <p>Check if your VITE_ environment variables are set in Vercel.</p>
    </div>

    <table v-else-if="items.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No data found in the table.</p>
  </div>
</template>

<style scoped>
.container { font-family: sans-serif; padding: 20px; }
.error { color: red; border: 1px solid red; padding: 10px; margin-top: 10px; }
table { width: 100%; border-collapse: collapse; margin-top: 10px; }
th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
th { background-color: #f4f4f4; }
</style>