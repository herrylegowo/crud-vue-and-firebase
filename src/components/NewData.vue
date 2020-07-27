<template>
  <div id="new-data">
    <h3>New Data</h3>
    <div class="row">
      <form @submit.prevent="saveData" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dokter_id" required />
            <label>Dokter ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nama" required />
            <label>Nama</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="keahlian" required />
            <label>Keahlian</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "new-data",
  data() {
    return {
      dokter_id: null,
      nama: null,
      keahlian: null
    };
  },
  methods: {
    saveData() {
      db.collection("dokter")
        .add({
          dokter_id: this.dokter_id,
          nama: this.nama,
          keahlian: this.keahlian
        })
        .then(docRef => this.$router.push("/"))
        .catch(error => console.log(err));
    }
  }
};
</script>