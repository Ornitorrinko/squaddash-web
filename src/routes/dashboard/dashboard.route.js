import React from 'react';
import { Dashboard } from '../../app/dashboard/Dashboard'
import { Header } from '../../components/header/Header'

export default class DashboardRoute extends React.Component {
    render() {
      return (
        <div>
          <Header route={this.props} currentPage={'dashboard'} />
          <Dashboard route={this.props} />
        </div>
      )
    }
}