import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    beers:[],
    currentBeer: null,
    emptyBeer: {
      name : null,
      img : null,
      price : 0
    }
  },
  mutations: {
    UPDATE_USER(state, user){
      state.currentUser = user
    },
    SET_BEERS(state, beers){
      state.beers = beers
    },
    SET_BEER(state,beer){
      state.currentBeer = beer
    },
    SET_EMPTYBEER(state, beer) {
      state.emptyBeer = beer
    },

  },
  actions: {
    updateUser({commit}, user){
      commit("UPDATE_USER", user)
    },
    setEmptyBeer({commit}, beer) {
      commit("SET_EMPTYBEER", beer)
    },
    setBeers({commit}){
      axios.get('https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/beers').then(response => {
            commit("SET_BEERS", response.data) 
      })
    },
    setBeer({commit},beerId){
      axios.get(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/beers/${beerId}`).then(response => {
        commit("SET_BEER",response.data)
      })
    },
    createBeer({dispatch}, beer) {
      axios.post(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/beers`, beer).then(() => {
        dispatch("setBeers")
      })
    },
    deleteBeer({dispatch}, beerId) {
      axios.delete(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/beers/${beerId}`).then(() => {
        dispatch("setBeers")
      })
    },
    updateBeer({dispatch}, beer) {
      axios.put(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/beers/${beer.id}`, beer).then(() => {
        dispatch("setBeers")
      })
    }
  },
  modules: {
  }
})