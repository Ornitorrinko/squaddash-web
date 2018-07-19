import http from 'axios'
export default {
  login (usuario) {
    return http.post('/user/auth', usuario)
  },
  createUser (usuario) {
    return http.post('/user', usuario)
  }
}
