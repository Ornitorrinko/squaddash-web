import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Login } from '../app/login/Login'
import DashboardRoute from './dashboard/dashboard.route'
import ProjetosRoute from './projetos/projetos.route'
import SquadsRoute from './squads/squads.route'
import ClientesRoute from './clientes/clientes.route'
import FuncionariosRoute from './funcionarios/funcionarios.route'
import CadastroPerfilRoute from './usuarios/cadastroperfil.route'
import EditarPerfilRoute from './usuarios/editarperfil.route'
export default class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={props => <DashboardRoute {...props}/>}/>
          <Route path='/projetos' exact render={props => <ProjetosRoute {...props}/>}/>
          <Route path='/squads' exact render={props => <SquadsRoute {...props}/>}/>
          <Route path='/clientes' exact render={props => <ClientesRoute {...props}/>}/>
          <Route path='/funcionarios' exact render={props => <FuncionariosRoute {...props}/>}/>
          <Route path='/usuarios/cadastro' exact render={props => <CadastroPerfilRoute {...props}/>}/>
          <Route path='/usuarios/editar/:id' exact render={props => <EditarPerfilRoute {...props}/>}/>
          <Route path='/login' exact render={props => <Login {...props} />}/>
          <Redirect from='**' to='/'/>
        </Switch>
      </BrowserRouter>
    );
  }
}
