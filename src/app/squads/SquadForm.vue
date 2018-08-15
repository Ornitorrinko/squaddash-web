<template lang='pug'>
.container
  h1.title {{formTitle}}
  form.squad-form
    .field
      label.label Nome do squad:
      .control
        input#name.input(
          type='text',
          placeholder="Suicide Squad",
          v-model='squad.name',
          v-bind:class='{"is-danger": isInvalidName.status}',
          @input='verifyNameField(squad.name)'
        )
        span.has-text-danger(v-if='isInvalidName.status') {{isInvalidName.error}}
    .field
      label.label Funcionários:
      .control
        a.button.is-primary Selecionar Funcionários
    .field
      label.label Custo: &nbsp;
        span
          | {{squad.cost | brCurrency }}
    .field.is-grouped.is-grouped-right(v-if='!loading')
      p.control
        button.button.is-info(
          @click='ok(squad, $event)',
        ) {{okButton}}
      p.control
        a.button.is-light(@click='cancel()') {{cancelButton}}
    .field(v-if='loading')
        a.button.is-info.is-loading.fullWidth
  SquadSelectEmployeesModal(:showModal='true')

</template>

<script>
import _ from 'lodash'
import SquadSelectEmployeesModal from './SquadSelectEmployeesModal'
export default {
  components: {
    SquadSelectEmployeesModal
  },
  props: {
    squadProp: { type: Object, default: () => {} },
    okButton: { type: String, default: 'Salvar' },
    cancelButton: { type: String, default: 'Cancelar' },
    formTitle: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  },
  data () {
    return {
      employees: [],
      squad: {},
      isInvalidName: { status: false, error: '' },
      isInvalidEmployees: { status: false, error: '' }
    }
  },
  watch: {
    squadProp (newValue) {
      this.squad = _.clone(newValue)
    },
    employeesProp (newValue) {
      this.employees = _.clone(newValue)
    }
  },
  methods: {
    ok (squad, event) {
      event.preventDefault()
      if (this.checkForm(squad)) {
        this.$emit('onOk', squad)
      }
    },
    cancel () {
      this.$emit('onCancel')
    },
    checkForm (squad) {
      return (
        this.verifyNameField(squad.name) &&
        this.verifyEmployeeField(squad.client)
      )
    },
    verifyNameField (name) {
      if (!name || name.length === 0) {
        this.isInvalidName.status = true
        this.isInvalidName.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidName.status = false
        return true
      }
    },
    verifyEmployeeField (employees) {
      if (!employees || employees.length === 0) {
        this.isInvalidEmployees.status = true
        this.isInvalidEmployees.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidEmployees.status = false
        return true
      }
    }
  }
}
</script>

<style lang='scss'>
.squad-form {
  border: 1px solid #01bca2;
  padding: 20px;
  border-radius: 10px;
}
</style>
