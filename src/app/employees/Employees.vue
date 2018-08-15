<template lang='pug'>
.employees
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  .container
    h1.title Funcionários
    .columns
      .column
        router-link.button.is-squadDash.is-outlined(:to='{ path: `/funcionarios/cadastro`}') Criar funcionário
      .column
        .control.has-icons-right
          input#search.input.squadDash-input(type='text', placeholder='Pesquisar por funcionário', @input='searchTable()')
          span.icon.is-right
            i.fa.fa-search
  .container
    .table
      table#table.table-content
        thead
          th.table-content-head-item Funcionário
          th.table-content-head-item Salário
          th.table-content-head-item Profissão
          th.table-content-head-item Modalidade de contratação
          th.table-content-head-item Status
          th.table-content-head-item
        tbody
          tr.table-content-row(v-for='(employee, index) in employees')
            td.table-content-row-item {{employee.name}}
            td.table-content-row-item {{employee.salary | brCurrency}}
            td.table-content-row-item {{employee.profession}}
            td.table-content-row-item {{employee.modality_of_contracting}}
            td.table-content-row-item {{employee.status | boolFormat('Disponível', 'Indisponível')}}
            td.table-content-row-item
              .actions
                router-link.actions-link(:to='{ path: `/funcionarios/editar/${employee.id}` }')
                  span.fa.fa-edit(title='editar funcionário')
                span.fa.fa-toggle-on.actions-link(v-if='employee.status', @click='changeStatus(false, index)', title='desativar funcionário')
                span.fa.fa-toggle-off.actions-link(v-if='!employee.status', @click='changeStatus(true, index)', title='ativar funcionário')
                span.fa.fa-trash.actions-link(title='excluir funcionário', @click='openEmployeeConfirmModal(employee)')
  ConfirmModal(
    :item='selectedEmployee',
    :showModal='showEmployeeConfirmModal',
    :text='`Deseja excluir ${selectedEmployee.name}?`',
    :okButton='{text: "Excluir", className: "danger"}',
    :cancelButton='{text: "Cancelar", className: ""}',
    @onClose='closeEmployeeConfirmModal',
    @onSubmit='deleteEmployee'
  )
</template>

<script>
import _ from 'lodash'
import Utils from '../../utils/index'
import ConfirmModal from '../../components/ConfirmModal'
import Notification from '../../components/Notification'
export default {
  components: {
    ConfirmModal,
    Notification
  },
  computed: {
    allEmployees () {
      return this.$store.state.Employees.allEmployees
    },
    messageClass () {
      return this.$store.state.Employees.messageClass
    },
    title () {
      return this.$store.state.Employees.title
    },
    message () {
      return this.$store.state.Employees.message
    },
    loading () {
      return this.$store.state.loading
    }
  },
  data () {
    return {
      employees: [],
      showEmployeeConfirmModal: false,
      selectedEmployee: {},
      notification: {
        open: false
      }
    }
  },
  methods: {
    changeStatus (value, index) {
      let employee = this.employees[index]
      employee.status = value
      this.$store.dispatch('editEmployee', employee).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
        }
      })
    },
    deleteEmployee (employee) {
      employee.deleted = true
      this.closeEmployeeConfirmModal(false)
      this.$store.dispatch('deleteEmployee', employee).then(() => {
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
    openEmployeeConfirmModal (employee) {
      this.selectedEmployee = employee
      this.showEmployeeConfirmModal = true
    },
    closeEmployeeConfirmModal (value) {
      this.showEmployeeConfirmModal = value
    },
    searchTable () {
      Utils.searchTable()
    }
  },
  created () {
    this.$store.dispatch('getAllEmployees').then(() => {
      this.employees = _.clone(_.filter(this.allEmployees, item => !item.deleted))
    })
  }
}
</script>

<style lang='scss'>
.employees {
  margin-top: 2%;
}
</style>
