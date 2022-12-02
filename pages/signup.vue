<template>
  <user-form-card>
    <template
      #user-form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
        @submit.prevent="signup"
      >
        <user-form-name
          :name.sync="params.user.name"
        />
        <user-form-email
          :email.sync="params.user.email"
        />
        <user-form-password
          :password.sync="params.user.password"
        />
        <v-btn
          type="submit"
          :disabled="!isValid"
          :loading="loading"
          block
          color="myblue"
          class="white--text"
          @click="signup"
        >
          登録する
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
      params: { user: { name: '', email: '', password: '' } }
    }
  },
  methods: {
    signup () {
      this.loading = true
      setTimeout(() => {
        this.formReset()
        this.loading = false
      }, 1500)
    },
    formReset () {
      this.$refs.form.reset()
      this.params = { user: { name: '', email: '', password: '' } }
    }
  }
}
</script>
