<template lang='pug'>
.container
  h1.title {{formTitle}}
  form.project-form
    .field
      label.label Nome do projeto:
      .control
        input#name.input(
          type='text',
          placeholder="Projeto exemplo",
          v-model='project.name',
          v-bind:class='{"is-danger": isInvalidName.status}',
          @input='verifyNameField(project.name)'
        )
        span.has-text-danger(v-if='isInvalidName.status') {{isInvalidName.error}}
    .field
      label.label Cliente:
      .control
        .select.fullWidth(v-bind:class='{"is-danger": isInvalidClient.status}')
          select.fullWidth(v-model='project.client', @change='verifyClientField(project.client)')
            option(disabled selected value='null') Selecione o cliente
            option(v-for='client in clients', :key='client.id', :value='client') {{client.name}}
        .control
          span.has-text-danger(v-if='isInvalidClient.status') {{isInvalidClient.error}}
    .field
      label.label Squad:
      .control
        .select.fullWidth(v-bind:class='{"is-danger": isInvalidSquad.status}')
          select.fullWidth(v-model='project.squad', @change='verifySquadField(project.squad)')
            option(disabled selected value='null') Selecione o squad
            option(v-for='squad in squads', :key='squad.id', :value='squad') {{squad.name}}
        .control
          span.has-text-danger(v-if='isInvalidSquad.status') {{isInvalidSquad.error}}
    .field
      label.label Valor estimado (R$):
      .control
        input#estimatedvalue.input(
          type='number',
          placeholder='Valor estimado do projeto',
          min='100',
          v-model='project.estimated_value',
          v-bind:class='{"is-danger": isInvalidEstimatedValue.status}',
          @input='verifyEstimatedValueField(project.estimated_value)',
          @blur='formatProfit()'
        )
        span.has-text-danger(v-if='isInvalidEstimatedValue.status') {{isInvalidEstimatedValue.error}}
    .field
      label.label Prazo estimado:
      .control
        label.radio
          input(
            type='radio',
            name='time',
            value='horas',
            v-model='project.estimated_time.type',
            @input='verifyEstimatedTimeField(project.estimated_time)',
            @change='formatDate(beginDate, project.estimated_time)'
          )
          |     Horas
        label.radio
          input(
            type='radio',
            name='time',
            value='dias',
            v-model='project.estimated_time.type',
            @input='verifyEstimatedTimeField(project.estimated_time)',
            @change='formatDate(beginDate, project.estimated_time)'
          )
          |     Dias
        label.radio
          input(
            type='radio',
            name='time',
            value='meses',
            v-model='project.estimated_time.type',
            @input='verifyEstimatedTimeField(project.estimated_time)',
            @change='formatDate(beginDate, project.estimated_time)'
          )
          |     Meses
        .control
          span.has-text-danger(v-if='isInvalidEstimatedTimeType.status') {{isInvalidEstimatedTimeType.error}}
      .control
        input#estimatedtime.input(
          type='number',
          placeholder='Prazo estimado do projeto',
          min='1',
          v-model='project.estimated_time.time',
          v-bind:class='{"is-danger": isInvalidEstimatedTime.status}',
          @input='verifyEstimatedTimeField(project.estimated_time)',
          @change='formatDate(beginDate, project.estimated_time)'
        )
        span.has-text-danger(v-if='isInvalidEstimatedTime.status') {{isInvalidEstimatedTime.error}}
    .field
      label.label Data de início:
      .control
        Datepicker(
          :config='{ wrap: true, dateFormat: "d/m/Y", locale }',
          v-model='beginDate'
          placeholder='DD/MM/AAAA'
        )
        span.has-text-danger(v-if='isInvalidBeginDate.status') {{isInvalidBeginDate.error}}
    .field(v-if='project.finish_date')
      label.label Data de Término: &nbsp;
        span {{project.finish_date | brDate}}
    .field
      label.label Custo: &nbsp;
        span
          | {{project.cost | brCurrency }}
    .field
      label.label Lucro: &nbsp;
        span(v-bind:class='{"has-text-danger": isProfitValueNegative, "has-text-success": !isProfitValueNegative}')
          | {{project.profit | brCurrency }}
    .field.is-grouped.is-grouped-right(v-if='!loading')
      p.control
        button.button.is-info(
          @click='ok(project, $event)',
        ) {{okButton}}
      p.control
        a.button.is-light(@click='cancel()') {{cancelButton}}
    .field(v-if='loading')
        a.button.is-info.is-loading.fullWidth

</template>

<script>
import Datepicker from 'vue-bulma-datepicker'
import locale from '../../json/datepicker-locale.json'
import _ from 'lodash'
export default {
  components: {
    Datepicker
  },
  props: {
    projectProp: { type: Object, default: () => {} },
    clientsProp: { type: Array, default: () => [] },
    squadsProp: { type: Array, default: () => [] },
    okButton: { type: String, default: 'Salvar' },
    cancelButton: { type: String, default: 'Cancelar' },
    formTitle: { type: String, default: '' },
    loading: { type: Boolean, default: false }
  },
  data () {
    return {
      locale,
      clients: [],
      squads: [],
      beginDate: '',
      project: {
        profit: 0.0,
        estimated_time: {},
        cost: 0.0
      },
      isInvalidName: { status: false, error: '' },
      isInvalidClient: { status: false, error: '' },
      isInvalidSquad: { status: false, error: '' },
      isInvalidEstimatedValue: { status: false, error: '' },
      isInvalidEstimatedTime: { status: false, error: '' },
      isInvalidEstimatedTimeType: { status: false, error: '' },
      isInvalidBeginDate: { status: false, error: '' },
      isProfitValueNegative: false
    }
  },
  watch: {
    projectProp (newValue) {
      this.project = _.clone(newValue)
      this.beginDate = _.clone(this.project.begin_date || '')
      this.isProfitValueNegative = _.clone(this.project.profit <= 0 || false)
    },
    clientsProp (newValue) {
      this.clients = _.clone(newValue)
    },
    squadsProp (newValue) {
      this.squads = _.clone(newValue)
    },
    beginDate (newValue) {
      this.formatDate(newValue, this.project.estimated_time)
    }
  },
  methods: {
    ok (project, event) {
      event.preventDefault()
      if (this.checkForm(project)) {
        this.$emit('onOk', project)
      }
    },
    cancel () {
      this.$emit('onCancel')
    },
    formatDate (beginDate, estimatedTime) {
      if (beginDate && estimatedTime) {
        let finishDate = new Date()
        let spliDate = beginDate.split('/')
        beginDate = new Date(`${spliDate[1]}/${spliDate[0]}/${spliDate[2]}`)
        let date = _.clone(new Date(beginDate))
        this.project.begin_date = _.clone(date)
        if (estimatedTime.type === 'horas') {
          finishDate = new Date(date.setHours(date.getHours() + estimatedTime.time))
        } else if (estimatedTime.type === 'dias') {
          finishDate = new Date(date.setDate(date.getDay() + Math.ceil(estimatedTime.time)))
        } else if (estimatedTime.type === 'meses') {
          finishDate = new Date(date.setMonth(date.getMonth() + Math.ceil(estimatedTime.time)))
        }
        this.project.finish_date = _.clone(finishDate)
        return finishDate
      }
    },
    formatProfit () {
      if (this.project.estimated_value && this.project.squad) {
        this.project.cost = parseFloat(this.project.squad.cost)
        this.project.profit = parseFloat(this.project.estimated_value) - this.project.cost
        this.isProfitValueNegative = this.project.profit <= 0 || false
      }
    },
    checkForm (project) {
      return (
        this.verifyNameField(project.name) &&
        this.verifyClientField(project.client) &&
        this.verifySquadField(project.squad) &&
        this.verifyEstimatedValueField(project.estimated_value) &&
        this.verifyEstimatedTimeField(project.estimated_time) &&
        this.verifyBeginDateField(this.beginDate)
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
    verifyBeginDateField (beginDate) {
      if (!beginDate) {
        this.isInvalidBeginDate.status = true
        this.isInvalidBeginDate.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidBeginDate.status = false
        return true
      }
    },
    verifyEstimatedValueField (estimatedValue) {
      if (!estimatedValue) {
        this.isInvalidEstimatedValue.status = true
        this.isInvalidEstimatedValue.error = 'Preencha este campo obrigatório'
        return false
      } else if (estimatedValue < 100) {
        this.isInvalidEstimatedValue.status = true
        this.isInvalidEstimatedValue.error = 'O valor estimado deve ser maior ou igual 100'
        return false
      } else {
        this.isInvalidEstimatedValue.status = false
        return true
      }
    },
    verifyEstimatedTimeField (estimatedTime) {
      if (!estimatedTime) {
        this.isInvalidEstimatedTimeType.status = this.isInvalidEstimatedTime.status = true
        this.isInvalidEstimatedTimeType.error = this.isInvalidEstimatedTime.error = 'Preencha este campo obrigatório'
        return false
      } else if (!estimatedTime.time) {
        this.isInvalidEstimatedTime.status = true
        this.isInvalidEstimatedTime.error = 'Preencha este campo obrigatório'
        return false
      } else if (!estimatedTime.type) {
        this.isInvalidEstimatedTimeType.status = true
        this.isInvalidEstimatedTimeType.error = 'Preencha este campo obrigatório'
        return false
      } else if (estimatedTime.time <= 0) {
        this.isInvalidEstimatedTime.status = true
        this.isInvalidEstimatedTime.error = 'O valor estimado deve ser maior ou igual 1'
        return false
      } else {
        this.isInvalidEstimatedTimeType.status = this.isInvalidEstimatedTime.status = false
        return true
      }
    },
    verifyClientField (client) {
      if (!client || client.length === 0) {
        this.isInvalidClient.status = true
        this.isInvalidClient.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidClient.status = false
        return true
      }
    },
    verifySquadField (squad) {
      if (!squad || squad.length === 0) {
        this.isInvalidSquad.status = true
        this.isInvalidSquad.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidSquad.status = false
        return true
      }
    }
  },
  mounted () {
    this.isProfitValueNegative = _.clone(this.project.profit <= 0 || false)
  }
}
</script>

<style lang='scss'>
.project-form {
  border: 1px solid #01bca2;
  padding: 20px;
  border-radius: 10px;
}
</style>
