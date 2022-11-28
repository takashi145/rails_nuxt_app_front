<template>
  <user-form-card>
    <template
      #user-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-email
          :email.sync="params.auth.email"
        />
        <user-form-password
          :password.sync="params.auth.password"
        />
        <v-card-actions>
          <nuxt-link
            to="#"
          >
            パスワードをお忘れですか？
          </nuxt-link>
        </v-card-actions>
        <v-btn
          :disabled="!isValid"
          :loading="loading"
          block
          color="myblue"
          class="white--text"
          @click="login"
        >
          ログイン
        </v-btn>
      </v-form>
      <v-card-text>
    </v-card-text>
    </template>
  </user-form-card>
</template>

<script>
export default {
  layout: 'before-login',

  data () {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: '', password: '' } }
    }
  },
  methods: {
    login () {
      this.loading = true
      setTimeout(() => {
        this.$store.dispatch('login')
        this.$router.replace('/')
        this.loading = false
      }, 1500)
    }
  }
}
</script>
