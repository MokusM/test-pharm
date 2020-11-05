import Vue from 'vue'
import App from './App.vue'
import VueTinder from 'vue-tinder'

Vue.config.productionTip = false

Vue.use(VueTinder)

new Vue({
  render: h => h(App)
}).$mount('#app')
