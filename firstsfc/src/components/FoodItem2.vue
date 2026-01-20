<template>
  <div class="gulay">
    <h2>{{ name }}</h2>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Gulay at Prutas',
      message: 'Mag tanim ay hindi biro'
    }
  }
};
</script>

<style>
  .gulay {
    width: 200px;
    height: 200px;
    background-color: lightgreen;
    border: 2px solid #7cb37c;
    /* This creates the leaf shape */
    border-radius: 0 100% 0 100%;
    
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    padding: 20px;
    text-align: center;
  } 
</style>