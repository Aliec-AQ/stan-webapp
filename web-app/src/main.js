import { createApp } from 'vue';
import App from './App.vue';
import { Toast } from "@/composables/toast.js";
import router from './router.js';
import pinia from '@/plugins/pinia-persist.js';
import '@/assets/styles.css'
import { i18n } from '@/i18n';
import { clickOutside } from './directives/clickOutside';

const app = createApp(App);
app.use(router);
app.use(Toast, {position: 'bottom-right'});
app.use(pinia);
app.use(i18n);
app.directive('click-outside', clickOutside);
app.mount('#app');