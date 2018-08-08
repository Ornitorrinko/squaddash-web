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
        router-link.button.is-squadDash.is-outlined(:to='{ path: `/squads/cadastro`}') Criar squade
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
          th.table-content-head-item Status
          th.table-content-head-item
        tbody
          tr.table-content-row(v-for='(squad, index) in squads', v-if='!squad.deleted')
            td.table-content-row-item {{squad.name}}
            td.table-content-row-item
              ListBadge(:items='squad.employees')
            td.table-content-row-item {{squad.status | boolFormat('Ativado', 'Desativado')}}
            td.table-content-row-item
              .actions
                router-link.actions-link(:to='{ path: `/squades/editar/${squad.id}` }')
                  span.fa.fa-edit(title='editar projeto')
                span.fa.fa-toggle-on.actions-link(v-if='squad.status', @click='changeStatus(false, index)', title='desativar projeto')
                span.fa.fa-toggle-off.actions-link(v-if='!squad.status', @click='changeStatus(true, index)', title='ativar projeto')
                span.fa.fa-trash.actions-link(title='excluir projeto', @click='openSquadDeleteModal(squad)')
  //- squadDeleteModal(
  //-   :squad='selectedsquad',
  //-   :showModal='showsquadDeleteModal',
  //-   @onClose='closesquadDeleteModal',
  //-   @onSubmit='deletesquad'
  //- )
</template>

<script>
import _ from 'lodash'
import Utils from '../../utils/index'
import SquadDeleteModal from './SquadDeleteModal'
import Notification from '../../components/Notification'
import ListBadge from '../../components/ListBadge'
export default {
  components: {
    SquadDeleteModal,
    Notification,
    ListBadge
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
      showsquadDeleteModal: false,
      selectedsquad: {},
      notification: {
        open: false
      }
    }
  },
  methods: {
    changeStatus (value, index) {
      let squad = this.squads[index]
      squad.status = value
      this.$store.dispatch('editsquad', squad).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
        }
      })
    },
    deletesquad (squad) {
      squad.deleted = true
      this.closesquadDeleteModal(false)
      this.$store.dispatch('deletesquad', squad).then(() => {
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
    openSquadDeleteModal (squad) {
      this.selectedsquad = squad
      this.showsquadDeleteModal = true
    },
    closesquadDeleteModal (value) {
      this.showsquadDeleteModal = value
    },
    searchTable () {
      Utils.searchTable()
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
