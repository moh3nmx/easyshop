<template>
  <div class="page-container default-layout">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">EasyShop Admin Dashboard</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="clipped">
        <md-toolbar class="md-transparent" md-elevation="0">
          Welcome {{ getUserInfo }}!
        </md-toolbar>

        <md-list>
                    
          <md-list-item to="/">
            <md-icon>home</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>

          <md-list-item>
            <md-icon>shopping_cart</md-icon>
            <span class="md-list-item-text">Orders</span>
          </md-list-item>

          <md-list-item to="/suppliers">
            <md-icon>storefront</md-icon>
            <span class="md-list-item-text">Suppliers</span>
          </md-list-item>

          <md-list-item>
            <md-icon>attach_money</md-icon>
            <span class="md-list-item-text">Transactions</span>
          </md-list-item>

          <md-list-item>
            <md-icon>supervised_user_circle</md-icon>
            <span class="md-list-item-text">Users</span>
          </md-list-item>
          <md-list-item @click="logout">
            <md-icon>power_settings_new</md-icon>
            <span class="md-list-item-text">Logout</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <nuxt/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'default',
    methods: {
      async logout() {
        await this.$auth.logout()
        this.$router.push('/login')
      },
    
    },
    computed: {
      getUserInfo() {
        return this.$store.getters.userInfo
      }
    },
  }
</script>

<style lang="scss">
  
  .default-layout {
    .md-app {
      min-height: 100vh;
      border: 1px solid rgba(#000, .12);
      .md-card {
        margin: 0 0;
      }
      .md-layout-item {
        &:not(:last-child){
          margin-right: 10px
        }
      }
      .md-content {
        padding: 15px
      }
    }

    .md-drawer {
      width: 230px;
      max-width: calc(100vw - 125px);
    }
  }


</style>