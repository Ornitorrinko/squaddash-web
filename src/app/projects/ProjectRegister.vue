<template lang='pug'>
  ProjectForm(
    :projectProp='project'
    :clientsProp='clients',
    :squadsProp='squads',
    :notification='notification',
    :loading='loading'
    @onOkClick='createProject'
    @onCancelClick='backToProjects'
  )
</template>

<script>
import ProjectForm from './ProjectForm'
import _ from 'lodash'
export default {
  components: {
    ProjectForm
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
        name: '',
        profit: 0,
        client: {},
        squad: {}
      },
      clients: [],
      squads: [],
      notification: {}
    }
  },
  methods: {
    createProject (project) {
      console.log('saveProject', project)
    },
    backToProjects () {
      console.log('Voltar')
    }
  },
  created () {
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

</style>
