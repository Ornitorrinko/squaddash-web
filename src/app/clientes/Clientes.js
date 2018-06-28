import React from "react";

const token = window.localStorage.getItem('token')
export class Clientes extends React.Component {
  verifyRoute() {
    if (!token) {
      this.props.route.history.push('/login')
    }
  }
  componentWillMount() {
    this.verifyRoute()
  }
  render() {
    return (
      <h1>Clientes</h1>
    );
  }
}