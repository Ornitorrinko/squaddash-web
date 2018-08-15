<template>
  <div class='multiselect' v-if="!isObjectArray">
    <select v-model='selectedOption' class='input-md'>
      <option value="" disabled selected>{{label}}</option>
      <option v-for='option in options' v-bind:key='option'>{{option}}</option>
    </select>
    <div class='choosenOptions'>
      <span
        v-for='choosenOption in choosenOptions' v-bind:key='choosenOption'
        @click='removeOption($event)'
        title='Remover item'
      >
        {{choosenOption}}
      </span>
    </div>
  </div>
  <div class="multiselect" v-else>
    <select v-model='selectedOption' class='input-md'>
      <option value="" disabled selected>{{label}}</option>
      <option v-for='option in options' v-bind:key='option'>{{option.name}}</option>
    </select>
    <div class='choosenOptions'>
      <span
        v-for='choosenOption in choosenOptions' v-bind:key='choosenOption'
        @click='removeOption($event)'
        title='Remover item'
      >
        {{choosenOption.name}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => [] },
    choosenOptions: { type: Array, default: () => [] },
    isObjectArray: { type: Boolean, default: false },
    label: { type: String, default: 'Selecione' }
  },
  data () {
    return {
      selectedOption: ''
    }
  },
  watch: {
    selectedOption (newValue) {
      this.choosenOptions.push(newValue)
      this.$emit('selectedOption', this.choosenOptions)
    }
  },
  methods: {
    removeOption (event) {
      let text = event.srcElement.textContent.trim()
      let index = this.choosenOptions.indexOf(text)
      this.choosenOptions.splice(index, 1)
      this.$emit('removeOption', this.choosenOptions)
    }
  }
}
</script>

<style lang='scss'>

.multiselect {
  font-size: 18px;
  display: inline-block;
  width: 100%;
  text-align: left;
  select {
    color: #333;
    border-color: #ccc;
    padding: 6px;
    border-radius: 4px;
    margin-bottom: 5px;
  }
  .choosenOptions {
    //background: map-get($map: $colors, $key: background);
    text-align: center;
    padding: 10px;
    span {
      background: #75bbb4;
      padding: 10px;
      border-radius: 15px;
      color: white;
      cursor: pointer;
      &::after {
        content: 'X';
        font-weight: bold;
        border-left: 1px solid white;
        font-size: 16px;
        padding: 6px 4px;
        padding-bottom: 14px;
      }
    }
    span {
      margin-left: 5px;
    }
  }
}
</style>
