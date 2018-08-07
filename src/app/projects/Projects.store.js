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
    state.message = 'Projeto criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_PROJECT_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'EDIT_PROJECT_SUCCESS' (state) {
    state.message = 'Projeto alterado com sucesso'
    state.messageClass = 'success'
  },
  'EDIT_PROJECT_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'DELETE_PROJECT_SUCCESS' (state) {
    state.message = 'Projeto excluido com sucesso'
    state.messageClass = 'success'
  },
  'DELETE_PROJECT_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_ALL_PROJECTS_SUCCESS' (state, {projects}) {
    state.allProjects = projects
  },
  'GET_ALL_PROJECTS_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_PROJECT_BY_ID_SUCCESS' (state, {project}) {
    state.selectedProject = project
  },
  'GET_PROJECT_BY_ID_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  }
}
const actions = {
  async createProject ({commit}, project) {
    commit('LOADING')
    project.status = true
    project.deleted = false
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
  async editProject ({commit}, project) {
    commit('LOADING')
    project.updated_at = Date.now()
    let response = await service.editProject(project)
    if (response.data.id) {
      commit('LOADING')
      commit('EDIT_PROJECT_SUCCESS')
    } else {
      commit('LOADING')
      commit('EDIT_PROEJCT_FAIL', {response})
    }
  },
  async deleteProject ({commit}, project) {
    commit('LOADING')
    project.updated_at = Date.now()
    let response = await service.deleteProject(project)
    if (response.data.id) {
      commit('LOADING')
      commit('DELETE_PROJECT_SUCCESS')
    } else {
      commit('LOADING')
      commit('DELETE_PROEJCT_FAIL', {response})
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
  },
  async getProjectById ({commit}, id) {
    let response = await service.getProjectById(id)
    let project = response.data
    if (project.id) {
      commit('GET_PROJECT_BY_ID_SUCCESS', {project})
    } else {
      commit('GET_PROJECT_BY_ID_FAIL', {response})
    }
  }
}
export default {
  state,
  mutations,
  actions
}
