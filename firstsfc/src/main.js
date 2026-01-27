import { createApp } from 'vue'
import App from './App.vue'

// Temporarily comment these out to isolate the error
// import FoodItem from './components/FoodItem.vue'
// import FoodItem2 from './components/FoodItem2.vue'
// import PersonalProfile from './components/PersonalProfile.vue'

const app = createApp(App)

// app.component('food-item', FoodItem)
// app.component('food-item2', FoodItem2)
// app.component('personal-profile', PersonalProfile)

app.mount('#app')