<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ul>
      <li v-for="beer in beers" :key="beer.id">
        {{beer.data.name}}
        <img :src="beer.data.img">
        <router-link :to="{name: 'Beer', params:{id: beer.id}}">Ver cerveza</router-link> 
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

import {mapState, mapActions} from 'vuex'
export default {
  name: 'Home',
  computed:{
    ...mapState(["beers"]),
    
  },
  methods:{
    ...mapActions(["setBeers"])
  },
  created(){
    this.setBeers()
  }
}
</script>
