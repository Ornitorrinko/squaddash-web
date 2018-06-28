import React from 'react';
import { Projetos } from '../../app/projetos/Projetos'
import { Header } from '../../components/header/Header'

export default class SquadsRoute extends React.Component {
  render() {
    return (
      <div>
        <Header route={this.props} currentPage={'projetos'} />
        <Projetos route={this.props} />
      </div>
    )
  }
}