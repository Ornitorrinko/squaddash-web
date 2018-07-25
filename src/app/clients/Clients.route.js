import Clients from './Clients'
import ClientsRegister from './ClientsRegister'
import ClientsEdit from './ClientsEdit'
let route = [
  {
    path: '/clientes',
    component: Clients
  },
  {
    path: '/clientes/cadastro',
    component: ClientsRegister
  },
  {
    path: '/clientes/editar/:id',
    component: ClientsEdit
  }
]
export default route
