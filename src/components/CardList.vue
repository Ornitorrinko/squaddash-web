<template lang='pug'>
.card-list
  .card-list-title
    span {{title}}
  ol
    li.card-list-item(v-for='item in newItemsArray', :key='item.id', @click='onClickItem(item)') {{item.name}}
</template>

<script>
export default {
  props: {
    title: {type: String, default: ''},
    items: {type: Array, default: () => []}
  },
  data () {
    return {
      newItemsArray: []
    }
  },
  watch: {
    items (newValue) {
      this.assignValueToNewItemsArray(newValue)
    }
  },
  methods: {
    onClickItem (item) {
      this.$emit('onClickItem', item)
    },
    assignValueToNewItemsArray (items) {
      let count = 0
      items.forEach(item => {
        count++
        if (count <= 4) {
          this.newItemsArray.push(item)
        }
      })
    }
  },
  mounted () {
    this.assignValueToNewItemsArray(this.items)
  }
}
</script>

<style lang='scss'>
.card-list {
  border: 1px solid #00b89c;
  border-radius: 10px;
  .card-list-title {
    font-weight: bold;
  }
  ol {
    padding: 10px;
    li {
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
  }
}
</style>
