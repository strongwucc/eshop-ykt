<template>
  <div class="myData-page">
    <div class="avatar">
      <span class="l">
        头像
      </span>
      <span class="r">
        <img :src="user_info.headimgurl | avatar">
      </span>
    </div>

    <div class="list">
      <div class="item" @click="$router.push('/change_name/'+user_info.name)">
        <span class="l">
          姓名
        </span>
        <span class="r">
          <span class="exist">{{user_info.name}}</span>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </span>
      </div>
      <div class="item" @click="$router.push('/select_sex/'+user_info.sex)">
        <span class="l">
          性别
        </span>
        <span class="r">
          <span class="exist" v-if="user_info.sex == '0'">女</span>
          <span class="exist" v-else-if="user_info.sex == '1'">男</span>
          <span class="not-exist" v-else>请选择</span>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </span>
      </div>
      <div class="item" @click="openPicker">
        <span class="l">
          生日
        </span>
        <span class="r">
          <span class="exist" v-if="birthday">{{birthday}}</span>
          <span class="not-exist" v-if="!birthday">请选择</span>
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </span>
      </div>
    </div>

    <div class="list">
      <div class="item"  @click="$router.push('/change_tel')">
        <span class="l">
          修改手机号
        </span>
        <span class="r">
          <span class="exist">{{user_info.mobile}}</span>
          <!--<span class="not-exist">修改</span>-->
          <img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">
        </span>
      </div>
      <!--<div class="item" @click="$router.push('/change_pw')">-->
        <!--<span class="l">-->
          <!--修改支付密码-->
        <!--</span>-->
        <!--<span class="r">-->
          <!--<span class="exist"></span>-->
          <!--<span class="not-exist">修改</span>-->
          <!--<img class="arrow-r" src="../../assets/img/common/arrow_right@2x.png">-->
        <!--</span>-->
      <!--</div>-->
    </div>

    <div class="logout" @click="logout">注销登录</div>
    <back></back>
    <div @touchmove.prevent>
    <mt-datetime-picker
      ref="picker"
      v-model="pickDate"
      :start-date="startDate"
      :end-date="endDate"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="confirmBirthday">
    </mt-datetime-picker>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import back from '../../base/back'
  export default {
    components: {back},
    name: "my_data",
    data () {
      return {
        startDate: '',//开始年份
        endDate: '',//结束年份
        pickDate: '',
        birthday: '',
      }
    },
    computed: {
      ...mapState({
        'user_info': state => state.user.user_info
      })
    },
    created () {
      this.startDate = new Date(1950, 0, 1)
      this.endDate = new Date()
      this.initBirthday()
    },
    // watch: {
    //   pickDate: function (newDate) {
    //     if (newDate) {
    //       this.birthday = newDate.pattern('yyyy-MM-dd')
    //     }
    //   }
    // },
    methods: {
      ...mapMutations([
        'set_user_info'
      ]),
      openPicker() {
        this.$refs.picker.open();
      },
      initBirthday () {
        let userInfo = this.$store.state.user.user_info
        if (parseInt(userInfo.b_year) && parseInt(userInfo.b_month) && parseInt(userInfo.b_day)) {
          let year = userInfo.b_year
          let month = userInfo.b_month.length === 2 ? userInfo.b_month : '0' + userInfo.b_month
          let day = userInfo.b_day.length === 2 ? userInfo.b_day : '0' + userInfo.b_day
          this.birthday = year + '-' + month + '-' + day
          this.pickDate = new Date(userInfo.b_year,userInfo.b_month -1,userInfo.b_day)
        }
      },
      confirmBirthday (newDate) {
        let bYear = newDate.pattern('yyyy')
        let bMonth = newDate.pattern('M')
        let bDay = newDate.pattern('d')

        let editInfo = {b_year: bYear, b_month: bMonth, b_day: bDay}

        this.$http.post(this.API.user.edit_info, {edit_info: editInfo}).then(res => {
          if (res.return_code === '0000') {
            // 修改成功
            this.birthday = newDate.pattern('yyyy-MM-dd')
            let user_info = this.$store.state.user.user_info
            let new_info = Object.assign(user_info,editInfo)
            this.set_user_info(new_info)
            return true
          } else {
            // 修改失败
            return false
          }
        })
      },
      logout () {
        this.$http.post(this.API.auth.logout, {}).then(res => {
          this.$router.push('/login')
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/common";
  @import "../../assets/css/mixin";
  .myData-page{
    .l{
      font-size: 30px;/*px*/
    }
    .avatar{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      background-color: #ffffff;
      margin-bottom: 20px;
      .r{
        width: 120px;
        height: 120px;
        box-sizing: content-box;
        padding: 20px 0;
        img{
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
    }
    .list{
      background-color: #ffffff;
      margin-bottom: 20px;
      padding-left: 30px;
      .item{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        padding-right: 26px;
        .r{
          display: flex;
          align-items: center;
          font-size: 26px;/*px*/
          .exist{
            color: #666666;
          }
          .not-exist{
            color: #bbbbbb;
          }
          .arrow-r{
            width: 30px;
            margin-left: 15px;
          }
        }
        &:after{
          @include border-1px(#e5e5e5, bottom);
        }
      }
    }
    .logout{
      height: 100px;
      font-size: 30px;/*px*/
      text-align: center;
      line-height: 100px;
      background-color: #ffffff;
    }
  }
</style>
