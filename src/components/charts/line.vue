/**
 * @author edith
 * @date 2019/10/11
*/
<template>
  <div ref="dom" class="charts chart-line"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartLine',
  props: {
    value: Array,
    data: Array,
    legendData: Array,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const series = []
    for (let i = 0; i < this.data.length; i++) {
      series.push({
        name: Object.values(this.data[i].name).join(''),
        type: 'line',
        smooth: false,
        data: Object.values(this.data[i].data)
      })
    }
    this.$nextTick(() => {
      const option = {
        title: {
          text: this.text,
          x: 'center',
          textStyle: {
            fontWeight: 'bold',
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        toolbox: {
          right: '30',
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: this.legendData,
          x: 'left',
          textStyle: {
            color: '#000'
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.value,
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        // series: [{
        //   name: this.legendData,
        //   data: this.data,
        //   type: 'line'
        // }]
        series: series
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
