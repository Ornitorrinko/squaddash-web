import Projects from './Projects'
import ProjectsRegister from './ProjectsRegister'
import ProjectsEdit from './ProjectsEdit'
let route = [
  {
    path: '/projetos',
    component: Projects
  },
  {
    path: '/projetos/cadastro',
    component: ProjectsRegister
  },
  {
    path: '/projetos/editar/:id',
    component: ProjectsEdit
  }
]
export default route
