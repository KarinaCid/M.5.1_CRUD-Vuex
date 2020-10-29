<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col">
          <div v-if="alert.state" class="alert alert-danger" role="alert">
            {{alert.text}}
          </div>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                v-model="email"
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                v-model="pass"
              />
            </div>
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Check me out</label
              >
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              @click.prevent="login"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import {mapActions} from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pass: "",
      alert:{text: '', state: false, type:''}
    };
  },
  methods: {
    ...mapActions(['updateUser']),
    login() {
      if(this.email != "" && this.pass != ""){
        firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
        .then( () => {
          this.alert.state = false
          this.updateUser(firebase.auth().currentUser.email)
          this.$router.push("home");
        })
        .catch( () => {
        this.alert.state = true
        this.alert.text = 'Usuario y/o contraseña incorrectos'
        })
      } else{
        this.alert.state = true
        this.alert.text = 'Por favor, introduzca su usuario y contraseña'
      }
    },
  },
};
</script>
