import service from './Squads.service'
const state = {
  allSquads: [],
  selectedSquad: {},
  messageClass: '',
  message: '',
  title: ''
}
const mutations = {
  'CREATE_SQUAD_SUCCESS' (state) {
    state.message = 'Usuário criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_SQUAD_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_ALL_SQUADS_SUCCESS' (state, {squads}) {
    state.allSquads = squads
  }
}
const actions = {
  async createSquad ({commit}, squad) {
    commit('LOADING')
    squad.status = true
    squad.updated_at = squad.created_at = Date.now()
    let response = await service.createSquad(squad)
    if (response.data.id) {
      commit('LOADING')
      commit('CREATE_SQUAD_SUCCESS')
    } else {
      commit('LOADING')
      commit('CREATE_SQUAD_FAIL', {response})
    }
  },
  async getAllSquads ({commit}) {
    let response = await service.getAllSquads()
    let squads = response.data
    if (squads.length > 0) {
      commit('GET_ALL_SQUADS_SUCCESS', {squads})
    } else {
      commit('GET_ALL_SQUADS_FAIL')
    }
  }
}
export default {
  state,
  mutations,
  actions
}
