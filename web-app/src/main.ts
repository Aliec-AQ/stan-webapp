import { createApp } from 'vue';
import App from './App.vue';
import { Toast } from "@/composables/toast.js";
import router from './router.js';
import '@/assets/styles.css'
import { i18n } from '@/i18n';
import { clickOutside } from './directives/clickOutside';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const piniaInstance = createPinia();
piniaInstance.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router);
app.use(Toast, {position: 'bottom-right'});
app.use(piniaInstance);
app.use(i18n);
app.directive('click-outside', clickOutside);
app.mount('#app');