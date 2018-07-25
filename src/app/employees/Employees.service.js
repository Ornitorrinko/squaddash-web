import http from 'axios'

export default {
  createEmployee (employee) {
    return http.post('/employees', employee)
  },
  getAllEmployees () {
    return http.get('/employees')
  }
}
