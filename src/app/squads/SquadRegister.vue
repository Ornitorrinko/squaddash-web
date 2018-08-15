<template lang='pug'>
.squad-register
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  SquadForm(
    :squadProp='squad',
    :loading='loading',
    :formTitle='"Cadastrar squad"'
    @onOk='createSquad',
    @onCancel='cancel'
  )
</template>

<script>
import Notification from '../../components/Notification'
import SquadForm from './SquadForm'
export default {
  components: {
    SquadForm,
    Notification
  },
  computed: {
    messageClass () {
      return this.$store.state.Squads.messageClass
    },
    title () {
      return this.$store.state.Squads.title
    },
    message () {
      return this.$store.state.Squads.message
    },
    loading () {
      return this.$store.state.loading
    }
  },
  data () {
    return {
      squad: {},
      employees: [],
      notification: {
        open: false
      }
    }
  },
  methods: {
    createSquad (squad) {
      this.$store.dispatch('createSquad', squad).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
          setTimeout(() => {
            this.cancel()
          }, 3500)
        }
      })
    },
    cancel () {
      this.$router.push('/squads')
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
    }
  }
}
</script>

<style lang='scss'>
.squad-register {
  margin-top: 2%;
}
</style>
