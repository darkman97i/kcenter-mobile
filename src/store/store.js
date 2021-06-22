import { createStore } from 'vuex';
import language from "@/store/modules/language";

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    language
  }
});

export default store;
