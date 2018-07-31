<template lang='pug'>
.project-register
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  .container
    h1.title Cadastro de projeto
    form.project-form
      .field
        label.label Nome do projeto:
        .control
          input#name.input(
            type="text",
            placeholder="Projeto exemplo",
            required,
            v-model='project.name',
            v-bind:class='{"is-danger": isInvalidName.status}',
            @input='verifyNameField(project.name)'
          )
          span.has-text-danger(v-if='isInvalidName.status') {{isInvalidName.error}}
      .field
        label.label Cliente:
        .control
          .select.fullWidth
            select.fullWidth(v-model='project.client', v-bind:class='{"is-danger": isInvalidClient.status}')
              option(disabled selected value='null') Selecione o cliente
              option(v-for='client in clients', :key='client.id', :value='client') {{client.name}}
            span.has-text-danger(v-if='isInvalidClient.status') {{isInvalidClient.error}}
      .field
        label.label Squad:
        .control
          .select.fullWidth
            select.fullWidth(v-model='project.squad', v-bind:class='{"is-danger": isInvalidSquad.status}')
              option(disabled selected value='null') Selecione o squad
              option(v-for='squad in squads', :key='squad.id', :value='squad') {{squad.name}}
            span.has-text-danger(v-if='isInvalidSquad.status') {{isInvalidSquad.error}}
      .field
        label.label Valor estimado (R$):
        .control
          input#estimatedvalue.input(
            type="text",
            placeholder="Valor estimado do projeto,",
            v-model='project.profit',
            @input='verifyProfitField(project.profit)',
            v-bind:class='{"is-danger": isInvalidProfit.status}',
            required
          )
          span.has-text-danger(v-if='isInvalidProfit.status') {{isInvalidProfit.error}}
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
import Notification from '../../components/Notification'
import _ from 'lodash'
export default {
  components: {
    Notification
  },
  props: {
    projectProp: {type: Object, default: () => {}},
    clientsProp: {type: Array, default: () => []},
    squadsProp: {type: Array, default: () => []},
    okButton: {type: String, default: 'Salvar'},
    cancelButton: {type: String, default: 'Cancelar'},
    notification: {type: Object, default: () => {}},
    loading: {type: Boolean, default: false}
  },
  data () {
    return {
      clients: [],
      squads: [],
      project: {},
      isInvalidName: {status: false, error: ''},
      isInvalidClient: {status: false, error: ''},
      isInvalidSquad: {status: false, error: ''},
      isInvalidProfit: {status: false, error: ''}
    }
  },
  watch: {
    projectProp (newValue) {
      this.project = _.clone(newValue)
    },
    clientsProp (newValue) {
      this.clients = _.clone(newValue)
    },
    squadsProp (newValue) {
      this.squads = _.clone(newValue)
    }
  },
  methods: {
    ok (project, event) {
      event.preventDefault()
      if (this.checkForm(project)) {
        this.$emit('onOkClick', project)
      }
    },
    cancel () {
      this.$emit('onCancelClick')
    },
    checkForm (project) {
      return this.verifyNameField(project.name) &&
        this.verifyProfitField(project.profit) &&
        this.verifySquadField(project.squad) &&
        this.verifyClientField(project.cSlient)
    },
    verifyNameField (name) {
      if (!name && name.length === 0) {
        this.isInvalidName.status = true
        this.isInvalidName.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidName.status = false
        return true
      }
    },
    verifyProfitField (profit) {
      if (!profit && profit.length === 0) {
        this.isInvalidProfit.status = true
        this.isInvalidProfit.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidProfit.status = false
        return true
      }
    },
    verifyClientField (client) {
      if (!client && Object.keys(client).length === 0) {
        this.isInvalidClient.status = true
        this.isInvalidClient.error = 'Preencha este campo obrigatório'
        return false
      } else {
        this.isInvalidClient.status = false
        return true
      }
    },
    verifySquadField (squad) {
      if (!squad && Object.keys(squad).length === 0) {
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
    console.log(this.project)
  }
}
</script>

<style lang='scss'>
.project-register {
  margin-top: 2%;
}
.project-form {
  border: 1px solid #01bca2;
  padding: 20px;
  border-radius: 10px;
}
</style>
