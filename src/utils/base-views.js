import { createApp } from 'vue'

const vueApp = createApp()

const components = import.meta.globEager('../components/*.vue')


Object.entries(components).forEach(([path, definition]) => {
  // Get name of component, based on filename
  // "./components/Fruits.vue" will become "Fruits"
  const componentName = path.split('/').pop().replace(/\.\w+$/, '')
  // Register component on this Vue instance
  vueApp.component(componentName, definition.default)
})

