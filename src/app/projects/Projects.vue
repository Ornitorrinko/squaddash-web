<template lang='pug'>
.projects
  Notification(
    :title='notification.title',
    :message='notification.message',
    :type='notification.messageClass',
    :open='notification.open',
    :duration='3500'
  )
  .container
    h1.title Projetos
    .columns
      .column
        router-link.button.is-squadDash.is-outlined(:to='{ path: `/projetos/cadastro`}') Criar projeto
      .column
        .control.has-icons-right
          input#search.input.squadDash-input(type='text', placeholder='Pesquisar por projeto', @input='searchTable()')
          span.icon.is-right
            i.fa.fa-search
  .container
    .table
      table#table.table-content
        thead
          th.table-content-head-item Projeto
          th.table-content-head-item Cliente
          th.table-content-head-item Squad
          th.table-content-head-item Data de início
          th.table-content-head-item Data de término
          th.table-content-head-item Status
          th.table-content-head-item
        tbody
          tr.table-content-row(v-for='(project, index) in projects')
            td.table-content-row-item {{project.name}}
            td.table-content-row-item(v-if='project.client.logo')
              img.image-100(:src='project.client.logo')
            td.table-content-row-item(v-if='!project.client.logo') {{project.client.name}}
            td.table-content-row-item {{project.squad.name}}
            td.table-content-row-item {{project.begin_date | brDate}}
            td.table-content-row-item {{project.finish_date | brDate}}
            td.table-content-row-item {{project.status | boolFormat('Ativado', 'Desativado')}}
            td.table-content-row-item
              .actions
                span.fa.fa-eye.actions-link(@click='openProjectViewModal(project)', title='ver detalhes')
                router-link.actions-link(:to='{ path: `/projetos/editar/${project.id}` }')
                  span.fa.fa-edit(title='editar projeto')
                span.fa.fa-toggle-on.actions-link(v-if='project.status', @click='changeStatus(false, index)', title='desativar projeto')
                span.fa.fa-toggle-off.actions-link(v-if='!project.status', @click='changeStatus(true, index)', title='ativar projeto')
                span.fa.fa-trash.actions-link(title='excluir projeto', @click='openProjectConfirmModal(project)')
  ProjectViewModal(
    :project='selectedProject',
    :showModal='showProjectViewModal',
    @onClose='closeProjectViewModal'
  )
  ConfirmModal(
    :item='selectedProject',
    :showModal='showProjectConfirmModal',
    :text='`Deseja excluir ${selectedProject.name}?`',
    :okButton='{text: "Excluir", className: "danger"}',
    :cancelButton='{text: "Cancelar", className: ""}',
    @onClose='closeProjectConfirmModal',
    @onSubmit='deleteProject'
  )
</template>

<script>
import _ from 'lodash'
import Utils from '../../utils/index'
import ProjectViewModal from './ProjectViewModal'
import ConfirmModal from '../../components/ConfirmModal'
import Notification from '../../components/Notification'
export default {
  components: {
    ProjectViewModal,
    ConfirmModal,
    Notification
  },
  computed: {
    allProjects () {
      return this.$store.state.Projects.allProjects
    },
    messageClass () {
      return this.$store.state.Projects.messageClass
    },
    title () {
      return this.$store.state.Projects.title
    },
    message () {
      return this.$store.state.Projects.message
    },
    loading () {
      return this.$store.state.loading
    }
  },
  data () {
    return {
      projects: [],
      showProjectViewModal: false,
      showProjectConfirmModal: false,
      selectedProject: {
        client: {},
        squad: {},
        estimated_time: {}
      },
      notification: {
        open: false
      }
    }
  },
  methods: {
    changeStatus (value, index) {
      let project = this.projects[index]
      project.status = value
      this.$store.dispatch('editProject', project).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
        }
      })
    },
    deleteProject (project) {
      project.deleted = true
      this.$store.dispatch('deleteProject', project).then(() => {
        if (this.messageClass === 'success') {
          this.openNotification(this.message, this.messageClass, this.title)
          this.closeProjectConfirmModal(false)
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
    openProjectViewModal (project) {
      this.selectedProject = project
      this.showProjectViewModal = true
    },
    openProjectConfirmModal (project) {
      this.selectedProject = project
      this.showProjectConfirmModal = true
    },
    closeProjectViewModal (value) {
      this.showProjectViewModal = value
    },
    closeProjectConfirmModal (value) {
      this.showProjectConfirmModal = value
    },
    searchTable () {
      Utils.searchTable()
    }
  },
  created () {
    this.$store.dispatch('getAllProjects').then(() => {
      this.projects = _.clone(_.filter(this.allProjects, item => !item.deleted))
    })
  }
}
</script>

<style lang='scss'>
.projects {
  margin-top: 2%;
}
</style>
