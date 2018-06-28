import React from 'react';
import { CadastroPerfil } from '../../app/usuarios/CadastroPerfil'

export default class CadastroPerfilRoute extends React.Component {
  render() {
    return (
      <CadastroPerfil route={this.props} />
    )
  }
}