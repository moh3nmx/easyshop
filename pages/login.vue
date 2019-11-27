<template>
  <div class="container">
    <div class="login-card-holder">
      <md-card>
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <p>Login to your Dashboard panel.</p>
          <form method="post" id="login_form" @submit.prevent="login">
            <md-field md-clearable>
              <label>Email</label>
              <md-input name="email" v-model="email" type="email" required></md-input>
            </md-field>

            <md-field>
              <label>Password</label>
              <md-input name="password" v-model="password" type="password" required></md-input>
            </md-field>

          </form>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-primary" form="login_form" type="submit">Login</md-button>
          <md-button>Action</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'other',
  middleware: 'isauth',
  data: ()=>({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  }),
  methods: {
    login(){
      this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(()=>{
        this.$router.push('/')
      })
    }
  }
  
}
</script>

<style lang="scss">
  .container {
    position: relative;
    min-height: 100vh;
    .login-card-holder {
      position: absolute;
        top: 50%;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 100%;
      .md-card {
        width: 60%;
        max-width: 400px;
        margin: auto;
      }
    }
  }
</style>