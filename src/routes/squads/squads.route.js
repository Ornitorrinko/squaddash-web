import React from 'react';
import { Squads } from '../../app/squads/Squads'
import { Header } from '../../components/header/Header'

export default class SquadsRoute extends React.Component {
  render() {
    return (
      <div>
        <Header route={this.props} currentPage={'Squads'} />
        <Squads route={this.props} />
      </div>
    )
  }
}