import Employees from './Employees'
import EmployeeRegister from './EmployeeRegister'
import EmployeeEdit from './EmployeeEdit'
let route = [
  {
    path: '/funcionarios',
    component: Employees
  },
  {
    path: '/funcionarios/cadastro',
    component: EmployeeRegister
  },
  {
    path: '/funcionarios/editar/:id',
    component: EmployeeEdit
  }
]
export default route
