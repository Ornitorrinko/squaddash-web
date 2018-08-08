<template lang='pug'>
.client-edit
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  ClientForm(
    :clientProp='client'
    :loading='loading',
    :formTitle='"Editar cliente"'
    @onOk='editClient',
    @onCancel='cancel',
    @onOpenNotification='openFormNotification'
  )
</template>

<script>
import ClientForm from './ClientForm'
import Notification from '../../components/Notification'
import _ from 'lodash'
export default {
  components: {
    Notification,
    ClientForm
  },
  computed: {
    selectedClient () {
      return this.$store.state.Clients.selectedClient
    },
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
      notification: {
        open: false
      },
      client: {}
    }
  },
  methods: {
    editClient (client) {
      this.$store.dispatch('editClient', client).then(() => {
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
  },
  mounted () {
    this.$store.dispatch('getClientById', this.$route.params.id).then(() => {
      this.client = _.clone(this.selectedClient)
    })
  }
}
</script>

<style lang='scss'>
.client-edit {
  margin-top: 2%;
}
</style>
