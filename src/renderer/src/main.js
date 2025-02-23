import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { install as VueMonacoEditorPlugin } from '@guolao/vue-monaco-editor';
import DropdownMenu from 'v-dropdown-menu'

const pinia = createPinia()
const app = createApp(App)

app.use(DropdownMenu)
app.use(pinia)
// app.use(VueMonacoEditorPlugin, {
//     paths: {
//       // Point to the local Monaco files
//       vs: "/vs",
//     },
//   });
app.mount('#app')
