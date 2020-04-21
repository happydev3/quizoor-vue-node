
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';

import layout from './layout.module'
import auth from './auth.module'
import admin from './admin.module'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export default new Vuex.Store({
    modules: {
      layout,
      auth,
      admin
    },
    strict: debug,
    plugins
})
