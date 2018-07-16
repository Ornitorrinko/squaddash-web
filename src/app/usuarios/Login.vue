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
                input.input(type="email" placeholder="exemplo@dominio.com.br", v-model='user.email')
            .field
              label.label Senha:
              .control
                input.input(type="password" placeholder="mínimo 6 caractéres", v-model='user.password')
            .field
              .columns
                .column
                  a.link(@click='openCadastro()') Cadastrar-se
                .column.has-text-right
                  a.link(@click='openModal()') Recuperar senha
            .field
              button.button.is-info.fullWidth(@click='login(user)') Entrar
  .modal(v-bind:class='{"is-active": showModal}')
    .modal-background(@click='closeModal()')
    .modal-card
      header.modal-card-head
        p.modal-card-title Recuperar Senha
        button.delete(aria-label='close', @click='closeModal()')
      section.modal-card-body
        form.login-form
            .field
              label.label Email:
              .control
                input.input(type="text" placeholder="exemplo@dominio.com.br", v-model='email')
      footer.modal-card-foot
        button.button.is-success(@click='recuperarSenha(email)') Enviar
        button.button(@click='closeModal()') Cancelar
</template>

<script>
export default {
  data () {
    return {
      showModal: false,
      email: '',
      user: {}
    }
  },
  methods: {
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    openCadastro () {
      this.$router.push('/cadastro')
    },
    login () {
      console.log('login')
    }
  }
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
