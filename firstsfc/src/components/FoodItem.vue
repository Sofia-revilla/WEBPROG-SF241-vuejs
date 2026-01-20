<template>
  <div class="container">
    <div class="gulay">
      <h2>{{ gulayName }}</h2>
      <p>{{ gulayMessage }}</p>
    </div>

    <div class="prutas">
      <h2>{{ prutasName }}</h2>
      <p>{{ prutasMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Data for Gulay
      gulayName: 'Gulay at Prutas',
      gulayMessage: 'Mag tanim ay hindi biro',
      
      // Data for Prutas
      prutasName: 'Apple',
      prutasMessage: 'This is a yellow apple.'
    }
  }
};
</script>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-family: sans-serif;
  }

  /* Leaf Shape */
  .gulay {
    width: 200px;
    height: 200px;
    background-color: lightgreen;
    border: 2px solid #7cb37c;
    border-radius: 0 100% 0 100%;
    
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    padding: 20px;
    text-align: center;
  } 

  /* Apple Shape */
  .prutas {
    width: 200px;
    height: 180px;
    background-color: #fce303; 
    border: 2px solid #d4be00;
    border-radius: 50% 50% 50% 50% / 45% 45% 55% 55%;
    
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    padding: 10px;
    text-align: center;
  }
</style>