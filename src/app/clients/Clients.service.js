import http from 'axios'

export default {
  createClient (client) {
    return http.post('/clients', client)
  },
  editClient (client) {
    return http.put(`/clients/${client.id}`, client)
  },
  deleteClient (client) {
    return http.put(`/clients/${client.id}`, client)
  },
  getAllClients () {
    return http.get('/clients')
  },
  getClientById (id) {
    return http.get(`/clients/${id}`)
  }
}
