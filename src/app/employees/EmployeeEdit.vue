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
    :employeeProp='employee'
    :loading='loading',
    :formTitle='"Cadastrar funcionário"'
    @onOk='editEmployee',
    @onCancel='cancel'
  )
</template>

<script>
import Notification from '../../components/Notification'
import EmployeeForm from './EmployeeForm'
import _ from 'lodash'
export default {
  components: {
    EmployeeForm,
    Notification
  },
  computed: {
    selectedEmployee () {
      return this.$store.state.Employees.selectedEmployee
    },
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
      employee: {},
      notification: { open: false }
    }
  },
  methods: {
    editEmployee (employee) {
      this.$store.dispatch('editEmployee', employee).then(() => {
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
    this.$store.dispatch('getEmployeeById', this.$route.params.id).then(() => {
      this.employee = _.clone(this.selectedEmployee)
    })
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
