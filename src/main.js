import { createApp } from 'vue'
import App from './App.vue'
import {adapt, adapt2} from "@/assets/js/adaptSum.js";
import pkg from "./../package.json";
import pkg2 from "./../package2.json";
import router from '/src/router/index.js'
import { createPinia } from 'pinia'
import "element-plus/dist/index.css";
import 'animate.css';
import '@/assets/style/common.scss'
import ElementPlus from 'element-plus';
const app = createApp(App);
const pinia = createPinia();
import ElementIcons from '@/plugins/svgicon';
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(ElementIcons);
app.mount('#app');

adapt(pkg, App);