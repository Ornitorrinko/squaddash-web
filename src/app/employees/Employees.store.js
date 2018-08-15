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
  'EDIT_EMPLOYEE_SUCCESS' (state) {
    state.message = 'Funcionário alterado com sucesso'
    state.messageClass = 'success'
  },
  'EDIT_EMPLOYEE_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'DELETE_EMPLOYEE_SUCCESS' (state) {
    state.message = 'Funcionário excluido com sucesso'
    state.messageClass = 'success'
  },
  'DELETE_EMPLOYEE_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  },
  'GET_ALL_EMPLOYEES_SUCCESS' (state, {employees}) {
    state.allEmployees = employees
  },
  'GET_EMPLOYEE_BY_ID_SUCCESS' (state, {employee}) {
    state.selectedEmployee = employee
  },
  'GET_EMPLOYEE_BY_ID_FAIL' (state, {response}) {
    console.log('Deu erro', response)
    state.message = 'Algo de errado não deu certo'
    state.messageClass = 'danger'
  }
}
const actions = {
  async createEmployee ({commit}, employee) {
    commit('LOADING')
    employee.status = true
    employee.deleted = false
    employee.updated_at = employee.created_at = Date.now()
    let response = await service.createEmployee(employee)
    if (response.data.id) {
      commit('LOADING')
      commit('CREATE_EMPLOYEE_SUCCESS')
    } else {
      commit('LOADING')
      commit('CREATE_EMPLOYEE_FAIL', {response})
    }
  },
  async editEmployee ({commit}, employee) {
    commit('LOADING')
    employee.updated_at = Date.now()
    let response = await service.editEmployee(employee)
    if (response.data.id) {
      commit('LOADING')
      commit('EDIT_EMPLOYEE_SUCCESS')
    } else {
      commit('LOADING')
      commit('EDIT_EMPLOYEE_FAIL', {response})
    }
  },
  async deleteEmployee ({commit}, employee) {
    commit('LOADING')
    employee.updated_at = Date.now()
    let response = await service.deleteEmployee(employee)
    if (response.data.id) {
      commit('LOADING')
      commit('DELETE_EMPLOYEE_SUCCESS')
    } else {
      commit('LOADING')
      commit('DELETE_EMPLOYEE_FAIL', {response})
    }
  },
  async getAllEmployees ({commit}) {
    let response = await service.getAllEmployees()
    let employees = response.data
    commit('GET_ALL_EMPLOYEES_SUCCESS', {employees})
  },
  async getEmployeeById ({commit}, id) {
    let response = await service.getEmployeeById(id)
    let employee = response.data
    if (employee.id) {
      commit('GET_EMPLOYEE_BY_ID_SUCCESS', {employee})
    } else {
      commit('GET_EMPLOYEE_BY_ID_FAIL', {response})
    }
  }
}
export default {
  state,
  mutations,
  actions
}
