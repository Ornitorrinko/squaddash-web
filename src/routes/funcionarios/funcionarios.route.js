import React from 'react';
import { Funcionarios } from '../../app/funcionarios/Funcionarios'
import { Header } from '../../components/header/Header'

export default class FuncionariosRoute extends React.Component {
  render() {
    return (
      <div>
        <Header route={this.props} currentPage={'funcionarios'} />
        <Funcionarios route={this.props} />
      </div>
    )
  }
}