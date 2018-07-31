<template lang='pug'>
.projects
  .container
    h1.title Projetos
    router-link.button.is-squadDash.is-outlined.font-size-20(:to='{ path: `/projetos/cadastro`}') Criar projeto
  .container
    .table
      table.table-content
        thead.table-content-head
          th.table-content-head-item Projeto
          th.table-content-head-item Cliente
          th.table-content-head-item Squad
          th.table-content-head-item Custo
          th.table-content-head-item Lucro
          th.table-content-head-item Status
          th.table-content-head-item Data de criação
          th.table-content-head-item
        tbody.table-content-body
          tr.table-content-row(v-for='project in projects')
            td.table-content-row-item {{project.name}}
            td.table-content-row-item {{project.client.name}}
            td.table-content-row-item {{project.squad.name}}
            td.table-content-row-item {{project.expense | brCurrency}}
            td.table-content-row-item {{project.profit | brCurrency}}
            td.table-content-row-item {{project.status | boolFormat('Ativado', 'Desativado')}}
            td.table-content-row-item {{project.created_at | brDate}}
            td.table-content-row-item
              .actions
                span.fa.fa-edit.actions-link
                .selections.actions-link
                  .switch_container
                    label.switch-label
                      input(type="checkbox")
                      .btn-toggle
                span.fa.fa-trash.actions-link
</template>

<script>
import _ from 'lodash'
export default {
  computed: {
    allProjects () {
      return this.$store.state.Projects.allProjects
    }
  },
  data () {
    return {
      projects: []
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
