import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { registerSW } from 'virtual:pwa-register';
import * as Highcharts from 'highcharts';
import 'highcharts/modules/exporting';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';
import './assets/main.scss';
import { getBestLanguage } from './i18n/locale';
import { createBootstrap } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

const i18n = createI18n({
  legacy: false,
  locale: getBestLanguage(),
  fallbackLocale: 'en',
});

const app = createApp(App);

app.use(HighchartsVue);
app.use(createPinia());
app.use(i18n);
app.use(createBootstrap());
app.mount('#app');

const updateSW = registerSW({
  onOfflineReady() {
    console.log('Ready to work offline');
  },
});
