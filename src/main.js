import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const components = import.meta.globEager('./components/*.vue')

const app = createApp(App)

app.component('Datepicker', Datepicker)

Object.entries(components).forEach(([path, definition]) => {
  const componentName = path.split('/').pop().replace(/\.\w+$/, '')
  app.component(componentName, definition.default)
})

app.use(router)

app.mount('#app')
