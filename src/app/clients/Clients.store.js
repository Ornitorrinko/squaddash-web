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
    state.message = 'Usuário criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_CLIENT_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_ALL_CLIENTS_SUCCESS' (state, {clients}) {
    state.allClients = clients
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
  async getAllClients ({commit}) {
    let response = await service.getAllClients()
    let clients = response.data
    if (clients.length > 0) {
      commit('GET_ALL_CLIENTS_SUCCESS', {clients})
    } else {
      commit('GET_ALL_CLIENTS_FAIL')
    }
  }
}
export default {
  state,
  mutations,
  actions
}
