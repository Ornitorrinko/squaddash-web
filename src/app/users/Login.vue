<template lang='pug'>
.login
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
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
                input.input(
                  type="email",
                  placeholder="exemplo@dominio.com.br",
                  v-model='user.email',
                  @input='verifyEmailField(user.email)'
                  v-bind:class='{"is-danger": isInvalidEmail.status}',
                  required
                )
                span.has-text-danger(v-if='isInvalidEmail.status') {{isInvalidEmail.error}}
            .field
              label.label Senha:
              .control
                input.input(
                  type="password",
                  placeholder="mínimo 6 caractéres",
                  v-model='user.password'
                  @input='verifyPasswordField(user.password)'
                  v-bind:class='{"is-danger": isInvalidPassword.status}',
                  required
                )
                span.has-text-danger(v-if='isInvalidPassword.status') {{isInvalidPassword.error}}
            .field
              .columns
                .column
                  a.link(@click='openCadastro()') Cadastrar-se
                .column.has-text-right
                  a.link(@click='openModal()') Recuperar senha
            .field
              button.button.is-info.fullWidth(@click='login(user, $event)') Entrar
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
import Notification from '../../components/Notification'
import localstorage from '../../utils/localstorage'
export default {
  components: {
    Notification
  },
  computed: {
    selectedUser () {
      return this.$store.state.Users.selectedUser
    }
  },
  data () {
    return {
      showModal: false,
      email: '',
      user: {},
      notification: {
        title: '',
        message: '',
        type: '',
        open: false
      },
      isInvalidPassword: {status: false, error: ''},
      isInvalidEmail: {status: false, error: ''}
    }
  },
  methods: {
    login (user, event) {
      event.preventDefault()
      if (this.checkForm()) {
        localstorage.set('token', 'token')
        localstorage.set('time', new Date().getTime())
        localstorage.set('user', this.selectedUser)
        this.$router.push('/')
      }
      // this.$store.dispatch('login', user).then(() => {
      //   if (this.selectedUser.id) {
      //     this.$router.push('/')
      //   } else {
      //     this.openNotification('Verifique e tente novamente', 'warning', 'Login ou senha incorretos')
      //   }
      // })
    },
    checkForm () {
      return this.verifyEmailField(this.user.email) && this.verifyPasswordField(this.user.password)
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
    },
    openModal () {
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    openCadastro () {
      this.$router.push('usuarios/cadastro')
    },
    verifyEmailField (userEmail) {
      if (userEmail && !userEmail.match('@')) {
        this.isInvalidEmail.status = true
        this.isInvalidEmail.error = 'Email inválido, está faltando o @'
        return false
      } else if (!userEmail || userEmail.length === 0) {
        this.isInvalidEmail.status = true
        this.isInvalidEmail.error = 'Preencha este campo'
        return false
      } else {
        this.isInvalidEmail.status = false
        return true
      }
    },
    verifyPasswordField (userPassword) {
      if (userPassword && userPassword.length < 6) {
        this.isInvalidPassword.status = true
        this.isInvalidPassword.error = 'A senha deve conter no mínimo 6 caractéres'
        return false
      } else if (!userPassword || userPassword.length === 0) {
        this.isInvalidPassword.status = true
        this.isInvalidPassword.error = 'Preencha este campo'
        return false
      } else {
        this.isInvalidPassword.status = false
        return true
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('setHeader')
  },
  beforeDestroy () {
    this.$store.dispatch('setHeader')
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
