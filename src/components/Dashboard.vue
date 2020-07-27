<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Dokter</h4>
      </li>
      <li v-for="dokters in dokter" v-bind:key="dokters.id" class="collection-item">
        <div class="chip">{{dokters.keahlian}}</div>
        {{dokters.dokter_id}}:{{dokters.nama}}
        <router-link
          class="secondary-content"
          v-bind:to="{name: 'view-data', params: {data_id: dokters.dokter_id}}"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      dokter: []
    };
  },
  created() {
    db.collection("dokter")
      .orderBy("keahlian")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            dokter_id: doc.data().dokter_id,
            nama: doc.data().nama,
            keahlian: doc.data().keahlian
          };
          this.dokter.push(data);
        });
      });
  }
};
</script>