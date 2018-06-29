import React from "react";
import './Login.css'
import logo from '../../squaddash-logo.png' ;
export class Login extends React.Component {
  render() {
    return (
      <section className='section'>
        <div className='container'>
          <img src={logo} className='login-logo'/>
          <div className="tile is-parent is-vertical login-box">
            <article className="tile is-child">
              <p className="subtitle has-text-centered">Login</p>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" placeholder="exemplo@dominio.com.br"/>
                </div>
              </div>
              <div className="field">
                <label className="label">Senha</label>
                <div className="control">
                  <input className="input" type="password" placeholder="mínimo 6 caractéres" minLength='6'/>
                </div>
              </div>
              <div className="columns">
                <div className='column is-9'>
                  <a className='links'> Cadastrar-se </a>
                </div>
                <div className='column is-3 esqueceu-a-senha'>
                  <a className='links'> Esqueceu a senha </a>
                </div>
              </div>
              <div className="control">
                <button className="button is-info btn-full">Entrar</button>
              </div>
            </article>
          </div>
        </div>
      </section>
    );
  }
}