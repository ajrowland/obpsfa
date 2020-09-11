<template>
  <table class="table">
    <tr v-for="row in rows" :key="row._key">
      <td v-for="(cell, i) in row.cells" :key="i">{{cell}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: ["rows"],
};
</script>

<style lang="scss">
.table {
  width: 100%;
  table-layout: fixed;

  td {
    display: block;

    @include mq($from: tablet) {
      display: table-cell;
    }
  }
}
</style>