<template lang='pug'>
.container
  h1.title {{formTitle}}
  form.employee-form
    .field
        .field
          label.label Nome do funcionário:
          .control
            input#name.input(
              type="text",
              placeholder="fulano de tal",
              :class='{"is-danger": isInvalidName.status}'
              @input='verifyNameField(employee.name)',
              v-model='employee.name',
            )
            span.has-text-danger(v-if='isInvalidName.status') {{isInvalidName.error}}
        .field
          label.label Salário (R$):
          .control
            input#salary.input(
              type="number",
              placeholder="12.00",
              min='0'
              :class='{"is-danger": isInvalidSalary.status}'
              v-model='employee.salary'
              @input='verifySalaryField(employee.salary)'
            )
            span.has-text-danger(v-if='isInvalidSalary.status') {{isInvalidSalary.error}}
        .field
          label.label Profissão:
          .control
            input#profession.input(
              type="text",
              placeholder="front-end developer, full-stack, RH",
              :class='{"is-danger": isInvalidProfession.status}'
              @input='verifyProfessionField(employee.profession)',
              v-model='employee.profession',
            )
            span.has-text-danger(v-if='isInvalidProfession.status') {{isInvalidProfession.error}}
        .field
          label.label Modalidade de contratação:
          .control
            label.radio
              input(type='radio', name='modality_of_contracting', value='CLT', v-model='employee.modality_of_contracting')
              |     CLT

            label.radio
              input(type='radio', name='modality_of_contracting', value='PJ', v-model='employee.modality_of_contracting')
              |     PJ
          span.has-text-danger(v-if='isInvalidModalityOfContracting.status') {{isInvalidModalityOfContracting.error}}

    .field.is-grouped.is-grouped-right(v-if='!loading')
      p.control
        button.button.is-info(
          @click='ok(employee, $event)',
        ) {{okButton}}
      p.control
        a.button.is-light(@click='cancel()') {{cancelButton}}
    .field(v-if='loading')
        a.button.is-info.is-loading.fullWidth

</template>

<script>
import _ from 'lodash'
export default {
  props: {
    employeeProp: { type: Object, default: () => {} },
    okButton: { type: String, default: 'Salvar' },
    cancelButton: { type: String, default: 'Cancelar' },
    formTitle: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  },
  data () {
    return {
      employee: {},
      isInvalidName: {status: false, error: ''},
      isInvalidSalary: {status: false, error: ''},
      isInvalidProfession: {status: false, error: ''},
      isInvalidModalityOfContracting: {status: false, error: ''}
    }
  },
  watch: {
    employeeProp (newValue) {
      this.employee = _.clone(newValue)
    }
  },
  methods: {
    ok (employee, event) {
      event.preventDefault()
      if (this.checkForm(employee)) {
        this.$emit('onOk', employee)
      }
    },
    cancel () {
      this.$emit('onCancel')
    },
    checkForm (employee) {
      return this.verifyNameField(employee.name) &&
        this.verifySalaryField(employee.salary) &&
        this.verifyProfessionField(employee.profession) &&
        this.verifyModalityOfContractingField(employee.modality_of_contracting)
    },
    verifyNameField (employeeName) {
      if (employeeName && employeeName.match('[0-9]')) {
        this.isInvalidName.status = true
        this.isInvalidName.error = 'Nome inválido, somente letras'
        return false
      } else if (!employeeName || employeeName.length === 0) {
        this.isInvalidName.status = true
        this.isInvalidName.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidName.status = false
        return true
      }
    },
    verifySalaryField (employeeEmail) {
      if (!employeeEmail || employeeEmail.length === 0) {
        this.isInvalidSalary.status = true
        this.isInvalidSalary.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidSalary.status = false
        return true
      }
    },
    verifyProfessionField (employeeProfession) {
      if (!employeeProfession || employeeProfession.length === 0) {
        this.isInvalidProfession.status = true
        this.isInvalidProfession.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidProfession.status = false
        return true
      }
    },
    verifyModalityOfContractingField (employeeModalityOfContracting) {
      if (!employeeModalityOfContracting) {
        this.isInvalidModalityOfContracting.status = true
        this.isInvalidModalityOfContracting.error = 'Escolha uma das opções'
        return false
      } else {
        this.isInvalidModalityOfContracting.status = false
        return true
      }
    }
  }
}
</script>

<style lang='scss'>
.employee-form {
  border: 1px solid #01bca2;
  padding: 20px;
  border-radius: 10px;
}
</style>
