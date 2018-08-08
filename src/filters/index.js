import Vue from 'vue'
import moment from 'moment'

Vue.filter('brDate', value => {
  moment.locale('pt-br')
  return moment(value).format('L')
})
Vue.filter('uppercase', value => {
  return value.toUpperCase()
})
Vue.filter('lowercase', value => {
  return value.toLowerCase()
})
Vue.filter('boolFormat', (value, caseTrue, caseFalse) => {
  return value ? caseTrue : caseFalse
})
Vue.filter('brCurrency', (value) => {
  let currency = value ? parseFloat(value.toString()).toFixed(2) : 0.00
  return `R$ ${currency}`
})
Vue.filter('cnpj', (value) => {
  return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
})
