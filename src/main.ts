import App from './App.vue';
import router from './router';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

import '@/assets/styles/index.css';
import 'uno.css';

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);

app.mount('#app');
