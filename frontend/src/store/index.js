import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mutations = {
  INCREMENT_COUNT: 'incrementCount',
}

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
  },
  actions: {
    incrementCount(Store) {
      Store.commit(mutations.INCREMENT_COUNT)
    },
    async fetchUser(store, id) {
      const usersRequest = await axios.get(`/api/mains/${id}`)
      return usersRequest.data
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/mains')
      return usersRequest.data
    },
  },
  modules: {},
})
