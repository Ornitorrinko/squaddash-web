<template lang='pug'>
.project-edit
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
    :notification='notification',
    :loading='loading',
    :formTitle='"Editar projeto"',
    @onOkClick='editProject',
    @onCancelClick='cancel'
  )
</template>

<script>
import ProjectForm from './ProjectForm'
import Notification from '../../components/Notification'
import _ from 'lodash'
export default {
  components: {
    Notification,
    ProjectForm
  },
  computed: {
    allSquads () {
      return this.$store.state.Squads.allSquads
    },
    allClients () {
      return this.$store.state.Clients.allClients
    },
    selectedProject () {
      return this.$store.state.Projects.selectedProject
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
      notification: {
        open: false
      },
      clients: [],
      squads: [],
      project: {}
    }
  },
  methods: {
    editProject (project) {
      this.$store.dispatch('editProject', project).then(() => {
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
    this.$store.dispatch('getProjectById', this.$route.params.id).then(() => {
      this.project = _.clone(this.selectedProject)
      this.$store.dispatch('getAllSquads').then(() => {
        this.squads = _.clone(this.allSquads)
      })
      this.$store.dispatch('getAllClients').then(() => {
        this.clients = _.clone(this.allClients)
      })
    })
  }
}
</script>

<style lang='scss'>
.project-edit {
  margin-top: 2%;
}
</style>
