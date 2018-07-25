import Clients from './Clients'
import ClientRegister from './ClientRegister'
import ClientEdit from './ClientEdit'
let route = [
  {
    path: '/clientes',
    component: Clients
  },
  {
    path: '/clientes/cadastro',
    component: ClientRegister
  },
  {
    path: '/clientes/editar/:id',
    component: ClientEdit
  }
]
export default route
