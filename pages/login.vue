<template>
  <user-form-card>
    <template
      #user-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="login"
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
          type="submit"
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

  data ({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: 'user0@example.com', password: 'password' } },
      redirectPath: $store.state.loggedIn.homePath
    }
  },
  methods: {
    async login () {
      this.loading = true
      if (this.isValid) {
        await this.$axios.$post('/api/v1/auth_token', this.params)
          .then(res => this.authSuccessful(res))
          .catch((err) => {
            this.authFailure(err.response)
          })
      }
      this.loading = false
    },
    authSuccessful (res) {
      this.$auth.login(res)
      this.$router.push(this.redirectPath)
    },
    authFailure (res) {
      if (res && res.status === 404) {
        const msg = 'ユーザーが見つかりません'
        return this.$store.dispatch('getToast', { msg })
      }
    }
  }
}
</script>
