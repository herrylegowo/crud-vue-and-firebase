<template>
  <div id="view-data">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{nama}}</h4>
      </li>
      <li class="collection-item">Dokter ID#:{{dokters_id}}</li>
      <li class="collection-item">Keahlian: {{keahlian}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteData" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{name: 'edit-data', params: {dokters_id: dokters_id}}"
        class="btn-floating btn-large red"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "view-data",
  data() {
    return {
      dokters_id: null,
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
            vm.dokters_id = doc.data().dokter_id;
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
            this.dokters_id = doc.data().dokter_id;
            this.nama = doc.data().nama;
            this.keahlian = doc.data().keahlian;
          });
        });
    },
    deleteData() {
      if (confirm("Are you sure?")) {
        db.collection("dokter")
          .where("dokter_id", "==", this.$route.params.data_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>