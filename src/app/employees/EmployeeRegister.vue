<template lang='pug'>
.employee-register
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  EmployeeForm(
    :loading='loading',
    :formTitle='"Cadastrar funcionário"'
    @onOk='createEmployee',
    @onCancel='cancel'
  )
</template>

<script>
import Notification from '../../components/Notification'
import EmployeeForm from './EmployeeForm'
export default {
  components: {
    EmployeeForm,
    Notification
  },
  computed: {
    messageClass () {
      return this.$store.state.Employees.messageClass
    },
    title () {
      return this.$store.state.Employees.title
    },
    message () {
      return this.$store.state.Employees.message
    },
    loading () {
      return this.$store.state.loading
    }
  },
  data () {
    return {
      notification: { open: false }
    }
  },
  methods: {
    createEmployee (employee) {
      this.$store.dispatch('createEmployee', employee).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
          setTimeout(() => {
            this.cancel()
          }, 3500)
        }
      })
    },
    cancel () {
      this.$router.push('/funcionarios')
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
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
.employee-register {
  margin-top: 2%;
}
</style>
