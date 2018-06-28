import React from 'react';
import { Clientes } from '../../app/clientes/Clientes'
import { Header } from '../../components/header/Header'

export default class ClientesRoute extends React.Component {
  render() {
    return (
      <div>
        <Header route={this.props} currentPage={'clientes'} />
        <Clientes route={this.props} />
      </div>
    )
  }
}