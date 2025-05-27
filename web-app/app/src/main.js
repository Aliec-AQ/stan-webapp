import { createApp } from 'vue';
import App from './App.vue';
import { VueQueryPlugin, Toast } from "component-library";
import router from './router.js';
import '@/assets/styles.css'
import { clickOutside } from './directives/clickOutside';

console.log('App is starting...');

const app = createApp(App);
app.use(router);
app.use(VueQueryPlugin);
app.use(Toast, {position: 'bottom-right'});
app.directive('click-outside', clickOutside);
app.mount('#app');

console.log('App mounted successfully!');