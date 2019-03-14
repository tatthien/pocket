<template>
  <div class="rounded shadow p-4 bg-white">
    <h2 class="text-2xl font-normal mb-6">Login</h2>

    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="username" class="block mb-2 font-semibold">Username</label>
        <input type="text" id="username" class="rounded border p-2 w-full" v-model="username" required>
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-2 font-semibold">Password</label>
        <input type="password" id="password" class="rounded border p-2 w-full" v-model="password" required>
      </div>

      <button class="text-white p-2 px-4 bg-blue hover:bg-blue-light rounded ladda-button submit-button" data-style="slide-right">
        <span class="ladda-label">Login</span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import * as ladda from 'ladda'
export default {
  data () {
    return {
      username: 'tatthien',
      password: '123456'
    }
  },
  beforeCreate () {
    if (this.$store.state.user) {
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      let l = ladda.create(document.querySelector('.submit-button'))
      if (l.isLoading()) {
        return
      }
      l.start()
      
      const { username, password } = this
      this.$store.dispatch('AUTH_REQUEST', { username, password })
        .then(() => {
          l.stop()
          this.$router.push('/')
        })
        .catch(err => {
          this.$notify({
            group: 'notify',
            type: 'error',
            text: err.response.data.msg
          })
          l.stop()
        })
    }
  }
}
</script>
