import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    beers:[],
    currentBeer: null
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
    }

  },
  actions: {
    updateUser({commit}, user){
      commit("UPDATE_USER",user)
    },
    setBeers({commit}){
      axios.get('https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/beers').then(response => {
            console.log(response)
            commit("SET_BEERS", response.data) 
      })
    },
    setBeer({commit},beerId){
      axios.get(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/api/beers/${beerId}`).then(response => {
        console.log(response)
        commit("SET_BEER",response.data)
      })
     
    }
  },
  modules: {
  }
})