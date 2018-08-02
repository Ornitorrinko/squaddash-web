<template lang='pug'>
.projects
  .container
    h1.title Projetos
    .columns
      .column
        router-link.button.is-squadDash.is-outlined(:to='{ path: `/projetos/cadastro`}') Criar projeto
      .column
        .control.has-icons-right
          input#search.input.squadDash-input(type='text', placeholder='Pesquisar', @input='searchTable()')
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
                span.fa.fa-eye.actions-link(@click='openModal(project)', title='ver detalhes')
                span.fa.fa-edit.actions-link(title='editar projeto')
                span.fa.fa-toggle-on.actions-link(v-if='project.status', @click='changeStatus(false, index)', title='desativar projeto')
                span.fa.fa-toggle-off.actions-link(v-if='!project.status', @click='changeStatus(true, index)', title='ativar projeto')
                span.fa.fa-trash.actions-link(title='excluir projeto')
  .modal(v-bind:class='{"is-active": showModal}')
    .modal-background(@click='closeModal()')
    .modal-card.oneFourthWidth
      header.modal-card-head
        p.modal-card-title Projeto {{selectedProject.name}}
        button.delete(aria-label='close', @click='closeModal()')
      section.modal-card-body.table
        table.table-content
          thead
            th.has-text-centered Cliente
            th.has-text-centered Squad
            th.has-text-centered Data início
            th.has-text-centered Data término
            th.has-text-centered Prazo estimado
            th.has-text-centered Valor estimado
            th.has-text-centered Custo
            th.has-text-centered Lucro
          tbody
            tr
              td.has-text-centered(v-if='selectedProject.client.logo')
                img.image-100(:src='selectedProject.client.logo')
              td.has-text-centered(v-if='!selectedProject.client.logo') {{selectedProject.client.name}}
              td.has-text-centered {{selectedProject.squad.name}}
              td.has-text-centered {{selectedProject.begin_date | brDate}}
              td.has-text-centered {{selectedProject.finish_date | brDate}}
              td.has-text-centered {{selectedProject.estimated_time.time}} {{selectedProject.estimated_time.type}}
              td.has-text-centered {{selectedProject.estimated_value | brCurrency}}
              td.has-text-centered {{selectedProject.cost | brCurrency}}
              td.has-text-centered {{selectedProject.profit | brCurrency}}
</template>

<script>
import _ from 'lodash'
import searchTable from '../../utils/search-table.js'
export default {
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
    openModal (project) {
      this.selectedProject = project
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    searchTable () {
      searchTable.searchTable()
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
