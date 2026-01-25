<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])

async function getInstruments() {
  const { data, error } = await supabase
    .from('instruments')
    .select('name')

  if (!error && data) {
    instruments.value = data
  }
}

onMounted(() => {
  getInstruments()
})
</script>

<template>
  <div class="list-container">
    <ul>
      <li>violin</li>
      <li>viola</li>
      <li>cello</li>
      <li>guitar</li>
    </ul>

    <ul v-if="instruments.length > 0" class="db-list">
      <li v-for="(instrument, index) in instruments" :key="index">
        {{ instrument.name }} (Live)
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list-container {
  padding: 40px;
  font-family: serif; /* Matches standard browser serif font */
}

ul {
  list-style-type: disc; /* Ensures standard bullet points */
  padding-left: 20px;
}

li {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: black;
}

.db-list {
  margin-top: 20px;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 10px;
}
</style>