import { createApp } from 'vue';
import App from './App.vue';
import { Toast } from "@/composables/toast.js";
import router from './router.js';
import '@/assets/styles.css'
import { clickOutside } from './directives/clickOutside';

const app = createApp(App);
app.use(router);
app.use(Toast, {position: 'bottom-right'});
app.directive('click-outside', clickOutside);
app.mount('#app');