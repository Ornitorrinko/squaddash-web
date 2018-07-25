import Projects from './Projects'
import ProjectRegister from './ProjectRegister'
import ProjectEdit from './ProjectEdit'
let route = [
  {
    path: '/projetos',
    component: Projects
  },
  {
    path: '/projetos/cadastro',
    component: ProjectRegister
  },
  {
    path: '/projetos/editar/:id',
    component: ProjectEdit
  }
]
export default route
