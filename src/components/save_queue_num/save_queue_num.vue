<template>
  <div class="save-queue-num" ref="imageWrapper">
    <div style="height: 2px"></div>
    <div class="imageArea" ref="imageArea">
      <div class="wrapper">
        <h4 class="store-name">{{queueInfo.store_name}}</h4>
        <div class="txt">排队号码</div>
        <p class="NO">{{queueInfo.position_prefix + queueInfo.no}}</p>
        <p class="type">{{queueInfo.position_name}}</p>
        <p class="time">{{queueInfo.order_at}}&nbsp;&nbsp;排队</p>
      </div>
    </div>

    <p class="tip">长按图片保存至相册</p>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'

    export default {
      name: "save_queue_num",
      data () {
        return {
          queueId: this.$route.params.queueId,
          queueInfo: {
            position_prefix:'',
            no:'',
            position_name:''
          },
          downloadData:'',
          failTimer: null
        }
      },
      created () {
      },
      mounted () {
        this.getQueueDetail()
      },
      methods: {
        getQueueDetail () {
          this.$myLoading.open({ text: '加载中...', spinnerType: 'fading-circle'})
          this.$http.post(this.API.queue.queue_queue, {queue_id:this.queueId}).then(res => {
            if (res.return_code === '0000') {
              this.queueInfo = res.data
              this.$nextTick(() => {
                this.drawCanvas('.wrapper')
              })
            } else {
              this.$myLoading.close()
              this.$myToast(res.return_msg)
              return false
            }
          })
        },
        DPR() {
          if (window.devicePixelRatio && window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
          }
          return 1;
        },

        parseValue(value) {
          return parseInt(value, 10)
        },

        drawCanvas(selector) {

          // 获取想要转换的 DOM 节点
          const dom = document.querySelector(selector);
          const box = window.getComputedStyle(dom);
          // DOM 节点计算后宽高
          const width = this.parseValue(box.width);
          const height = this.parseValue(box.height);
          // 获取像素比
          const scaleBy = this.DPR();
          // 创建自定义 canvas 元素
          const canvas = document.createElement('canvas');

          // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
          canvas.width = width * scaleBy;
          canvas.height = height * scaleBy;
          // 设定 canvas css宽高为 DOM 节点宽高
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;

          // 获取画笔
          const context = canvas.getContext('2d');

          // 将所有绘制内容放大像素比倍
          context.scale(scaleBy, scaleBy);

          // 将自定义 canvas 作为配置项传入，开始绘制

          this.failTimer = setTimeout(this.canvasFailed, 5000)

          html2canvas(dom,{canvas: canvas}).then(canvas => {
            let imageData = canvas.toDataURL('image/jpeg')
            this.downloadData = imageData
            let img = new Image()
            img.src = imageData
            img.width = width
            img.style.borderRadius = 4 * scaleBy + 'px'
            this.$refs.imageArea.innerHTML = ''
            this.$refs.imageArea.appendChild(img)
            this.$myLoading.close()
          });

        },
        saveImage () {
          this.saveFile(this.downloadData, 'queue.jpeg')
        },
        saveFile (data, filename) {
          const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = data;
          save_link.download = filename;

          const event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
        },
        canvasFailed () {
          this.$myLoading.close()
          if (this.downloadData === '') {
            this.$myToast('图片生成失败，请刷新页面')
          }
        }

      }
    }

</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
  @import "../../assets/css/common";
  .save-queue-num{
    position: relative;
    z-index: 9;
    height: 100%;
    background-color: #333333;
    .imageArea{
      width: 85%;
      margin: 155px auto 0 auto;
      border-radius: 8px;
      overflow: hidden;
    }
    .wrapper{
      background: url("../../assets/img/order_detail/img_quhao@2x.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      padding: 80px 0;
      .store-name{
        font-size: 32px;/*px*/
        margin-bottom: 132px;
      }
      .txt{
        width: 150px;
        height: 50px;
        margin: 0 auto 42px auto;
        text-align: center;
        line-height: 50px;
        border-radius: 25px;
        background-color: $themeColor;
      }
      .NO{
        font-size: 80px;/*px*/
        margin-bottom: 30px;
      }
      .type{
        font-size: 40px;/*px*/
        margin-bottom: 160px;
      }
      .time{
        font-size: 28px;/*px*/

      }
    }
    .tip{
      margin-top: 80px;
      color: #999999;
      text-align: center;
    }
  }
</style>
