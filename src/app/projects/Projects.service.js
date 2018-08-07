import http from 'axios'

export default {
  createProject (project) {
    return http.post('/projects', project)
  },
  editProject (project) {
    return http.put(`/projects/${project.id}`, project)
  },
  deleteProject (project) {
    return http.put(`/projects/${project.id}`, project)
  },
  getAllProjects () {
    return http.get('/projects')
  },
  getProjectById (id) {
    return http.get(`/projects/${id}`)
  }
}
