


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import VeeValidate, { Validator } from 'vee-validate';
// import Dropdown from 'bp-vuejs-dropdown';
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)
Vue.use(VeeValidate)
Vue.use({ Validator })
// Vue.use(Dropdown)

// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css';


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuesax Admin Filters
import './filters/filters'


//i18n
import i18n from './i18n/i18n';

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
// import { prototype } from 'apexcharts';


// Feather font icon
require('./assets/css/iconfont.css')


Vue.config.productionTip = false;

new Vue({
    router: router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
