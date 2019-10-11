<template>
<div ref="dom"></div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import echarts from 'echarts'
export default {
  props: {
    dataArr: Array,
    title: String,
    botm: Array
  },
  data () {
    return {
      dom: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      // var weatherIcons = {
      //   'Sunny': ROOT_PATH + 'data/asset/img/weather/sunny_128.png',
      //   'Cloudy': ROOT_PATH + 'data/asset/img/weather/cloudy_128.png',
      //   'Showers': ROOT_PATH + 'data/asset/img/weather/showers_128.png'
      // }

      const option1 = {
        title: {
          text: this.title,
          left: 'center'
        },
        legend: {
          bottom: 10,
          left: 'center',
          data: this.botm
        },

        // eslint-disable-next-line standard/array-bracket-even-spacing
        color: [ '#91d5fe', '#81bcf5', '#fb7773'],

        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: this.dataArr,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      window.addEventListener('resize', () => { this.dom.resize() })
      this.dom.setOption(option1)
    })
  }
}
</script>

<style scoped>

</style>
