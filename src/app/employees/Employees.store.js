import service from './Employees.service'
const state = {
  allEmployees: [],
  selectedEmployee: {},
  messageClass: '',
  message: '',
  title: ''
}
const mutations = {
  'CREATE_EMPLOYEE_SUCCESS' (state) {
    state.message = 'Funcionário criado com sucesso'
    state.messageClass = 'success'
  },
  'CREATE_EMPLOYEE_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_ALL_EMPLOYEES_SUCCESS' (state, {employees}) {
    state.allEmployees = employees
  }
}
const actions = {
  async createEmployees ({commit}, employee) {
    commit('LOADING')
    employee.status = true
    employee.updated_at = employee.created_at = Date.now()
    let response = await service.createEmployees(employee)
    if (response.data.id) {
      commit('LOADING')
      commit('CREATE_EMPLOYEE_SUCCESS')
    } else {
      commit('LOADING')
      commit('CREATE_EMPLOYEE_FAIL', {response})
    }
  },
  async getAllEmployees ({commit}) {
    let response = await service.getAllEmployees()
    let employees = response.data
    if (employees.length > 0) {
      commit('GET_ALL_EMPLOYEES_SUCCESS', {employees})
    } else {
      commit('GET_ALL_EMPLOYEES_FAIL')
    }
  }
}
export default {
  state,
  mutations,
  actions
}
