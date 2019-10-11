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
    subtext: String,
    start: Number,
    end: Number
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
        legend: {
          data: this.legendData,
          x: 'left'
        },
        grid: {
          top: '15%',
          left: '1.2%',
          right: '1%',
          bottom: '10%',
          containLabel: true
        },
        toolbox: {
          right: '30',
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [{
          type: 'inside',
          start: this.start,
          end: this.end
        }, {
          handleStyle: {
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],

        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.value
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
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
