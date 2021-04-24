import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from './config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    packages: [],
    packageVersions: [],
    queryText: '',
    countPackages: 0,
    packageFiles: [],
  },
  mutations: {
    setPackagesDataBySearch: (state, packages) => {
      state.packages = packages
    },
    setCountPackages(state, count) {
      state.countPackages = count;
    },
    setPackageVersions(state, packageVersions) {
      state.packageVersions = packageVersions;
    },
    setPackageFiles(state, packageFiles) {
      state.packageFiles = packageFiles;
    },
    setQueryText(state, queryText) {
      state.queryText = queryText;
    },
  },
  actions: {
    async getPackagesBySearch({commit, state}, payload = {}) {
      const api_url = 'https://registry.npmjs.org/'
      const packages = await axios.get(`${api_url}-/v1/search?text=${payload.queryText}&size=${payload.size}&from=${payload.from}`)
      .then((response) => {
        commit('setPackagesDataBySearch', response.data.objects)
        commit('setCountPackages', response.data.total)
        commit('setQueryText', payload.queryText)
      })
      .catch((error) => {
        console.log('Ошибка получения данных getPackagesBySearch:', error)
      })
    },

    async getPackageVersions({commit, state}, queryText = '') {
      const packages = await axios.get(config.API_URL + queryText)
      .then((response) => {
        commit('setPackageVersions', response.data)
      })
      .catch((error) => {
        console.log('Ошибка получения данных getPackageVersions:', error)
      })
    },

    async getPackageFiles({commit, state}, payload =  {}) {
      const packages = await axios.get(config.API_URL + payload.packageName + '@' +payload.packageVersion)
      .then((response) => {
        commit('setPackageFiles', response.data)
      })
      .catch((error) => {
        console.log('Ошибка получения данных getPackageFiles:', error)
      })
    },
  },
})

export default store;
