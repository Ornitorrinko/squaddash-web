<template lang='pug'>
.cadastro-user
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  .container
    h1.title Editar usuário
    .field(v-if='securityPassword !== "ornit0quatro"')
      label.label Senha de segurança:
      .control
        input.input(
          type="password",
          placeholder="É a senha padrão ornito",
          v-model='securityPassword'
          v-bind:class='{"is-danger": securityPassword === "ornit0quatro"}'
        )
        span.has-text-danger(v-if='!securityPassword && securityPassword.length === 0') Preencha este campo
        span.has-text-danger(v-else-if='securityPassword !== "ornit0quatro"') Senha errada
      .control
        a.button.is-light.fullWidth(@click='cancel()') Cancelar
    form.user-form(v-if='securityPassword === "ornit0quatro"')
      .field.columns
        .column.is-3
          label.label Foto de perfil:
          .control
            PhotoUpload(@upload='assignImageInUser', @remove='assignImageInUser')
        .column
          .field.columns
            .column
              label.label Primeiro nome:
              .control
                input#name.input(
                  type="text",
                  placeholder="Fulano",
                  v-model='firstName',
                  @input='verifyNameField(firstName)',
                  v-bind:class='{"is-danger": isInvalidName.status}',
                  required
                )
                span.has-text-danger(v-if='isInvalidName.status') {{isInvalidName.error}}
            .column
              label.label Último nome:
              .control
                input#name.input(
                  type="text",
                  placeholder="Costa",
                  v-model='lastName',
                  @input='verifyNameField(lastName)',
                  v-bind:class='{"is-danger": isInvalidName.status}',
                  required
                )
                span.has-text-danger(v-if='isInvalidName.status') {{isInvalidName.error}}
          .field
            label.label Email:
            .control
              input#email.input(
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
              input#password.input(
                type="password",
                placeholder="mínimo 6 caractéres",
                v-model='user.password',
                @input='verifyPasswordField(user.password)'
                v-bind:class='{"is-danger": isInvalidPassword.status}',
                required
              )
              span.has-text-danger(v-if='isInvalidPassword.status') {{isInvalidPassword.error}}
          .field
            label.label Confirme sua senha:
            .control
              input#confirmPassword.input(
                type="password",
                placeholder="mínimo 6 caractéres",
                v-model='confirmPassword',
                @input='verifyConfirmPasswordField(confirmPassword, user.password)',
                v-bind:class='{"is-danger": isInvalidConfirmPassword.status}',
                required
              )
              span.has-text-danger(v-if='isInvalidConfirmPassword.status') {{isInvalidConfirmPassword.error}}
      .field.is-grouped.is-grouped-right(v-if='!loading')
        p.control
          button.button.is-info(
            @click='createUser(user, $event)',
          ) Salvar
        p.control
          a.button.is-light(@click='cancel()') Cancelar
      .field(v-if='loading')
          a.button.is-info.is-loading.fullWidth

</template>

<script>
import Notification from '../../components/Notification'
import PhotoUpload from '../../components/PhotoUpload'
import localstorage from '../../utils/localstorage'
export default {
  components: {
    Notification,
    PhotoUpload
  },
  computed: {
    messageClass () {
      return this.$store.state.Users.messageClass
    },
    title () {
      return this.$store.state.Users.title
    },
    message () {
      return this.$store.state.Users.message
    },
    loading () {
      return this.$store.state.loading
    },
    image () {
      return this.$store.state.image
    }
  },
  data () {
    return {
      confirmPassword: '',
      securityPassword: '',
      user: {profile_photo: 'http://www.autopostosilvestre.com.br/img/no-photo.jpeg'},
      isInvalidPassword: {status: false, error: ''},
      isInvalidConfirmPassword: {status: false, error: ''},
      isInvalidName: {status: false, error: ''},
      isInvalidEmail: {status: false, error: ''},
      notification: {
        message: '',
        messageClass: '',
        title: '',
        open: false
      },
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    createUser (user, event) {
      event.preventDefault()
      user.role = 'admin'
      user.name = `${this.firstName} ${this.lastName}`
      if (this.checkForm()) {
        this.$store.dispatch('createUser', user).then(() => {
          if (this.messageClass === 'success') {
            this.openNotification(this.message, this.messageClass, this.title)
            setTimeout(() => {
              this.cancel()
            }, 3500)
          }
        })
      }
    },
    cancel () {
      this.$router.push('/login')
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
    },
    assignImageInUser (file, link) {
      this.$store.dispatch('uploadImageToCloudinary', file).then(() => {
        if (typeof this.image === 'string') {
          this.openNotification('Remova a imagem e tente novamente', 'danger', 'Não foi possível fazer o upload')
        } else {
          this.user.profile_photo = this.image.url
        }
      })
    },
    checkForm () {
      return this.verifyNameField(this.firstName) &&
        this.verifyNameField(this.lastName) &&
        this.verifyEmailField(this.user.email) &&
        this.verifyPasswordField(this.user.password) &&
        this.verifyConfirmPasswordField(this.user.password, this.confirmPassword)
    },
    verifyNameField (userName) {
      if (userName && userName.match('[0-9]')) {
        this.isInvalidName.status = true
        this.isInvalidName.error = 'Nome inválido, somente letras'
        return false
      } else if (!userName || userName.length === 0) {
        this.isInvalidName.status = true
        this.isInvalidName.error = 'Preencha este campo'
        return false
      } else {
        this.isInvalidName.status = false
        return true
      }
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
    },
    verifyConfirmPasswordField (confirmPassword, userPassword) {
      if (confirmPassword && userPassword && confirmPassword !== userPassword) {
        this.isInvalidConfirmPassword.status = true
        this.isInvalidConfirmPassword.error = 'As senhas estão diferentes'
        return false
      } else if (!confirmPassword || confirmPassword.length === 0) {
        this.isInvalidConfirmPassword.status = true
        this.isInvalidConfirmPassword.error = 'Preencha este campo'
        return false
      } else {
        this.isInvalidConfirmPassword.status = false
        return true
      }
    }
  },
  beforeCreate () {
    if (!localstorage.get('user')) {
      this.$store.dispatch('setHeader')
    }
  }
}
</script>

<style lang='scss'>
.cadastro-user {
  margin-top: 5%;
}
.user-form {
  border: 1px solid #01bca2;
  padding: 20px;
  border-radius: 10px;
}
</style>
