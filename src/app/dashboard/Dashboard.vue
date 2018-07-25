<template lang='pug'>
.dashboard
  .container
    h1.title Dashboard
    .columns
      CardList#projects.column.mr-5(:items='projects', :title='"Todos os primeiros 4 projetos"')
      CardList#clients.column.mr-5(:items='clients', :title='"Todos os primeiros 4 clientes"')
      CardList#squads.column.mr-5(:items='squads', :title='"Todos os primeiros 4 squads"')
      CardList#employees.column.mr-5(:items='employees', :title='"Todos os primeiros 4 funcionários"')
</template>

<script>
import CardList from '../../components/CardList'
import _ from 'lodash'
export default {
  components: {
    CardList
  },
  computed: {
    allProjects () {
      return this.$store.state.Projects.allProjects
    },
    allClients () {
      return this.$store.state.Clients.allClients
    },
    allSquads () {
      return this.$store.state.Squads.allSquads
    },
    allEmployees () {
      return this.$store.state.Employees.allEmployees
    }
  },
  data () {
    return {
      projects: [],
      clients: [],
      squads: [],
      employees: []
    }
  },
  mounted () {
    this.$store.dispatch('getAllProjects').then(() => {
      this.projects = _.clone(this.allProjects)
    })
    this.$store.dispatch('getAllClients').then(() => {
      this.clients = _.clone(this.allClients)
    })
    this.$store.dispatch('getAllSquads').then(() => {
      this.squads = _.clone(this.allSquads)
    })
    this.$store.dispatch('getAllEmployees').then(() => {
      this.employees = _.clone(this.allEmployees)
    })
  }
}
</script>

<style lang='scss'>
.dashboard {
  margin-top: 2%;
}
</style>
