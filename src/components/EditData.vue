<template>
  <div id="edit-data">
    <h3>Edit Data</h3>
    <div class="row">
      <form @submit.prevent="updateData" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="dokter_id" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="nama" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="keahlian" required />
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
  name: "edit-data",
  data() {
    return {
      dokter_id: null,
      nama: null,
      keahlian: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("dokter")
      .where("dokter_id", "==", to.params.data_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.dokter_id = doc.data().dokter_id;
            vm.nama = doc.data().nama;
            vm.keahlian = doc.data().keahlian;
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("dokter")
        .where("dokter_id", "==", this.$route.params.dokters_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.dokter_id = doc.data().dokter_id;
            this.nama = doc.data().nama;
            this.keahlian = doc.data().keahlian;
          });
        });
    },
    updateData() {
      db.collection("dokter")
        .where("dokter_id", "==", this.$route.params.dokters_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                dokter_id: this.dokter_id,
                nama: this.nama,
                keahlian: this.keahlian
              })
              .then(() => {
                this.$router.push({
                  name: "view-data",
                  params: { data_id: this.dokter_id }
                });
              });
          });
        });
    }
  }
};
</script>