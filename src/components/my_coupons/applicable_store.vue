<template>
  <div class="store-list-page">
    <div class="head">共{{stores.length}}家门店</div>
    <div class="scroll-wrapper">
      <div class="store" v-for="(store) in stores">
        <div class="t">
          <span class="name">{{store.store_name}}</span>
          <span class="distance">{{distance(store.latitude,store.longitude)}}</span>
        </div>
        <div class="b">{{store.addr}}</div>
      </div>
    </div>
    <back></back>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import back from '../../base/back'
  export default {
    name: "applicable_store",
    components: {
      back
    },
    data () {
      return {
        cid: this.$route.params.cid,
        stores: []
      }
    },
    computed: {
      ...mapState({
        location: state => state.common.location
      })
    },
    created () {
      this.getStoreList()
    },
    mounted () {
      this.setStyle()
    },
    methods: {
      setStyle () {
        document.querySelector('.scroll-wrapper').style.height = window.innerHeight - document.querySelector('.head').offsetHeight + 'px'
      },
      getStoreList () {
        this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
        this.$http.post(this.API.user.coupon_stores, {cid:this.cid}).then(res => {
          this.$myLoading.close()
          if (res.return_code === '0000') {
            this.stores = res.data.list
          } else {
            this.$myToast(res.return_msg)
            return false
          }
        })
      },
      distance (lat,lng) {
        var radLat1 = lat * Math.PI / 180.0
        var radLat2 = this.location.point_y * Math.PI / 180.0
        var a = radLat1 - radLat2
        var b = lng * Math.PI / 180.0 - this.location.point_x * Math.PI / 180.0
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b/2),2)))
        s = s * 6378.137
        s = Math.round(s * 10000)
        return s > 10000 ? Math.round(s / 10000) + '公里' : s + '米'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .store-list-page{
    position: relative;
    background-color: rgb(242,242,245);
    z-index: 9;
    height: 100%;
    .head{
      padding: 30px;
      font-size: 24px;/*px*/
    }
    .scroll-wrapper{
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .store{
        padding: 40px 30px;
        margin-bottom: 10px;
        background-color: #ffffff;
        .t{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          .distance{
            font-size: 24px;/*px*/
            color: #999999;
          }
        }
        .b{
          font-size: 24px;/*px*/
          color: #999999;
        }
      }
    }
  }
</style>
