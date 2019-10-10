<template>
  <div class="changeName-page">
    <div class="common-input">
      <input type="text" v-model="name" @focus="showClearIcon" @blur="hideClearIcon"/>
      <i class="clearValue" v-show="clearIconVisible">
        <img src="../../assets/img/common/icon_off@2x.png">
      </i>
    </div>

    <button class="confirm" @click="editName">确定</button>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "change_name",
    data () {
      return {
        oldName: this.$route.params.oldName,
        name: this.$route.params.oldName,
        clearIconVisible: false,
      }
    },
    methods: {
      ...mapMutations([
        'set_user_info'
      ]),
      showClearIcon () {
        this.clearIconVisible = true
      },
      hideClearIcon () {
        this.clearIconVisible = false
      },
      editName () {
        // 姓名必须大于两个字符
        // if (this.name.length < 2) {
        //   return false;
        // }
        if (this.name === this.oldName) {
          this.$router.go(-1)
          return false;
        }

        let editInfo = {name: this.name}

        this.$http.post(this.API.user.edit_info, {edit_info: editInfo}).then(res => {
          if (res.return_code === '0000') {
            let user_info = this.$store.state.user.user_info
            user_info.name = editInfo.name
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
  .changeName-page{
    .common-input{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      height: 100px;
      background-color: #ffffff;
      input{
        width: 92%;
        height: 70%;
        font-size: 32px;/*px*/
      }
      .clearValue{
        width: 38px;
        img{
          width: 100%;
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
