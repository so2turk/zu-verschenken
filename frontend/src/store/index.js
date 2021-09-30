import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mutations = {
  INCREMENT_COUNT: 'incrementCount',
  SET_MAIN: 'set main',
}

const store = new Vuex.Store({
  state: {
    count: 0,
    main: null,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    [mutations.SET_MAIN](state, main) {
      state.main = main
    },
  },
  actions: {
    incrementCount(Store) {
      Store.commit(mutations.INCREMENT_COUNT)
    },
    async fetchUser(store, id) {
      const userRequest = await axios.get(`/api/mains/${id}`)
      return userRequest.data
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/mains')
      return usersRequest.data
    },
    async fetchSession({ commit }) {
      const main = await axios.get('/api/account/session')
      commit(mutations.SET_MAIN, main.data || null)
    },
    async login({ commit }, credentials) {
      try {
        const main = await axios.post('/api/account/session', credentials)
        commit(mutations.SET_MAIN, main.data)
      } catch (e) {
        throw e
      }
    },
    async register(store, main) {
      return axios.post('/api/account', main)
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session')
      commit(mutations.SET_MAIN, null)
    },
    async fetchGifts() {
      const giftsRequest = await axios.get('/api/gifts')
      return giftsRequest.data
    },
    async fetchGift(store, id) {
      const giftRequest = await axios.get(`/api/gifts/${id}`)
      return giftRequest.data
    },
  },
  modules: {},
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
