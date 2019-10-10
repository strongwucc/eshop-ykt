<template>
  <div class="takeaway-detail">
    <back :url="'/my_order/takeaway'"></back>
  </div>
</template>

<script>
    import back from '../../../base/back'
    export default {
        name: "takeaway_detail",
        components: {
          back
        }
    }
</script>

<style scoped>

</style>
