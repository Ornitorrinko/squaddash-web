import service from './Users.service'
import Utils from '../../utils/index'
const state = {
  allUsers: [],
  selectedUser: {
    id: 1,
    name: 'Mateus Costa',
    email: 'mateus@ornito.com.br',
    profile_photo: 'http://res.cloudinary.com/ornito-media/image/upload/v1531948013/squaddash/lor77kbxdgsmkwrtypdq.jpg',
    senha: 123456,
    status: true,
    role: 'admin',
    created_at: '2018-05-09 00:00:00',
    updated_at: '2018-05-09 00:00:00'
  },
  messageClass: '',
  message: '',
  title: ''
}
const mutations = {
  'LOGIN_SUCCESS' (state, {result}) {
    Utils.localstorage.set('token', result.token)
    Utils.localstorage.set('time', new Date().getTime())
    Utils.localstorage.set('user', result.user)
  },
  'LOGIN_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'CREATE_USER_SUCCESS' (state) {
    state.message = 'Usuário criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_USER_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  }
}
const actions = {
  async login ({commit}, user) {
    commit('LOADING')
    let response = await service.login(user)
    if (response.data.user && response.data.token) {
      let result = response.data
      commit('LOADING')
      commit('LOGIN_SUCCESS', {result})
    } else {
      commit('LOADING')
      commit('LOGIN_FAIL', {response})
    }
  },
  async createUser ({commit}, user) {
    commit('LOADING')
    user.status = true
    user.updated_at = user.created_at = Date.now()
    let response = await service.createUser(user)
    if (response.data.id) {
      commit('LOADING')
      commit('CREATE_USER_SUCCESS')
    } else {
      commit('LOADING')
      commit('CREATE_USER_FAIL', {response})
    }
  }
}
export default {
  state,
  mutations,
  actions
}
