<template lang='pug'>
.projects

</template>

<script>
import _ from 'lodash'
export default {
  computed: {
    allProjects () {
      return this.$store.state.Projects.allProjects
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
