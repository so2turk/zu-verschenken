import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import io from 'socket.io-client'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = true

Vue.use(Vuex)

const socket = io(process.env.VUE_APP_BASE_URL)

const mutations = {
  INCREMENT_COUNT: 'incrementCount',
  SET_USER: 'set user',
  SET_LIVE_STREAM: 'set live stream',
  ADD_LIVE_STREAM: 'add live stream',
  ADD_MESSAGE_TO_LIVE_STREAM: 'add message to live stream',
  DARK_MODE: 'dark mode',
}

const store = new Vuex.Store({
  state: {
    count: 0,
    user: null,
    currentLiveStream: null,
    liveStreams: [],
    liveStreamMessages: [],
    dark: false,
  },
  mutations: {
    [mutations.INCREMENT_COUNT](state) {
      state.count++
    },
    [mutations.SET_USER](state, user) {
      state.user = user
    },
    [mutations.SET_LIVE_STREAM](state, live) {
      state.currentLiveStream = live
    },
    [mutations.ADD_LIVE_STREAM](state, stream) {
      state.liveStreams.push(stream)
    },
    [mutations.ADD_MESSAGE_TO_LIVE_STREAM](state, message) {
      state.liveStreamMessages.push(message)
    },
    [mutations.DARK_MODE](state) {
      state.dark = !state.dark
    },
  },
  actions: {
    incrementCount(Store) {
      Store.commit(mutations.INCREMENT_COUNT)
    },
    async fetchUser(store, id) {
      const userRequest = await axios.get(`/api/users/${id}`)
      return userRequest.data
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/users')
      return usersRequest.data
    },
    async fetchSession({ commit }) {
      const user = await axios.get('/api/account/session')
      commit(mutations.SET_USER, user.data || null)
    },
    async login({ commit }, credentials) {
      try {
        const user = await axios.post('/api/account/session', credentials)
        commit(mutations.SET_USER, user.data)
      } catch (e) {
        throw e
      }
    },
    async register(store, user) {
      return axios.post('/api/account', user)
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session')
      commit(mutations.SET_USER, null)
    },
    async fetchGifts() {
      const giftsRequest = await axios.get('/api/gifts')
      return giftsRequest.data
    },
    async fetchGift(store, id) {
      const giftRequest = await axios.get(`/api/gifts/${id}`)
      return giftRequest.data
    },
    async goLive({ state, commit }) {
      socket.emit('go live', state.user._id, status => {
        commit(mutations.SET_LIVE_STREAM, state.user._id)
      })
    },
    async addLiveStream({ state, commit }, stream) {
      commit(mutations.ADD_LIVE_STREAM, stream)
    },
    async sendMessageToLiveStream({ state, commit }, body) {
      const message = {
        body,
        author: state.user.name,
      }
      commit(mutations.ADD_MESSAGE_TO_LIVE_STREAM, message)
      socket.emit('new message', state.currentLiveStream, message)
    },
    async joinStream({ state, commit }, stream) {
      socket.emit('join stream', stream)
      commit(mutations.SET_LIVE_STREAM, stream)
    },
    async createComment(store, data) {
      return axios.post('/api/comments/', data)
    },
    async showInterest(store, data) {
      return axios.post('/api/users/interested', data)
    },
    async unInterest(store, data) {
      return axios.delete('/api/users/unInterested/' + data.giftId)
    },
    async addGift(store, data) {
      return axios.post('/api/users/addGift', data)
    },
    async addGiftPhoto(store, data) {
      return axios.post('/api/users/addGiftPhoto', data)
    },
    changeMode(Store) {
      Store.commit(mutations.DARK_MODE)
    },
    async addAvatar(store, data) {
      return axios.post('/api/photos/addAvatar', data)
    },
    async delAvatar(store, data) {
      return axios.post('/api/photos/delAvatar', data)
    },
    async take(store, data) {
      return axios.post('/api/users/take', data)
    },
    async delGift(store, data) {
      return axios.post('/api/gifts/delGift', data)
    },
    async leave(store, data) {
      return axios.post('/api/users/leave', data)
    },
  },
  modules: {},
})

socket.on('new live stream', user => {
  store.dispatch('addLiveStream', user)
})

socket.on('new live stream message', message => {
  store.commit(mutations.ADD_MESSAGE_TO_LIVE_STREAM, message)
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
