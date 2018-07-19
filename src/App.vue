<template lang='pug'>
  #app
    Header(v-if='showHeader')
    router-view
</template>

<script>
import Header from './app/users/Header'
export default {
  computed: {
    showHeader () {
      return this.$store.state.showHeader
    }
  },
  components: {
    Header
  }
}
</script>

<style lang='scss'>
@import url('./App.scss');
* {
  font-family: 'Raleway';
  margin: 0;
  padding: 0;
}
</style>
