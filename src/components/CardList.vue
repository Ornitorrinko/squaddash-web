<template lang='pug'>
.card-list
  .card-list-title
    span {{title}}
  ol
    li.card-list-item(v-for='item in items', key='item', @click='onClickItem(item)') {{item}}
</template>

<script>
export default {
  props: {
    title: {type: String, default: ''},
    items: {type: Array, default: () => []}
  },
  methods: {
    onClickItem (item) {
      this.$emit('onClickItem', item)
    }
  }
}
</script>

<style lang='scss'>
.card-list {
  border: 1px solid #00b89c;
  border-radius: 10px;
}
</style>
