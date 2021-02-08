import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import RadDataForm from 'nativescript-ui-dataform/vue'


if (TNS_ENV !== 'production')
{
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
Vue.config.suppressRenderLogs = true

Vue.use(RadDataForm);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
