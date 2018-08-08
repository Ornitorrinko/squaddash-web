<template lang='pug'>
.client-register
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='5000'
  )
  ClientForm(
    :clientProp='client'
    :loading='loading',
    :formTitle='"Cadastrar cliente"'
    @onOk='createClient',
    @onCancel='cancel',
    @onOpenNotification='openFormNotification'
  )
</template>

<script>
import Notification from '../../components/Notification'
import ClientForm from './ClientForm'
export default {
  components: {
    ClientForm,
    Notification
  },
  computed: {
    messageClass () {
      return this.$store.state.Clients.messageClass
    },
    title () {
      return this.$store.state.Clients.title
    },
    message () {
      return this.$store.state.Clients.message
    },
    loading () {
      return this.$store.state.loading
    }
  },
  data () {
    return {
      client: {},
      notification: {
        open: false
      }
    }
  },
  methods: {
    createClient (client) {
      this.$store.dispatch('createClient', client).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
          setTimeout(() => {
            this.cancel()
          }, 3500)
        }
      })
    },
    cancel () {
      this.$router.push('/clientes')
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
    },
    openFormNotification (notification) {
      this.notification = notification
    }
  }
}
</script>

<style lang='scss'>
.client-register {
  margin-top: 2%;
}
</style>
