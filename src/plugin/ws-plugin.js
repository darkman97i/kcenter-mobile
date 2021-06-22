import OKMWebservice from '@/ws/okm-webservice.js';

const Plugin = {
  // The install method will be called with the Vue constructor as the first argument, along with possible options
  install(app) {
    const ws = new OKMWebservice();
    app.config.globalProperties.$ws = ws;
    app.provide('ws', ws);
  }
};

export default Plugin;
