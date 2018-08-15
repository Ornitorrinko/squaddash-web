<template lang='pug'>
.squads
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  .container
    h1.title Squads
    .columns
      .column
        router-link.button.is-squadDash.is-outlined(:to='{ path: `/squads/cadastro`}') Criar squad
      .column
        .control.has-icons-right
          input#search.input.squadDash-input(type='text', placeholder='Pesquisar por squad', @input='searchTable()')
          span.icon.is-right
            i.fa.fa-search
  .container
    .table
      table#table.table-content
        thead
          th.table-content-head-item Squad
          th.table-content-head-item Funcionários
          th.table-content-head-item Custo
          th.table-content-head-item Status
          th.table-content-head-item
        tbody
          tr.table-content-row(v-for='(squad, index) in squads', v-if='!squad.deleted')
            td.table-content-row-item {{squad.name}}
            td.table-content-row-item
              ListBadge(:items='squad.employees' :reference='squad', @onDelete='deleteEmployeeInSquad')
            td.table-content-row-item {{squad.cost | brCurrency}}
            td.table-content-row-item {{squad.status | boolFormat('Ativado', 'Desativado')}}
            td.table-content-row-item
              .actions
                router-link.actions-link(:to='{ path: `/squads/editar/${squad.id}` }')
                  span.fa.fa-edit(title='editar squad')
                span.fa.fa-toggle-on.actions-link(v-if='squad.status', @click='changeStatus(false, index)', title='desativar squad')
                span.fa.fa-toggle-off.actions-link(v-if='!squad.status', @click='changeStatus(true, index)', title='ativar squad')
                span.fa.fa-trash.actions-link(title='excluir squad', @click='openSquadConfirmModal(squad)')
  ConfirmModal(
    :item='selectedSquad',
    :showModal='showSquadConfirmModal',
    :text='`Deseja excluir ${selectedSquad.name}?`',
    :okButton='{text: "Excluir", className: "danger"}',
    :cancelButton='{text: "Cancelar", className: ""}',
    @onClose='closeSquadConfirmModal',
    @onSubmit='deleteSquad'
  )
</template>

<script>
import _ from 'lodash'
import Utils from '../../utils/index'
import Notification from '../../components/Notification'
import ListBadge from '../../components/ListBadge'
import ConfirmModal from '../../components/ConfirmModal'
export default {
  components: {
    Notification,
    ListBadge,
    ConfirmModal
  },
  computed: {
    allSquads () {
      return this.$store.state.Squads.allSquads
    },
    messageClass () {
      return this.$store.state.Squads.messageClass
    },
    title () {
      return this.$store.state.Squads.title
    },
    message () {
      return this.$store.state.Squads.message
    },
    loading () {
      return this.$store.state.loading
    }
  },
  data () {
    return {
      squads: [],
      showSquadConfirmModal: false,
      selectedSquad: {},
      notification: {
        open: false
      }
    }
  },
  methods: {
    editSquad (squad) {
      this.$store.dispatch('editSquad', squad).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
        }
      })
    },
    changeStatus (value, index) {
      let squad = this.squads[index]
      squad.status = value
      this.editSquad(squad)
    },
    deleteSquad (squad) {
      squad.deleted = true
      this.closeSquadConfirmModal(false)
      this.$store.dispatch('deleteSquad', squad).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
        }
      })
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
      setTimeout(() => { this.notification.open = false }, 3500)
    },
    openSquadConfirmModal (squad) {
      this.selectedSquad = squad
      this.showSquadConfirmModal = true
    },
    closeSquadConfirmModal (value) {
      this.showSquadConfirmModal = value
    },
    searchTable () {
      Utils.searchTable()
    },
    deleteEmployeeInSquad (employeeId, squad) {
      let employees = squad.employees
      employees.splice(_.indexOf(employees, item => _.find(employees, employee => employeeId === employee)), 1)
      this.editSquad(squad)
    }
  },
  created () {
    this.$store.dispatch('getAllSquads').then(() => {
      this.squads = _.clone(this.allSquads)
    })
  }
}
</script>

<style lang='scss'>
.squads {
  margin-top: 2%;
}
</style>
