import http from 'axios'
export default {
  createUsuario (usuario) {
    return http.post('/usuarios', usuario)
  }
}
