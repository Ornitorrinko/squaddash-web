import Vue from 'vue'
import moment from 'moment'

Vue.filter('brDate', value => {
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
  let currency = parseFloat(value.toString()).toFixed(2)
  return `R$ ${currency}`
})
