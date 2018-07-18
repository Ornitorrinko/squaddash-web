<template>
    <div class='notification' :class="['notification', 'animated', type ? `is-${type}` : '']" v-if='show'>
      <button class='delete' @click='closeNotification()'></button>
      <h1 class='title'>{{title}}</h1>
      {{message}}
    </div>
</template>

<script>
export default {
  props: {
    type: String,
    duration: Number,
    message: String,
    title: String,
    open: {type: Boolean, default: false},
    openPermanently: false
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    closeNotification () {
      this.show = false
    },
    openNotification () {
      if (this.openPermanently) {
        this.show = true
      } else {
        this.show = true
        setTimeout(() => this.closeNotification(), this.duration)
      }
    }
  },
  watch: {
    open (newValue) {
      if (newValue) {
        this.openNotification()
      }
    }
  },
  mounted () {
    if (this.duration && this.duration > 0) this.openNotification()
  }
}
</script>

<style>
.notification {
  position: fixed;
  z-index: 1;
  right: 0;
  top: 10px;
}
</style>
