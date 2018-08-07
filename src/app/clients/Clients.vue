<template lang='pug'>
.clients
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  .container
    h1.title Clientes
    .columns
      .column
        router-link.button.is-squadDash.is-outlined(:to='{ path: `/clientes/cadastro`}') Criar cliente
      .column
        .control.has-icons-right
          input#search.input.squadDash-input(type='text', placeholder='Pesquisar por cliente', @input='searchTable()')
          span.icon.is-right
            i.fa.fa-search
  .container
    .table
      table#table.table-content
        thead
          th.table-content-head-item Cliente
          th.table-content-head-item Logo
          th.table-content-head-item CNPJ
          th.table-content-head-item Email de contato
          th.table-content-head-item Status
          th.table-content-head-item
        tbody
          tr.table-content-row(v-for='(client, index) in clients', v-if='!client.deleted')
            td.table-content-row-item {{client.name}}
            td.table-content-row-item(v-if='client.logo')
              img.image-100(:src='client.logo')
            td.table-content-row-item {{client.CNPJ}}
            td.table-content-row-item {{client.email}}
            td.table-content-row-item {{client.status | boolFormat('Ativado', 'Desativado')}}
            td.table-content-row-item
              .actions
                router-link.actions-link(:to='{ path: `/clientes/editar/${client.id}` }')
                  span.fa.fa-edit(title='editar projeto')
                span.fa.fa-toggle-on.actions-link(v-if='client.status', @click='changeStatus(false, index)', title='desativar projeto')
                span.fa.fa-toggle-off.actions-link(v-if='!client.status', @click='changeStatus(true, index)', title='ativar projeto')
                span.fa.fa-trash.actions-link(title='excluir projeto', @click='openClientDeleteModal(client)')
  ClientDeleteModal(
    :client='selectedClient',
    :showModal='showClientDeleteModal',
    @onClose='closeClientDeleteModal',
    @onSubmit='deleteClient'
  )
</template>

<script>
import _ from 'lodash'
import Utils from '../../utils/index'
import ClientDeleteModal from './ClientDeleteModal'
import Notification from '../../components/Notification'
export default {
  components: {
    ClientDeleteModal,
    Notification
  },
  computed: {
    allClients () {
      return this.$store.state.Clients.allClients
    },
    messageClass () {
      return this.$store.state.Clients.messageClass
    },
    title () {
      return this.$store.state.Clients.title
    },
    message () {
      return this.$store.state.Clients.message
    },
    loading () {
      return this.$store.state.loading
    }
  },
  data () {
    return {
      clients: [],
      showClientDeleteModal: false,
      selectedClient: {
        client: {},
        squad: {},
        estimated_time: {}
      },
      notification: {}
    }
  },
  methods: {
    changeStatus (value, index) {
      let client = this.clients[index]
      client.status = value
      this.$store.dispatch('editClient', client).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
        }
      })
    },
    deleteClient (client) {
      client.deleted = true
      this.$store.dispatch('deleteClient', client).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
          this.closeClientDeleteModal()
        }
      })
    },
    openNotification (message, messageClass, title) {
      this.notification.message = message
      this.notification.messageClass = messageClass
      this.notification.title = title
      this.notification.open = true
    },
    openClientDeleteModal (project) {
      this.selectedProject = project
      this.showClientDeleteModal = true
    },
    closeClientDeleteModal (value) {
      this.showClientDeleteModal = value
    },
    searchTable () {
      Utils.searchTable()
    }
  },
  created () {
    this.$store.dispatch('getAllClients').then(() => {
      this.clients = _.clone(this.allClients)
    })
  }
}
</script>

<style lang='scss'>
.clients {
  margin-top: 2%;
}
</style>
