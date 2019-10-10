<template>
  <div class="selectSex-page">
    <div class="sex-input">
      <div class="sex" @click="sex = '0'" :class="{chosen: sex === '0'}">女士</div>
      <div class="sex" @click="sex = '1'" :class="{chosen: sex === '1'}">男士</div>
    </div>
    <button class="confirm" @click="editSex">确定</button>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "select_sex",
    data () {
      return {
        oldSex: this.$route.params.oldSex,
        sex: this.$route.params.oldSex,
      }
    },
    methods: {
      ...mapMutations([
        'set_user_info'
      ]),
      editSex () {

        if (this.sex !== '0' && this.sex !== '1') {
          return false;
        }
        if (this.oldSex === this.sex) {
          this.$router.go(-1)
          return false;
        }

        let editInfo = {sex: this.sex}

        this.$http.post(this.API.user.edit_info, {edit_info: editInfo}).then(res => {
          if (res.return_code === '0000') {
            let user_info = this.$store.state.user.user_info
            user_info.sex = editInfo.sex
            this.set_user_info(user_info)
            this.$router.go(-1)
            return true
          } else {
            // 修改失败
            return false
          }
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  @import "../../assets/css/mixin";
  .selectSex-page{
    .sex-input{
      display: flex;
      justify-content: space-between;
      padding: 50px 94px;
      background-color: #ffffff;
      .sex{
        position: relative;
        width: 260px;
        height: 68px;
        line-height: 68px;
        text-align: center;
        &:after{
          @include all-border-1px(#dddddd, 8px);
        }
      }
      .chosen{
        color: #3cc7b2;
        &:after{
          @include all-border-1px(#3cc7b2, 8px);
        }
      }
    }
    .confirm{
      width: 640px;
      height: 88px;
      border-radius: 8px;
      background-color: $themeColor;
      font-size: 30px;/*px*/
      display: block;
      margin: 60px auto;
    }
  }
</style>
