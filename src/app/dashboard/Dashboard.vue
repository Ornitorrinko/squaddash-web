<template lang='pug'>
.dashboard
  .container
    h1.title Dashboard
    .columns
      CardList#projects.column.margin-right-5(
        :items='projects',
        :title='"Todos os primeiros 4 projetos"',
        :type='"projetos"',
        @onClickItem='getItemOnCardList',
        @onClickLink='getLinkOnCardList'
      )
      CardList#clients.column.margin-right-5(
        :items='clients',
        :title='"Todos os primeiros 4 clientes"',
        :type='"clientes"',
        @onClickItem='getItemOnCardList',
        @onClickLink='getLinkOnCardList'
      )
      CardList#squads.column.margin-right-5(
        :items='squads',
        :title='"Todos os primeiros 4 squads"',
        :type='"squads"',
        @onClickItem='getItemOnCardList',
        @onClickLink='getLinkOnCardList'
      )
      CardList#employees.column.margin-right-5(
        :items='employees',
        :title='"Todos os primeiros 4 funcionários"',
        :type='"employees"',
        @onClickItem='getItemOnCardList',
        @onClickLink='getLinkOnCardList'
      )
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
  methods: {
    getItemOnCardList (item, type) {
      this.$router.push(`/${type}/${item.id}`)
    },
    getLinkOnCardList (link) {
      this.$router.push(`/${link}`)
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
