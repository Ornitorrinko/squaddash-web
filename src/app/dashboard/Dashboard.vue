<template lang='pug'>
.dashboard
  .container
    h1.title Dashboard
    .columns
      CardList#projects.column
      CardList#clients.column
      CardList#squads.column
      CardList#employees.column
</template>

<script>
import CardList from '../../components/CardList'
export default {
  components: {
    CardList
  },
  created () {
    this.$store.dispatch('getAllProjects')
    this.$store.dispatch('getAllClients')
    this.$store.dispatch('getAllSquads')
    this.$store.dispatch('getAllEmployees')
  }
}
</script>

<style lang='scss'>
.dashboard {
  margin-top: 2%;
}
</style>
