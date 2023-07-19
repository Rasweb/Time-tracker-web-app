/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import dayjs from "dayjs"

const app = createApp(App)

app.config.globalProperties.$dayjs = dayjs

registerPlugins(app)

app.mount('#app')
