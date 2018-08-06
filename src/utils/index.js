const localstorage = {
  set: (label, obj) => {
    window.localStorage.setItem(label, JSON.stringify(obj))
  },
  get: (label) => {
    let string = window.localStorage.getItem(label)
    return JSON.parse(string)
  },
  remove: (label) => {
    window.localStorage.removeItem(label)
  },
  clear: () => {
    window.localStorage.clear()
  }
}
const searchTable = () => {
  var input, filter, table, tr, td, i
  input = document.getElementById('search')
  filter = input.value.toUpperCase()
  table = document.getElementById('table')
  tr = table.getElementsByTagName('tr')
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName('td')[0]
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = ''
      } else {
        tr[i].style.display = 'none'
      }
    }
  }
}
export default {
  localstorage,
  searchTable
}
