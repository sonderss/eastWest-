<template>
<div style="">
        <!--这里使用注册的头部组件 -->
        <useTitle @rush='rush' @moth='moth' @peop='peop'></useTitle>
        <Row style="padding:15px 0">
        <Col span="15">
            <Card :bordered="false">
                <p slot="title">地区分布</p>
               <!-- 插入eachts -->
                <div ref='main' style="height:400px"></div>
            </Card>
        </Col>
        <Col span="8" push='1'>
            <Card shadow>
                <p slot="title">性别分布</p>

                <uPro style="height:400px" title="用户性别分布图表"   :dataArr="dataArr" :botm="botm"></uPro>

            </Card>
        </Col>
    </Row>
</div>
</template>

<script>
import echarts from 'echarts'
import uPro from '../../../components/charts/upro'
import useTitle from '../../../components/usecom/usetitle'
export default {
  components: { uPro, useTitle },
  data () {
    return {
      isTime: true,
      myChart: null,
      botm: ['男', '女', '未知'],
      dataArr: [
        { value: 10, name: '未知' },
        { value: 60, name: '男' },
        { value: 27, name: '女' }
      ],
      month: ['广东', '', '河南', '上海', '', '陕西', '山西', '北京', ''],
      peoples: [100, 20, 10, 4, 30, 80, 20, 50, 20]

    }
  },
  methods: {
    rush (a) {
      // console.log(this.dataArr)
      // console.log(a)
      // console.log(a.length)
      if (a.length > 0 && a !== 'id1') {
        for (let i = 0; i < a.length; i++) {
          this.dataArr.splice(i, 1, a[i])// 3个数据
        }
      }
      // if (a === 'id1') {
      //   console.log(123)
      //   this.reload()
      // }

      // console.log(this.dataArr)
      // console.log(this.dataArr)
      // console.log(this.dataArr)
      // this.$set(this.dataArr, , a)
    },
    moth (k) {
      // console.log(k)
      // console.log(this.month)
      // console.log(k)
      this.month = []
      for (let i = 0; i < k.length; i++) {
        this.month.push(k[i])
      }
    },
    peop (p) {
      // console.log(p)
      this.peoples = []

      for (let i = 0; i < p.length; i++) {
        this.peoples.push(p[i])
      }
      // console.log(this.peoples)
    }

  },
  watch: {
    month: {
      handler (newVal, oldVal) {
        // console.log(newVal)
        if (newVal) {
          // console.log(newVal)
          this.myChart.setOption({
            xAxis: [
              {
                type: 'category',
                data: newVal
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ]
          })
        }
      }
    },
    peoples: {
      handler (newVal, oldVal) {
        // console.log(newVal)
        if (newVal) {
          this.myChart.setOption({
            series: [
              {
                name: '',
                type: 'bar',
                barWidth: 46,
                center: ['50%', '50%'],
                data: newVal,
                markPoint: {
                  data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                  ]
                }
              }

            ]
          })
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.myChart = echarts.init(this.$refs.main)

      const option = {
        color: ['#81bcff'],
        title: {
          text: '用户地区分布图表'
        // subtext: '纯属虚构'
        },
        xAxis: [
          {
            type: 'category',
            data: this.month
          }
        ],
        yAxis: [
          {
            type: 'value'
          // data: this.peoples
          }
        ],
        grid: {
          top: 80
        },
        // eslint-disable-next-line no-dupe-keys
        tooltip: {
          show: true,
          trigger: 'axis',
          // show: true,   //default true
          showDelay: 0, // 显示延时，添加显示延时可以避免频繁切换
          hideDelay: 50, // 隐藏延时
          transitionDuration: 0, // 动画变换时长
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景颜色（此时为默认色）
          borderRadius: 8, // 边框圆角
          padding: 10, // [5, 10, 15, 20] 内边距
          position: function (p) {
          // 位置回调
          // console.log && console.log(p);
            return [p[0] + 10, p[1] - 10]
          },
          formatter: function (params, ticket, callback) {
          // console.log(params)
            var res = ''
            for (var i = 0; i < params.length; i++) {
              if (!params[i].name) {
                res = '未知城市' + '<br />' + '<div style="display:flex;align-items: center;">' + "<i style='width:10px;height:10px;background:#81bcff;display:block;border-radius:50%;margin-right:8px'></i>" + params[i].data + '</div>'
                break
              }
              res = params[i].name + '<br />' + '<div style="display:flex;align-items: center;">' + "<i style='width:10px;height:10px;background:#81bcff;display:block;border-radius:50%;margin-right:8px'></i>" + params[i].data + '</div>' // 鼠标悬浮显示的字符串内容
            }
            setTimeout(function () {
            // 仅为了模拟异步回调
              callback(ticket, res)
            }, 1000)
            return res
          }

        },
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: 46,
            // center: ['50%', '50%'],
            data: this.peoples,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          }

        ]
      }

      window.addEventListener('resize', () => { this.myChart.resize() })
      this.myChart.setOption(option)
    })
  }
}
</script>

<style scoped>
/* .isClass {
    background-color: #0092DC;
    color: #fff;

  }
  .styleTitle{
    margin: 0 5px;

  } */

</style>
