<template lang='pug'>
.modal(v-bind:class='{"is-active": showModal}')
  .modal-background(@click='closeModal()')
  .modal-card.oneFourthWidth
    header.modal-card-head
      p.modal-card-title Projeto {{project.name}}
      button.delete(aria-label='close', @click='closeModal()')
    section.modal-card-body.table
      table.table-content
        thead
          th.has-text-centered Cliente
          th.has-text-centered Squad
          th.has-text-centered Data início
          th.has-text-centered Data término
          th.has-text-centered Prazo estimado
          th.has-text-centered Valor estimado
          th.has-text-centered Custo
          th.has-text-centered Lucro
        tbody
          tr
            td.has-text-centered(v-if='project.client.logo')
              img.image-100(:src='project.client.logo')
            td.has-text-centered(v-if='!project.client.logo') {{project.client.name}}
            td.has-text-centered {{project.squad.name}}
            td.has-text-centered {{project.begin_date | brDate}}
            td.has-text-centered {{project.finish_date | brDate}}
            td.has-text-centered {{project.estimated_time.time}} {{project.estimated_time.type}}
            td.has-text-centered {{project.estimated_value | brCurrency}}
            td.has-text-centered {{project.cost | brCurrency}}
            td.has-text-centered {{project.profit | brCurrency}}
</template>

<script>
export default {
  props: {
    project: {type: Object, default: () => {}},
    showModal: {type: Boolean, default: () => {}}
  },
  methods: {
    closeModal () {
      this.$emit('onClose', false)
    }
  }
}
</script>

<style>

</style>
