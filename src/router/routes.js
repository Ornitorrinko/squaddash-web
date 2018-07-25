import Users from '../app/users/Users.route'
import Dashboard from '../app/dashboard/Dashboard.route'
import Projects from '../app/projects/Projects.route'
import Clients from '../app/clients/Clients.route'
import Employees from '../app/employees/Employees.route'
import Squads from '../app/squads/Squads.route'
let routes = [].concat(
  Users,
  Dashboard,
  Projects,
  Clients,
  Employees,
  Squads
)

export default routes
