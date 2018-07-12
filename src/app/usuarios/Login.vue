<template lang='pug'>
.login
  .container.halfWidth
    .login-logo
      img(src='../../assets/SquadDash-logo.png')
    .card.has-text-centered.card-login
      .card-header-login
        h1.subtitle Login
      .card-content.has-text-left
        .content
          form.login-form
            .field
              label.label Email:
              .control
                input.input(type="text" placeholder="exemplo@dominio.com.br")
            .field
              label.label Senha:
              .control
                input.input(type="password" placeholder="mínimo 6 caractéres")
            .field
              .columns
                .column
                  a.link Cadastrar-se
                .column.has-text-right
                  a.link Recuperar senha
            .field
              button.button.is-info.fullWidth Entrar
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.login {
  margin-top: 5%;
  .login-logo {
    width: 30%;
  }
  .card-header-login {
    padding-top: 15px;
  }
  .card-login {
    border-radius: 10px;
    border: 1px solid #01BCA2;
  }
}
</style>
