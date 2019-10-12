/**
  * @author edith
  * @date 2019/10/11
*/
<template>
  <div ref="dom" class="charts chart-line"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'ChartLine',
  props: {
    value: Array,
    data: Array,
    legendData: Array,
    text: String,
    subtext: String,
    start: 0,
    end: 4
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
        type: 'line',
        smooth: false,
        data: Object.values(this.data[i].data),
        // coordinateSystem: 'polar',
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ]
        }
      })
    }
    this.$nextTick(() => {
      const option = {
        title: {
          text: this.text,
          x: 'center',
          top: '10px',
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
          top: '10%',
          left: '5%',
          right: '11%',
          bottom: '10%',
          containLabel: true
        },
        dataZoom: [{
          type: 'inside',
          start: this.start,
          end: this.end
        }, {
          handleStyle: {
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)'
          }
        }],

        xAxis: [
          {
            type: 'category',
            axisLabel: {
              showMaxLabel: true,
              color: 'black'
            },
            data: this.value,
            axisTick: {
              show: true
            },
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'black'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: true
            },
            axisLabel: {
              color: 'black'
            },
            axisLine: {
              lineStyle: {
                color: 'black'
              }
            }
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
