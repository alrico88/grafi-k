import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { registerSW } from 'virtual:pwa-register';
import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import offlineExporting from 'highcharts/modules/offline-exporting';
import HighchartsVue from 'highcharts-vue';
import App from './App.vue';
import './assets/main.scss';
import es from './i18n/locales/es';
import en from './i18n/locales/en';
import { getBestLanguage } from './i18n/locale';

const i18n = createI18n({
  legacy: false,
  locale: getBestLanguage(),
  fallbackLocale: 'en',
  messages: {
    es,
    en,
  },
});

exporting(Highcharts);
offlineExporting(Highcharts);

const app = createApp(App);

app.use(HighchartsVue);
app.use(createPinia());
app.use(i18n);
app.mount('#app');

const updateSW = registerSW({
  onOfflineReady() {
    console.log('Ready to work offline');
  },
});
