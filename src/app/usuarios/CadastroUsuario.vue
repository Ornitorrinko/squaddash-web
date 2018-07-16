<template lang='pug'>
.cadastro-usuario
  .container
    h1.title Cadastro
    .field
      label.label Senha de segurança:
      .control
        input.input(type="password", placeholder="senha para liberar o formulário de cadastro")
    form
      .field
        label.label Nome completo:
        .control
          input.input(type="text", placeholder="Fulano de Beltrano Costa")
      .field
        label.label Email:
        .control
          input.input(type="email", placeholder="exemplo@dominio.com.br")
      .field
        label.label Senha:
        .control
          input.input(type="password", placeholder="mínimo 6 caractéres")
      .field.is-grouped.is-grouped-right
        p.control
          a.button.is-primary Salvar
        p.control
          a.button.is-light Cancelar

</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang='scss'>
.cadastro-usuario {
  margin-top: 5%;
}
</style>
