<template>
  <h1>Food</h1>
  <country/>
  <personal-profile/>
  
  <div class="food-container">
    <food-item/>
    <food-item/>
    <food-item/>
  </div>

  <comment-form/>
  <comment/>

  <rest-api/> 
  
</template>

<script>
// Logic can go here later if needed
</script>

<style>
/* This fix ensures your cursor stays visible across the whole app */
* {
  cursor: auto !important;
}

/* This ensures that buttons and clickable items still look like links */
button, 
.btn, 
input[type="submit"], 
a {
  cursor: pointer !important;
}

/* Optional: Adding a little layout to prevent your food items from stacking weirdly */
.food-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}
</style>