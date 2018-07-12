const set = function (label, obj) {
  window.localStorage.setItem(label, JSON.stringify(obj))
}

const get = function (label) {
  const string = window.localStorage.getItem(label)
  return JSON.parse(string)
}

const remove = function (label) {
  window.localStorage.removeItem(label)
}

const clear = function () {
  window.localStorage.clear()
}

export default {
  set,
  get,
  remove,
  clear
}
