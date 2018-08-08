import service from './Clients.service'
const state = {
  allClients: [],
  selectedClient: {},
  messageClass: '',
  message: '',
  title: ''
}
const mutations = {
  'CREATE_CLIENT_SUCCESS' (state) {
    state.message = 'Cliente criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_CLIENT_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'EDIT_CLIENT_SUCCESS' (state) {
    state.message = 'Cliente alterado com sucesso'
    state.messageClass = 'success'
  },
  'EDIT_CLIENT_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'DELETE_CLIENT_SUCCESS' (state) {
    state.message = 'Cliente excluido com sucesso'
    state.messageClass = 'success'
  },
  'DELETE_CLIENT_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_ALL_CLIENTS_SUCCESS' (state, {clients}) {
    state.allClients = clients
  },
  'GET_CLIENT_BY_ID_SUCCESS' (state, {client}) {
    state.selectedClient = client
  },
  'GET_CLIENT_BY_ID_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  }
}
const actions = {
  async createClient ({commit}, client) {
    commit('LOADING')
    client.status = true
    client.updated_at = client.created_at = Date.now()
    let response = await service.createClient(client)
    if (response.data.id) {
      commit('LOADING')
      commit('CREATE_CLIENT_SUCCESS')
    } else {
      commit('LOADING')
      commit('CREATE_CLIENT_FAIL', {response})
    }
  },
  async editClient ({commit}, client) {
    commit('LOADING')
    client.updated_at = Date.now()
    let response = await service.editClient(client)
    if (response.data.id) {
      commit('LOADING')
      commit('EDIT_CLIENT_SUCCESS')
    } else {
      commit('LOADING')
      commit('EDIT_CLIENT_FAIL', {response})
    }
  },
  async deleteClient ({commit}, client) {
    commit('LOADING')
    client.updated_at = Date.now()
    let response = await service.deleteClient(client)
    if (response.data.id) {
      commit('LOADING')
      commit('DELETE_PROJECT_SUCCESS')
    } else {
      commit('LOADING')
      commit('DELETE_PROEJCT_FAIL', {response})
    }
  },
  async getAllClients ({commit}) {
    let response = await service.getAllClients()
    let clients = response.data
    if (clients.length > 0) {
      commit('GET_ALL_CLIENTS_SUCCESS', {clients})
    } else {
      commit('GET_ALL_CLIENTS_FAIL')
    }
  },
  async getClientById ({commit}, id) {
    let response = await service.getClientById(id)
    let client = response.data
    if (client.id) {
      commit('GET_CLIENT_BY_ID_SUCCESS', {client})
    } else {
      commit('GET_CLIENT_BY_ID_FAIL', {response})
    }
  }
}
export default {
  state,
  mutations,
  actions
}
