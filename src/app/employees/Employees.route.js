import Employees from './Employees'
import EmployeesRegister from './EmployeesRegister'
import EmployeesEdit from './EmployeesEdit'
let route = [
  {
    path: '/funcionarios',
    component: Employees
  },
  {
    path: '/funcionarios/cadastro',
    component: EmployeesRegister
  },
  {
    path: '/funcionarios/editar/:id',
    component: EmployeesEdit
  }
]
export default route
