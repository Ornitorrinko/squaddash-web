<template lang='pug'>
.modal(v-bind:class='{"is-active": showModal}')
  .modal-background(@click='closeModal()')
  .modal-card.oneFourthWidth
    header.modal-card-head
      p.modal-card-title Excluir cliente
      button.delete(aria-label='close', @click='closeModal()')
    section.modal-card-body
      span.title Deseja excluir o {{client.name}}?
    footer.modal-card-foot
      button.button.is-success(@click='submit(client)') Excluir
      button.button(@click='closeModal()') Cancelar
</template>

<script>
export default {
  props: {
    client: {type: Object, default: () => {}},
    showModal: {type: Boolean, default: () => {}}
  },
  methods: {
    submit (client) {
      this.$emit('onSubmit', client)
    },
    closeModal () {
      this.$emit('onClose', false)
    }
  }
}
</script>

<style>

</style>
