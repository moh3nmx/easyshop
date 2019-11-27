import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  user: null
})

export const getters = {
  userInfo: state => { return state.auth.user.first_name + ' ' + state.auth.user.last_name }
}