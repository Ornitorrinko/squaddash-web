import http from 'axios'

export default {
  createSquad (squad) {
    return http.post('/squads', squad)
  },
  editSquad (squad) {
    return http.put(`/squads/${squad.id}`, squad)
  },
  deleteSquad (squad) {
    return http.put(`/squads/${squad.id}`, squad)
  },
  getAllSquads () {
    return http.get('/squads')
  },
  getSquadById (id) {
    return http.get(`/squads/${id}`)
  }
}
