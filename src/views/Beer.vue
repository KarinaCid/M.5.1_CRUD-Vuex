<template>
    <div v-if="currentBeer">
        <p>{{currentBeer.data.name}}</p>
        <img :src="currentBeer.data.img" >
    </div>
</template>

<script>

 import {mapState, mapActions} from 'vuex'
export default {
   props: ['beerId'],


     computed:{
    ...mapState(["currentBeer"]),
    
  },
  methods:{
    ...mapActions(["setBeer"])
  },
  created(){
    this.setBeer(this.beerId)
  }
};
</script>