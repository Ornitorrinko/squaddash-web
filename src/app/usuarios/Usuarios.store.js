import service from './Usuarios.service'
const state = {
  allUsuarios: [],
  selectedUsuario: {},
  messageClass: '',
  message: '',
  title: ''
}
const mutations = {
  'CREATE_USUARIO_SUCCESS' (state) {
    state.message = 'Usuário criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_USUARIO_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  }
}
const actions = {
  async createUsuario ({commit}, usuario) {
    commit('LOADING')
    usuario.status = true
    usuario.updated_at = usuario.created_at = Date.now()
    let response = await service.createUsuario(usuario)
    if (response.data.id) {
      commit('LOADING')
      commit('CREATE_USUARIO_SUCCESS')
    } else {
      commit('LOADING')
      commit('CREATE_USUARIO_FAIL', {response})
    }
  }
}
export default {
  state,
  mutations,
  actions
}
