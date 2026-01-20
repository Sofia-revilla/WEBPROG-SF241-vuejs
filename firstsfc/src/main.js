import { createApp } from 'vue'
import App from './App.vue'
import FoodItem from './components/FoodItem.vue'
import FoodItem2 from './components/FoodItem2.vue'
import PersonalProfile from './components/PersonalProfile.vue'

// Keep the CSS for styling
import './components/css/design.css'
import './components/css/gallery.css'

const app = createApp(App)

app.component('food-item', FoodItem)
app.component('food-item2', FoodItem2)
app.component('personal-profile', PersonalProfile)

// REMOVE THESE LINES:
// import './components/effect/gallery.js'
// import './components/effect/script.js'

app.mount('#app')