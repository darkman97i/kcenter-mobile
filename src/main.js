import { createApp } from "vue";
import App from './App.vue'
import router from '@/router/router';
import store from '@/store/store';

import { IonicVue } from '@ionic/vue';

// Plugins
import WsPlugin from '@/plugin/ws-plugin';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import '@/theme/variables.css';

/* OpenKM css */
import '@/assets/okm.css';

// Above the createApp() line
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

// Force material design
// https://ionicframework.com/docs/vue/config
// Platform styles information https://ionicframework.com/docs/theming/platform-styles
const app = createApp(App)
  .use(IonicVue, {
    mode: 'md'
  })
  .use(router)
  .use(WsPlugin)
  .use(store);

router.isReady().then(() => {
  app.mount('#app');

  // Check access after application mounted
  const ws = app.config.globalProperties.$ws;
  console.log('main.js works -> ' + ws);
});
