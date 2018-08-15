<template>
<div class="list-badge">
    <div class="list-badge-content" v-for="item in items" :key='item.name'>
      <div class="list-badge-item">
        <a @click='selectItem(item)'>{{item.name}}</a>
        <a @click='deleteItem(item.id)'>X</a>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    items: {type: Array, default: () => []},
    reference: {type: Object, default: () => {}}
  },
  methods: {
    selectItem (item) {
      this.$emit('onSelect', item, this.reference)
    },
    deleteItem (id) {
      this.$emit('onDelete', id, this.reference)
    }
  }
}
</script>

<style lang='scss'>
.list-badge {
  border: 1px solid #00b89c;
  border-radius: 10px;
  height: 50px;
}
.list-badge-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #ccc;
  padding: 0 5px;
  margin-bottom: 5px;
  a {
    color: #00b89c;
    &:hover {
      font-weight: bold;
    }
  }
}
.list-badge-content {
  padding: 10px;
  overflow-y: scroll;
}
</style>
