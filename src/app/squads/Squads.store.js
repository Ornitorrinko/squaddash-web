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
    state.message = 'Squad criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_SQUAD_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'EDIT_SQUAD_SUCCESS' (state) {
    state.message = 'Squad alterado com sucesso'
    state.messageClass = 'success'
  },
  'EDIT_SQUAD_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'DELETE_SQUAD_SUCCESS' (state) {
    state.message = 'Squad excluido com sucesso'
    state.messageClass = 'success'
  },
  'DELETE_SQUAD_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_ALL_SQUADS_SUCCESS' (state, {squads}) {
    state.allSquads = squads
  },
  'GET_SQUAD_BY_ID_SUCCESS' (state, {squad}) {
    state.selectedSquad = squad
  },
  'GET_SQUAD_BY_ID_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
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
  async editSquad ({commit}, squad) {
    commit('LOADING')
    squad.updated_at = Date.now()
    let response = await service.editSquad(squad)
    if (response.data.id) {
      commit('LOADING')
      commit('EDIT_SQUAD_SUCCESS')
    } else {
      commit('LOADING')
      commit('EDIT_SQUAD_FAIL', {response})
    }
  },
  async deleteSquad ({commit}, squad) {
    commit('LOADING')
    squad.updated_at = Date.now()
    let response = await service.deleteSquad(squad)
    if (response.data.id) {
      commit('LOADING')
      commit('DELETE_SQUAD_SUCCESS')
    } else {
      commit('LOADING')
      commit('DELETE_SQUAD_FAIL', {response})
    }
  },
  async getAllSquads ({commit}) {
    let response = await service.getAllSquads()
    let squads = response.data
    commit('GET_ALL_SQUADS_SUCCESS', {squads})
  },
  async getSquadById ({commit}, id) {
    let response = await service.getSquadById(id)
    let squad = response.data
    if (squad.id) {
      commit('GET_SQUAD_BY_ID_SUCCESS', {squad})
    } else {
      commit('GET_SQUAD_BY_ID_FAIL', {response})
    }
  }
}
export default {
  state,
  mutations,
  actions
}
