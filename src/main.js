import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

const components = require.context(
  '@/components',
  true,
  /pl-[a-z0-9-]*.(vue|js)$/
);

components.keys().forEach(fileName => {
  const componentConfig = components(fileName);
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')

  app.component(
    componentName,
    componentConfig.default || componentConfig
  );
});

app.component('vue-datepicker', Datepicker);

// Object.entries(components).forEach(([path, definition]) => {
//   const componentName = path.split('/').pop().replace(/\.\w+$/, '')
//   console.log(components)
//   app.component(componentName, definition.default)
// })

app.use(store).use(router).mount('#app')
