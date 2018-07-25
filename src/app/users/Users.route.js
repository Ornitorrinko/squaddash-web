import Login from './Login'
import UserRegister from './UserRegister'
import UserEdit from './UserEdit'
let route = [
  {
    path: '/login',
    component: Login
  },
  {
    path: 'usuario/cadastro',
    component: UserRegister
  },
  {
    path: 'usuario/editar/:id',
    component: UserEdit
  }
]
export default route
