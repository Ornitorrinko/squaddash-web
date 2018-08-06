<template lang='pug'>
.projects
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
          tr.table-content-row(v-for='(project, index) in projects', v-if='!project.deleted')
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
                span.fa.fa-eye.actions-link(@click='openViewProjectModal(project)', title='ver detalhes')
                router-link(:to='{ path: `/projetos/editar/${project.id}` }')
                  span.fa.fa-edit.actions-link(title='editar projeto')
                span.fa.fa-toggle-on.actions-link(v-if='project.status', @click='changeStatus(false, index)', title='desativar projeto')
                span.fa.fa-toggle-off.actions-link(v-if='!project.status', @click='changeStatus(true, index)', title='ativar projeto')
                span.fa.fa-trash.actions-link(title='excluir projeto', @click='deleteProject(project)')
  ViewProjectModal(:project='selectedProject', :showModal='showModal', @onClose='closeViewProjectModal')
</template>

<script>
import _ from 'lodash'
import Utils from '../../utils/index'
import ViewProjectModal from './ViewProjectModal'
export default {
  components: {
    ViewProjectModal
  },
  computed: {
    allProjects () {
      return this.$store.state.Projects.allProjects
    }
  },
  data () {
    return {
      projects: [],
      showModal: false,
      selectedProject: {
        client: {},
        squad: {},
        estimated_time: {}
      }
    }
  },
  methods: {
    changeStatus (value, index) {
      this.projects[index].status = value
    },
    openViewProjectModal (project) {
      this.selectedProject = project
      this.showModal = true
    },
    closeViewProjectModal (value) {
      this.showModal = value
    },
    searchTable () {
      Utils.searchTable()
    }
  },
  created () {
    this.$store.dispatch('getAllProjects').then(() => {
      this.projects = _.clone(this.allProjects)
    })
  }
}
</script>

<style lang='scss'>
.projects {
  margin-top: 2%;
}
</style>
