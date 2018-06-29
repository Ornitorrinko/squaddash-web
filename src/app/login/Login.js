import React from "react";
import './Login.css'
import logo from '../../squaddash-logo.png' ;
export class Login extends React.Component {
  login(event) {
    event.preventDefault();
    window.localStorage.setItem('token', 'token');
    this.props.history.push('/');
  }
  render() {
    return (
      <section className='section'>
        <div className='container'>
          <img src={logo} className='login-logo'/>
          <div className="tile is-parent is-vertical login-box">
            <article className="tile is-child">
              <p className="subtitle has-text-centered">Login</p>
              <form>
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
                  <input className="button is-info btn-full" value='Entrar' type='submit' onClick={event => this.login(event)}/>
                </div>
              </form>
            </article>
          </div>
        </div>
      </section>
    );
  }
}