import React from 'react';
import { EditarPerfil } from '../../app/usuarios/EditarPerfil'

export default class EditarPerfilRoute extends React.Component {
  render() {
    return (
      <EditarPerfil route={this.props} />
    )
  }
}