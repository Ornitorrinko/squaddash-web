<template>
<div class="card-list">
  <div class="card-list-title"><span class="title-text">{{title}}</span><span @click="onClickLink(type)" :title="`ir para ${type}`" class="external-link"><i class="fa fa-external-link"></i></span></div>
  <ol>
    <li v-for="item in newItemsArray" :key="item.id" :title="`visualizar ${item.name}`" @click="onClickItem(item, type)" class="card-list-item">{{item.name}}</li>
  </ol>
</div>
</template>

<script>
export default {
  props: {
    title: {type: String, default: ''},
    items: {type: Array, default: () => []},
    type: {type: String, default: ''}
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
    onClickItem (item, type) {
      this.$emit('onClickItem', item, type)
    },
    onClickLink (link) {
      this.$emit('onClickLink', link)
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
    display: flex;
    justify-content: space-between;
    .title-text {
      font-weight: bold;
    }
    .external-link {
      color: #008571;
      cursor: pointer;
      &:hover {
        font-weight: bold;
        font-size: 20px;
      }
    }
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
