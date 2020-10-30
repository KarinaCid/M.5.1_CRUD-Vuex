<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="container">
      <form>
        <div class="form-group">
          <label for="beerName">Nombre</label>
          <input
            v-model="emptyBeer.name"
            type="text"
            class="form-control"
            id="beerName"
          />
        </div>
        <div class="form-group">
          <label for="beerImage">Imagen referencial</label>
          <input
            v-model="emptyBeer.img"
            type="text"
            class="form-control"
            id="beerImage"
          />
        </div>
        <div class="form-group">
          <label for="beerPrice">Precio</label>
          <input
            v-model="emptyBeer.price"
            type="text"
            class="form-control"
            id="beerPrice"
          />
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1"
            >Check me out</label
          >
        </div>
        <button
          v-text="emptyBeer.id ? 'Actualizar':'Crear'"
          type="submit"
          class="btn btn-primary"
          @click.prevent="submitBeer"
        >
        </button>
        <div>
          <button
          type="text"
          class="btn btn-primary"
          @click.prevent="resetBeer"
        > Cancelar
        </button>
        </div>
      </form>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="beer in beers" :key="beer.id">
        <div class="card-deck">
          <div class="card">
            <img :src="beer.data.img" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ beer.data.name }}</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">
                <small class="text-muted">{{ beer.data.price }}</small>
              </p>
              <router-link
                class="btn btn-warning"
                :to="{ name: 'Beer', params: { beerId: beer.id } }"
                >Ver cerveza</router-link
              >
              <a class="btn btn-danger" @click.prevent="removeBeer(beer.id)"
                >Eliminar</a
              >
              <a class="btn btn-danger" @click.prevent="editBeer(beer)"
                >Editar</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      emptyBeer: {
        name: null,
        img: null,
        price: 0,
        id: null
      },
    };
  },
  name: "Home",
  computed: {
    ...mapState(["beers"]),
  },
  methods: {
    ...mapActions(["setBeers", "createBeer", "deleteBeer", "updateBeer"]),
    submitBeer() {
      if(this.isValidBeer()) {
        this.emptyBeer.id ? this.updateBeer(this.emptyBeer) : this.createBeer(this.emptyBeer)
        this.resetBeer()
      } else {
        alert('Todos los campos son obligatorios')
      }
    },
    removeBeer(beerId) {
      this.deleteBeer(beerId);
    },
    editBeer(beer) {
      this.emptyBeer.name = beer.data.name
      this.emptyBeer.img = beer.data.img
      this.emptyBeer.price = beer.data.price
      this.emptyBeer.id = beer.id  //varía según nombre que figure en la API
    },
    resetBeer() {
      this.emptyBeer.name = null
      this.emptyBeer.img = null
      this.emptyBeer.price = 0
      this.emptyBeer.id = null

    },
    isValidBeer() {
      return this.emptyBeer.name !== "" && this.emptyBeer.img !== "" && this.emptyBeer.price !== 0 
    }
  },
  created() {
    this.setBeers();
  },
};
</script>
