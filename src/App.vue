<template>
  <div id="app">
    <header class="sticky bg-white pin-t pin-l pin-r shadow p-4 z-10" v-if="isShowHeader">
      <nav class="text-center">
        <router-link to="/" class="no-underline mx-4 text-grey-darker hover:text-grey-darkest">Transactions</router-link>
        <router-link to="/reports" class="no-underline mx-4 text-grey-darker hover:text-grey-darkest">Reports</router-link>
      </nav>
    </header>
    <main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </main>

    <notifications group="notify" width="400" position="top center" classes="vue-notification-custom"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      hideHeader: ['/login']
    }
  },
  computed: {
    isShowHeader () {
      return ! this.hideHeader.includes(this.$route.path)
    }
  },
  created () {
    axios.interceptors.response.use(undefined, (err) => {
      return new Promise((resolve, reject) => {
        if (err.response.status === 401) {
          this.$store.dispatch('AUTH_LOGOUT')
          this.$router.push('/login')
        }
        throw err
      })
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,600,600i&subset=vietnamese');

body, html {
  width: 100%;
  height: 100%;
}

body {
  font-family: 'IBM Plex Sans', sans-serif;
  background-color: #F1F5F8;
  font-size: 18px;
}

main {
  margin: 3rem auto;
  width: calc(100% - 4rem);
  max-width: 500px;
}

.router-link-exact-active {
  font-weight: 600;
  color: #3d4852;
}

.notifications {
  top: 10px !important;
}

.vue-notification-custom {
  padding: 15px;
  margin: 0 5px 5px;

  font-size: 16px;

  color: #ffffff;
  background: #44A4FC;
  border-radius: 4px;
}

.vue-notification-custom.warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification-custom.error {
  background: #E54D42;
  border-left-color: #B82E24;
}

.vue-notification-custom.success {
  background: #68CD86;
  border-left-color: #42A85F;
}
</style>
