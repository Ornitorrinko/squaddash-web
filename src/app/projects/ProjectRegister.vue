<template lang='pug'>
.project-register
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  ProjectForm(
    :projectProp='project'
    :clientsProp='clients',
    :squadsProp='squads',
    :loading='loading',
    :formTitle='"Cadastrar projeto"'
    @onOk='createProject',
    @onCancel='cancel'
  )
</template>

<script>
import Notification from '../../components/Notification'
import ProjectForm from './ProjectForm'
import _ from 'lodash'
export default {
  components: {
    ProjectForm,
    Notification
  },
  computed: {
    allSquads () {
      return this.$store.state.Squads.allSquads
    },
    allClients () {
      return this.$store.state.Clients.allClients
    },
    messageClass () {
      return this.$store.state.Projects.messageClass
    },
    title () {
      return this.$store.state.Projects.title
    },
    message () {
      return this.$store.state.Projects.message
    },
    loading () {
      return this.$store.state.loading
    }
  },
  data () {
    return {
      project: {
        profit: 0.00,
        estimated_time: {}
      },
      clients: [],
      squads: [],
      notification: {
        open: false
      }
    }
  },
  methods: {
    createProject (project) {
      this.$store.dispatch('createProject', project).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
          setTimeout(() => {
            this.cancel()
          }, 3500)
        }
      })
    },
    cancel () {
      this.$router.push('/projetos')
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
    }
  },
  mounted () {
    this.$store.dispatch('getAllSquads').then(() => {
      this.squads = _.clone(this.allSquads)
    })
    this.$store.dispatch('getAllClients').then(() => {
      this.clients = _.clone(this.allClients)
    })
  }
}
</script>

<style lang='scss'>
.project-register {
  margin-top: 2%;
}
</style>
