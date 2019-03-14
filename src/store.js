import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SET_USER = 'SET_USER'
const AUTH_REQUEST = 'AUTH_REQUEST'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_ERROR = 'AUTH_ERROR'
const AUTH_LOGOUT = 'AUTH_LOGOUT'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    user: JSON.parse(localStorage.getItem('user'))
  },
  getters: {
    isAuthenticated: state => !!state.token
  },
  actions: {
    [AUTH_REQUEST] ({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST)
        axios.post('/api/auth', { 
          username: user.username,
          password: user.password
        }).then(res => {
          let token = res.data.user.token
          localStorage.setItem('user-token', token)
          commit(AUTH_SUCCESS, token)

          // Set x-access-token for header
          axios.defaults.headers['x-access-token'] = token

          resolve(res)
        }).catch(err => {
          localStorage.removeItem('user-token')
          reject(err)
        })
      })
    },
    [AUTH_LOGOUT] ({commit}) {
      return new Promise((resolve, reject) => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token')
        delete axios.defaults.headers['x-access-token']
        resolve()
      })
    }
  },
  mutations: {
    [SET_USER] (state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    [AUTH_REQUEST] (state) {
      state.status = 'loading'
    },
    [AUTH_SUCCESS] (state, token) {
      state.status = 'success'
      state.token = token
    },
    [AUTH_ERROR] (state) {
      state.status = 'error'
    },
    [AUTH_LOGOUT] (state) {
      state.status = '',
      state.token = ''
    }
  }
})