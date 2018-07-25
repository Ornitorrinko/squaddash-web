import http from 'axios'

export default {
  createSquad (squad) {
    return http.post('/squads', squad)
  },
  getAllSquads () {
    return http.get('/squads')
  }
}
