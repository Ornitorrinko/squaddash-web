import service from './Projects.service'
const state = {
  allProjects: [],
  selectedProject: {},
  messageClass: '',
  message: '',
  title: ''
}
const mutations = {
  'CREATE_PROJECT_SUCCESS' (state) {
    state.message = 'Usuário criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_PROJECT_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_ALL_PROJECTS_SUCCESS' (state, {projects}) {
    state.allProjects = projects
  }
}
const actions = {
  async createProject ({commit}, project) {
    commit('LOADING')
    project.status = true
    project.updated_at = project.created_at = Date.now()
    let response = await service.createProject(project)
    if (response.data.id) {
      commit('LOADING')
      commit('CREATE_PROJECT_SUCCESS')
    } else {
      commit('LOADING')
      commit('CREATE_PROEJCT_FAIL', {response})
    }
  },
  async getAllProjects ({commit}) {
    let response = await service.getAllProjects()
    let projects = response.data
    if (projects.length > 0) {
      commit('GET_ALL_PROJECTS_SUCCESS', {projects})
    } else {
      commit('GET_ALL_PROJECTS_FAIL')
    }
  }
}
export default {
  state,
  mutations,
  actions
}
