import React from "react";

const token = window.localStorage.getItem('token')
export class Dashboard extends React.Component {
  verifyRoute() {
    if(!token) {
      this.props.route.history.push('/login')
    }
  }
  componentWillMount() {
    this.verifyRoute()
  }
  render() {
    return (
      <h1>Dashboard</h1>
    );
  }
}