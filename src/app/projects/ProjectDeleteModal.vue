<template lang='pug'>
.modal(v-bind:class='{"is-active": showModal}')
  .modal-background(@click='closeModal()')
  .modal-card.oneFourthWidth
    header.modal-card-head
      p.modal-card-title Excluir projeto
      button.delete(aria-label='close', @click='closeModal()')
    section.modal-card-body
      span.title Deseja excluir o {{project.name}}?
    footer.modal-card-foot
      button.button.is-success(@click='submit(project)') Excluir
      button.button(@click='closeModal()') Cancelar
</template>

<script>
export default {
  props: {
    project: {type: Object, default: () => {}},
    showModal: {type: Boolean, default: () => {}}
  },
  methods: {
    submit (project) {
      this.$emit('onSubmit', project)
    },
    closeModal () {
      this.$emit('onClose', false)
    }
  }
}
</script>

<style>

</style>
