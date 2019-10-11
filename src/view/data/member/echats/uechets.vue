<template>
    <div>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">分销会员统计</p>
                <div id="qushi" style="height:400px"> </div>
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
    var myChart = echarts.init(document.getElementById('qushi'))
    const option = {
      title: {
        text: '分销会员趋势图',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [12, 32, 123, 123, 500, 100, 200, 140, 160, 800, 400, 360],
        type: 'line',
        smooth: true

      }]
    }
    myChart.setOption(option)
    window.addEventListener('resize', () => { myChart.resize() })
  }
}
</script>

<style >

</style>
