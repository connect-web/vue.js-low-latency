<template>
  <div class="card-item">
    <div :class="`card ${color}`">
      <i :class="`zmdi ${icon}`"></i>
      <div class="title">{{ title }}</div>

      <div class="value bold-text">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalStatsCard',
  props: {
    title: String,
    icon: String,
    value: [Number, String],
    color: String
  }
}
</script>

<style scoped>
.title{
  font-size: 2em !important;
  color: #ffffff;
  margin-bottom:1em;
}
.value{
  color: #ffd220;
  font-size: 2.5em;
}


.card-item, .title{
  display: inline-block;
  font-size: 14px;
  padding: 10px 10px 0;
  text-transform: uppercase;
}
.card-item .card .zmdi {
  color: #ffffff !important;
  font-size: 2em;
  opacity: 1;
}

/* Card styles */
</style>
