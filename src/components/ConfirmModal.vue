<template lang='pug'>
.modal(:class='{"is-active": showModal}')
  .modal-background(@click='closeModal()')
  .modal-card.oneFourthWidth
    header.modal-card-head
      p.modal-card-title {{title}}
      button.delete(aria-label='close', @click='closeModal()')
    section.modal-card-body
      span.title {{text}}
    footer.modal-card-foot
      button.button(@click='submit(item)', :class='{"is-info": ok.className === "info" || "", "is-danger": ok.className === "danger"}') {{ok.text}}
      button.button(@click='closeModal()', :class='{"is-danger": cancel.className === "danger"}') {{cancel.text}}
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => {} },
    showModal: { type: Boolean, default: () => {} },
    title: { type: String, default: 'Excluir' },
    text: { type: String, default: 'Deseja excluir?' },
    okButton: { type: Object, default: () => {} },
    cancelButton: { type: Object, default: () => {} }
  },
  watch: {
    okButton (newValue) {
      this.ok = newValue
    },
    cancelButton (newValue) {
      this.cancel = newValue
    }
  },
  data () {
    return {
      ok: {className: '', text: 'Sim'},
      cancel: {className: '', text: 'Não'}
    }
  },
  methods: {
    submit (item) {
      this.$emit('onSubmit', item)
    },
    closeModal () {
      this.$emit('onClose', false)
    }
  }
}
</script>

<style>

</style>
