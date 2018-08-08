<template lang='pug'>
.container
  h1.title {{formTitle}}
  form.client-form
    .field.columns
      .column.is-3
        label.label Logo do cliente:
        .control
          PhotoUpload(@upload='uploadImage', @remove='removeImage', :src='client.logo')
      .column
        .field
          label.label link do logo
          .control
            input.input(
              type='text',
              placeholder='Pode colocar o link do logo aqui: http://www.ornito.com.br/images/ornito_logo_2018.png',
              v-model='client.logo'
            )
        .field
          label.label Nome do cliente:
          .control
            input#name.input(
              type="text",
              placeholder="Ornito, Spread, Oracle, Embraer",
              v-model='client.name',
              @input='verifyNameField(client.name)',
              v-bind:class='{"is-danger": isInvalidName.status}'
            )
            span.has-text-danger(v-if='isInvalidName.status') {{isInvalidName.error}}
        .field
          label.label Email de contato:
          .control
            input#email.input(
              type="email",
              placeholder="exemplo@dominio.com.br",
              v-model='client.email',
              @input='verifyEmailField(client.email)'
              v-bind:class='{"is-danger": isInvalidEmail.status}'
            )
            span.has-text-danger(v-if='isInvalidEmail.status') {{isInvalidEmail.error}}
        .field
          label.label CNPJ:
          .control
            TheMask#cnpj.input(
              :mask="['##.###.###/####-##']",
              :placeholder='"CNPJ"'
              @input='verifyCNPJField(client.cnpj)'
              v-bind:class='{"is-danger": isInvalidCNPJ.status}',
              v-model='client.cnpj'
            )
            span.has-text-danger(v-if='isInvalidCNPJ.status') {{isInvalidCNPJ.error}}
    .field.is-grouped.is-grouped-right(v-if='!loading')
      p.control
        button.button.is-info(
          @click='ok(client, $event)',
        ) {{okButton}}
      p.control
        a.button.is-light(@click='cancel()') {{cancelButton}}
    .field(v-if='loading')
        a.button.is-info.is-loading.fullWidth

</template>

<script>
import PhotoUpload from '../../components/PhotoUpload'
import CNPJ from 'cnpj'
import {TheMask} from 'vue-the-mask'
import _ from 'lodash'
export default {
  components: {
    PhotoUpload,
    TheMask
  },
  computed: {
    image () {
      return this.$store.state.image
    }
  },
  props: {
    clientProp: { type: Object, default: () => {} },
    okButton: { type: String, default: 'Salvar' },
    cancelButton: { type: String, default: 'Cancelar' },
    formTitle: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  },
  data () {
    return {
      client: {},
      isInvalidName: {status: false, error: ''},
      isInvalidEmail: {status: false, error: ''},
      isInvalidCNPJ: {status: false, error: ''},
      notification: {
        message: '',
        messageClass: '',
        title: '',
        open: false
      }
    }
  },
  watch: {
    clientProp (newValue) {
      this.client = _.clone(newValue)
    }
  },
  methods: {
    ok (client, event) {
      event.preventDefault()
      if (this.checkForm(client)) {
        this.$emit('onOk', client)
      }
    },
    cancel () {
      this.$emit('onCancel')
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
      this.$emit('onOpenNotification', this.notification)
    },
    uploadImage (file, link) {
      this.$store.dispatch('uploadImageToCloudinary', file).then(() => {
        if (typeof this.image === 'string') {
          this.openNotification('Remova a imagem e tente novamente', 'danger', 'Não foi possível fazer o upload')
          setTimeout(() => { this.notification.open = false }, 5000)
          this.client.logo = ''
        } else {
          this.client.logo = this.image.url
        }
      })
    },
    removeImage (value) {
      this.client.logo = value
    },
    checkForm (client) {
      return this.verifyNameField(client.name) &&
        this.verifyEmailField(client.email) &&
        this.verifyCNPJField(client.cnpj)
    },
    verifyNameField (clientName) {
      if (clientName && clientName.match('[0-9]')) {
        this.isInvalidName.status = true
        this.isInvalidName.error = 'Nome inválido, somente letras'
        return false
      } else if (!clientName || clientName.length === 0) {
        this.isInvalidName.status = true
        this.isInvalidName.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidName.status = false
        return true
      }
    },
    verifyEmailField (clientEmail) {
      if (clientEmail && !clientEmail.match('@')) {
        this.isInvalidEmail.status = true
        this.isInvalidEmail.error = 'Email inválido, está faltando o @'
        return false
      } else if (!clientEmail || clientEmail.length === 0) {
        this.isInvalidEmail.status = true
        this.isInvalidEmail.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidEmail.status = false
        return true
      }
    },
    verifyCNPJField (clientCNPJ) {
      if (clientCNPJ.length === 14) {
        this.isInvalidCNPJ.status = !CNPJ.validate(clientCNPJ)
        this.isInvalidCNPJ.error = this.isInvalidCNPJ.status ? 'CNPJ Inválido' : ''
        return CNPJ.validate(clientCNPJ)
      } else if (!clientCNPJ || clientCNPJ.length === 0) {
        this.isInvalidCNPJ.status = true
        this.isInvalidCNPJ.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidCNPJ.status = false
        return true
      }
    }
  },
  mounted () {
    this.$store.dispatch('setHeader')
  },
  beforeDestroy () {
    this.$store.dispatch('setHeader')
  }
}
</script>

<style lang='scss'>
.client-form {
  border: 1px solid #01bca2;
  padding: 20px;
  border-radius: 10px;
}
</style>
