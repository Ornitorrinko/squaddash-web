import Squads from './Squads'
import SquadRegister from './SquadRegister'
import SquadEdit from './SquadEdit'
let route = [
  {
    path: '/squads',
    component: Squads
  },
  {
    path: '/squads/cadastro',
    component: SquadRegister
  },
  {
    path: '/squads/editar/:id',
    component: SquadEdit
  }
]
export default route
