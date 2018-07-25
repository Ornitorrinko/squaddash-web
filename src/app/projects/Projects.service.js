import http from 'axios'

export default {
  createProject (project) {
    return http.post('/projects', project)
  },
  getAllProjects () {
    return http.get('/projects')
  }
}
