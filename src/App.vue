<template>
  <div id="app">
    <div id="nav">
      <a v-if="currentUser" @click.prevent="logout">Logout</a> 
      <router-link v-else-if="currentUser === null" to="/login">Login</router-link> |
      <router-link to="/home">Home</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    ...mapActions(["updateUser"]),
    logout() {
      firebase.auth().signOut().then(() => {
          this.updateUser(null);
          this.$router.push("/login");
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
