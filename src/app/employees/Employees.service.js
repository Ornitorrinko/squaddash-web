import http from 'axios'

export default {
  createEmployee (employee) {
    return http.post('/employees', employee)
  },
  editEmployee (employee) {
    return http.put(`/employees/${employee.id}`, employee)
  },
  deleteEmployee (employee) {
    return http.put(`/employees/${employee.id}`, employee)
  },
  getAllEmployees () {
    return http.get('/employees')
  },
  getEmployeeById (id) {
    return http.get(`/employees/${id}`)
  }
}
