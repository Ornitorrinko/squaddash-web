<template lang='pug'>
.modal(:class='{"is-active": showModal}')
  .modal-background(@click='closeModal()')
  .modal-card.oneFourthWidth
    header.modal-card-head
      p.modal-card-title Selecionar Funcionários
      button.delete(aria-label='close', @click='closeModal()')
    section.modal-card-body
      form
        .field
          .control.columns
            .column
              label.label Profissão
              .select.fullWidth
                select.fullWidth(v-model='profession', @change='filterEmployees()')
                  option(disabled, selected, value='null') Selecione a profissão
                  option(v-for='option in employees', :key='option.profession', :value='option.profession') {{option.profession}}
            .column
              label.label Modalidade de contratação
              .select.fullWidth
                select.fullWidth(v-model='modalityOfContracting', @change='filterEmployees()')
                  option(disabled, selected, value='null') Selecione a modalidade de contratação
                  option(v-for='option in employees', :key='option.modality_of_contracting', :value='option.modality_of_contracting') {{option.modality_of_contracting}}
        .field
          label.label Funcionários
          .mini-card(v-for='(employee, index) in newEmployees', :key='employee.id')
            label.checkbox(@click='assignValueToSelectedEmployees(employee, index, "new")')
              input(type='checkbox', :id='employee.id')
            .control.mini-card-item
              label.label Nome do funcionário: &nbsp;
                span.has-text-link {{employee.name}}
            .control.mini-card-item
              label.label Salário (R$): &nbsp;
                span.has-text-link {{employee.salary | brCurrency}}
            .control.mini-card-item
              label.label Modalidade de contratação: &nbsp;
                span.has-text-link {{employee.modality_of_contracting}}
            .control.mini-card-item
              label.label Status: &nbsp;
                span.has-text-link {{employee.status | boolFormat('Disponível', 'Indisponível')}}
        .field
          label.label Funcionários selecionados
          .mini-card(v-for='(employee, index) in selectedEmployees', :key='employee.id')
            span.fa.fa-trash.has-text-link(title='excluir funcionário', @click='assignValueToSelectedEmployees(employee, index)')
            .control.mini-card-item
              label.label Nome do funcionário: &nbsp;
                span.has-text-link {{employee.name}}
            .control.mini-card-item
              label.label Salário (R$): &nbsp;
                span.has-text-link {{employee.salary | brCurrency}}
            .control.mini-card-item
              label.label Modalidade de contratação: &nbsp;
                span.has-text-link {{employee.modality_of_contracting}}
            .control.mini-card-item
              label.label Status: &nbsp;
                span.has-text-link {{employee.status | boolFormat('Disponível', 'Indisponível')}}

    footer.modal-card-foot
      button.button.is-info(@click='submit()') Salvar
      button.button(@click='closeModal()') Cancelar
</template>

<script>
import _ from 'lodash'
export default {
  computed: {
    allEmployees () {
      return this.$store.state.Employees.allEmployees
    }
  },
  props: {
    showModal: { type: Boolean, default: () => {} }
  },
  data () {
    return {
      employees: [],
      newEmployees: [],
      selectedEmployees: [],
      ok: { className: '', text: 'Sim' },
      cancel: { className: '', text: 'Não' },
      profession: '',
      modalityOfContracting: ''
    }
  },
  methods: {
    filterEmployees () {
      if (
        (this.profession && this.profession.length > 0) ||
        (this.modalityOfContracting && this.modalityOfContracting.length > 0)
      ) {
        this.newEmployees = _.filter(
          this.employees,
          item =>
            this.profession === item.profession ||
            this.modalityOfContracting === item.modality_of_contracting
        )
      }
    },
    assignValueToSelectedEmployees (employee, index, type) {
      let select = document.getElementById(`${employee.id}`)
      if (select.checked && type === 'new') {
        this.selectedEmployees.push(_.clone(employee))
      } else {
        this.selectedEmployees.splice(index, 1)
        select.checked = false
      }
      console.log('selectedEmployees', this.selectedEmployees)
    },
    submit () {
      this.$emit('onSubmit')
    },
    closeModal () {
      this.$emit('onClose', false)
    }
  },
  mounted () {
    this.$store.dispatch('getAllEmployees').then(() => {
      this.employees = _.clone(
        _.filter(this.allEmployees, item => !item.deleted && item.status)
      )
    })
  }
}
</script>

<style lang='scss'>
.mini-card {
  display: flex;
  padding: 10px;
  background-color: #efefef;
  justify-content: space-between;
  margin-top: 5px;
  .mini-card-item {
    border-right: 1px solid #01bca2;
    padding: 0 10px;
    &:last-child {
      border: none;
      padding: 0 5px;
    }
    &:first-child {
      padding: 0 5px;
    }
  }
}
</style>
