<template>
    <div style="margin-top:15px">
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">分销会员统计</p>
                <div id="quxian" style="height:400px"> </div>
            </Card>
        </Col>
    </Row>
    </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import echarts from 'echarts'

export default {
  mounted () {
    var myChart = echarts.init(document.getElementById('quxian'))

    const option = {
      title: {
        text: '分销会员访问人数统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '对应关系 : <br/>{b}h : {c}人'
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} 人次'
        }
      },
      yAxis: {
        type: 'category',
        axisLine: { onZero: false },
        axisLabel: {
          formatter: '{value} h'
        },
        boundaryGap: false,
        data: ['8', '9', '10', '11', '12', '14', '17', '19', '20', '22']
      },
      series: [
        {
          name: '',
          type: 'line',
          smooth: true,
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: 'rgba(0,0,0,0.4)',
              shadowBlur: 10,
              shadowOffsetY: 10
            }
          },
          data: [40, 200, 232, 244, 300, 322, 362, 444, 422, 300]
        }
      ]
    }
    myChart.setOption(option)
    window.addEventListener('resize', () => { myChart.resize() })
  }
}
</script>

<style >

</style>
