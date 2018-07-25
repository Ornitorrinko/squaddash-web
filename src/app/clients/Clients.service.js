import http from 'axios'

export default {
  createClient (client) {
    return http.post('/clients', client)
  },
  getAllClients () {
    return http.get('/clients')
  }
}
