import { createApp } from 'vue'
import App from './App.vue'
import FoodItem from './components/FoodItem.vue'
import FoodItem2 from './components/FoodItem2.vue'

// Import the PersonalProfile component
import PersonalProfile from './components/PersonalProfile.vue'

// Import Global CSS files
import './components/css/design.css'
import './components/css/gallery.css'

const app = createApp(App)

// Register components globally
app.component('food-item', FoodItem)
app.component('food-item2', FoodItem2)

// Register PersonalProfile globally
app.component('personal-profile', PersonalProfile)

app.mount('#app')