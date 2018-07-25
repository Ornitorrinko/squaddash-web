import Squads from './Squads'
import SquadsRegister from './SquadsRegister'
import SquadsEdit from './SquadsEdit'
let route = [
  {
    path: '/squads',
    component: Squads
  },
  {
    path: '/squads/cadastro',
    component: SquadsRegister
  },
  {
    path: '/squads/editar/:id',
    component: SquadsEdit
  }
]
export default route
