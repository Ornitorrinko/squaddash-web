<template lang='pug'>
header.header
  nav.menu.columns
    .menu-brand.column
      router-link(:to='{ path: `/`}')
        img(src='../../assets/SquadDash-logo.png')
    .menu-navigation.column
      router-link(:to='{ path: `/`}')
        a.menu-item(v-bind:class='{"current-menu": verifyRoute() === "dashboard"}') Dashboard
    .menu-navigation.column
      router-link(:to='{ path: `/projetos`}')
        a.menu-item(v-bind:class='{"current-menu": verifyRoute() === "projetos"}') Projetos
    .menu-navigation.column
      router-link(:to='{ path: `/clientes`}')
        a.menu-item(v-bind:class='{"current-menu": verifyRoute() === "clientes"}') Clientes
    .menu-navigation.column
      router-link(:to='{ path: `/squads`}')
        a.menu-item(v-bind:class='{"current-menu": verifyRoute() === "squads"}') Squads
    .menu-navigation.column
      router-link(:to='{ path: `/funcionarios`}')
        a.menu-item(v-bind:class='{"current-menu": verifyRoute() === "funcionários"}') Funcionários
    .menu-navigation-dropdown
      .menu-dropdown
        a.menu-dropdown-link
          img(:src='user.profile_photo')
          span {{user.name}}
          span
            i.fa.fa-angle-down
        .dropdown
          router-link(:to='{ path: `/usuarios/edit/${user.id}`}')
            a.menu-dropdown-item Editar Perfil
          router-link(:to='{ path: `/usuarios`}')
            a.menu-dropdown-item Usuários
          a.menu-dropdown-item(@click='logout()') Sair

</template>

<script>
import localstorage from '../../utils/localstorage'
export default {
  data () {
    return {
      user: {
        id: 1,
        name: 'Mateus Costa',
        email: 'mateus@ornito.com.br',
        profile_photo: 'http://res.cloudinary.com/ornito-media/image/upload/v1531948013/squaddash/lor77kbxdgsmkwrtypdq.jpg',
        senha: 123456,
        status: true,
        role: 'admin',
        created_at: '2018-05-09 00:00:00',
        updated_at: '2018-05-09 00:00:00'
      }
    }
  },
  methods: {
    verifyRoute () {
      let route = this.$route.fullPath
      const isEmployeesRoute = route === '/funcionarios' ? 'funcionários' : null
      const isSquadsRoute = route === '/squads' ? 'squads' : null
      const isClientRoute = route === '/clientes' ? 'clientes' : null
      const isProjectRoute = route === '/projetos' ? 'projetos' : null
      const isDashboardRoute = route === '/' ? 'dashboard' : null
      return isDashboardRoute || isProjectRoute || isClientRoute || isSquadsRoute || isEmployeesRoute
    },
    logout () {
      localstorage.clear()
      window.location.reload()
    },
    verifyAuthenticatedUser (loggedTime) {
      let currentTime = new Date().getTime()
      if ((currentTime - loggedTime) >= 3600000) {
        this.user = {}
        this.logout()
      }
    }
  },
  mounted () {
    this.verifyAuthenticatedUser()
  }
}
</script>

<style lang='scss'>
.header {
  border-bottom: 1px solid #00d1b2;
  .menu-navigation {
    text-align: center;
  }
  .current-menu {
    padding-bottom: 10px;
    border-bottom: 3px solid #05bba2;
  }
  .menu-item {
    display: inline;
    line-height: 6;
    color: black;
    &:hover {
      padding-bottom: 10px;
      border-bottom: 3px solid #05bba2;
      font-weight: bold;
    }
  }
  .menu-navigation-dropdown {
    display: flex;
    text-align: left;
    width: 15%;
  }
  .menu-dropdown {
    cursor: pointer;
    .menu-dropdown-link {
      color: black;
      i {
        position: relative;
        left: 5px;
        font-size: 25px;
        color: #05bba2;
      }
      img {
        border-radius: 100px;
        width: 31%;
        height: 56%;
        position: relative;
        top: 26px;
        right: 10px;
      }
    }
    &:hover {
      .dropdown {
        display: block;
        position: absolute;
        border: 1px solid #54d0bf;
        padding: 20px;
        background-color: white;
        top: 80px;
        z-index: 1;
      }
    }
    .dropdown {
      display: none;
      &:hover {
        display: block;
      }
      .menu-dropdown-item {
        display: block;
        color: black;
        border-bottom: 1px solid #ccc;
        padding: 5px 0;
        &:hover {
          border-bottom: 1px solid #54d0bf;
          font-weight: bold;
          .dropdown {
            display: block;
          }
        }
      }
    }
  }

}
</style>
