<template>
  <div>
    <div class="tableText">
      <Row>
        <Col span="24">
          <div style="margin-left: 20px">
            <Row>
              <Col span="24" style="margin-top: 10px">
                <span style="margin-right: 50px">创建时间:</span>
                <i-button v-for="(item,index) in createTime" @click="productBtn(index, 'time')"
                          :class="{isClass:num === index}" :key="item">{{item}}
                </i-button>
                <DatePicker type="daterange" split-panels placeholder="自定义时间" style="width: 200px"></DatePicker>
              </Col>
            </Row>
            <Row>
              <Col span="24" style="margin-top: 10px">
                <span style="margin-right: 50px">选择状态:</span>
                <i-button v-for="(item,index) in selectState" @click="productBtn(index, 'state')"
                          :class="{isClass:num2 === index}" :key="item">{{item}}
                </i-button>
              </Col>
            </Row>
            <Row>
              <Col span="24" style="margin-top: 10px">
                <span style="margin-right: 50px">选择身份:</span>
                <i-button v-for="(item,index) in selectID" @click="productBtn(index, 'id')"
                          :class="{isClass:num3 === index}" :key="item">{{item}}
                </i-button>
              </Col>
            </Row>
          </div>
          <Divider/>
          <div>
            <Row :gutter="15">
              <i-col :xs="12" :md="8" :lg="6" v-for="(item, i) in inforCardData" :key="`item-${i}`"
                     style="margin-top: 10px;">
                <Card :style="'background-color:' + item.color">
                  <Row>
                    <Col span="12">
                      <Icon style="font-size: 80px; color: #fff;" :type="item.icon"/>
                    </Col>
                    <Col span="12" align="right" style="padding-right: 20px">
                      <div>
                        <div style="font-size: 12px; color: #fff;" class="slot-text" slot="left">{{item.title}}</div>
                        <count-to :end="item.count" count-class="count-text" unit-class="unit-count"></count-to>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </i-col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
    <div style="margin-top: 10px">
      <Row :gutter="15">
        <i-col :xs="12" :md="8" :lg="16" style="margin-bottom: 10px;">
          <Card style="position: relative;">
            <p slot="title">
              主要数据统计
            </p>
            <Row>
              <ed-line style="height: 319px;" :value="time" :data="data2" :start="0" :end="38"></ed-line>
            </Row>
          </Card>
        </i-col>
        <i-col :xs="12" :md="8" :lg="8" style="margin-bottom: 10px;">
          <Card style="position: relative;">
            <p slot="title">
              消费统计
            </p>
            <Row>
              <hollow-pie style="height: 260px;" :value="hPieData1" :pieTitle="pieTitle1" :legend="legend"
                          :radius="['35%', '45%']" :center="['50%', '50%']" text="消费金额为¥0`"></hollow-pie>
            </Row>
            <Divider/>
            <Row style="font-size: 12px;">
              <Col span="12">
                <div style="border-right: 1px solid #ccc;margin-left: 40px; ">
                  <p>相比上月用户消费增长</p>
                  <p style="font-size: 14px; color: #ed5565; font-weight: bold;"><Icon type="md-trending-up" /> ￥0</p>
                </div>
              </Col>
              <Col span="12">
                <div style="margin-left: 40px; ">
                  <p>相比上月用户增长</p>
                  <p style="font-size: 14px; color: #23c6c8;font-weight: bold"><Icon type="md-trending-down" /> -61</p>
                </div>
              </Col>
            </Row>
          </Card>
        </i-col>
      </Row>
    </div>
    <div style="margin-top: 10px">
      <Row :gutter="15">
        <i-col :xs="12" :md="8" :lg="8" style="margin-bottom: 10px;">
          <Card style="position: relative;">
            <p slot="title">
              支出详情
            </p>
            <Row>
              <hollow-pie style="height: 300px;" :value="hPieData" :pieTitle="pieTitle"></hollow-pie>
            </Row>
          </Card>
        </i-col>
        <i-col :xs="12" :md="8" :lg="8" style="margin-bottom: 10px;">
          <Card style="position: relative;">
            <p slot="title">
              营收详情
            </p>
            <Row>
              <chart-bar style="height: 300px;" :value="barData" :grid="{x: 30,y2: 105}" :barTitle="barData"></chart-bar>
            </Row>
          </Card>
        </i-col>
        <i-col :xs="12" :md="8" :lg="8" style="margin-bottom: 10px;">
          <Card style="position: relative;">
            <p slot="title">
              最近交易记录
            </p>
            <Row>
              <Card style="position: relative;">
                <p slot="title">
                  利润排行
                </p>
                <span class="ed-text2">TOP10</span>
                <Row>
                  <Table ref="currentRowTable" :columns="columns" :data="tableData"></Table>
                </Row>
              </Card>
            </Row>
          </Card>
        </i-col>
      </Row>
    </div>
  </div>

</template>

<script>
import CountTo from '_c/count-to'
import { ChartPie, HollowPie, ChartBar, edLine } from '_c/charts'

export default {
  components: {
    CountTo,
    ChartPie,
    HollowPie,
    ChartBar,
    edLine
  },
  data () {
    return {
      createTime: ['全部', '今天', '本周', '本季度', '本年'],
      selectState: ['正常', '锁定'],
      selectID: ['全部', '普通用户', '推广用户'],
      inforCardData: [
        { title: '新增用户', text: '件', icon: 'md-trending-up', count: 803.95, num: 3, color: '#2d8cf0' },
        { title: '用户留存', text: '件', icon: 'md-barcode', count: 232, num: 3, color: '#19be6b' },
        { title: '新增用户总消费', text: '件', icon: 'md-stats', count: 142, num: 3, color: '#ff9900' },
        { title: '用户活跃度', text: '件', icon: 'md-pie', count: 10000.00, num: 3, color: '#ed3f14' }
      ],
      pieTitle1: '用户累计签到第一天',
      pieTitle: '用户累计签到第一天',
      pieData: [
        { value: 335, name: '微信支付' },
        { value: 0, name: '余额支付' },
        { value: 0, name: '线下支付' }
      ],
      hPieData: [
        { value: 335, name: '未知' },
        { value: 62, name: '广州' },
        { value: 84, name: '珠海' }
      ],
      hPieData1: [
        { value: 335, name: '用户累计签到第一天' }
      ],
      legend: null,
      legendData: ['商品数量', '订单数量', '订单金额', '退款金额'],
      barData: {
        浏览量: 625,
        搜索: 5,
        进入小程序: 62,
        点击微信菜单链接: 125,
        点击微信菜单进入小程序: 125
      },
      time: ['1号',
        '2号',
        '3号',
        '4号',
        '5号',
        '6号',
        '7号',
        '8号',
        '9号',
        '10号',
        '11号',
        '12号',
        '13号',
        '14号',
        '15号',
        '16号',
        '17号',
        '18号',
        '19号',
        '20号',
        '21号',
        '22号',
        '23号',
        '24号',
        '25号',
        '26号',
        '27号',
        '28号',
        '29号',
        '30号',
        '31号'
      ],
      num: 0,
      num2: 0,
      num3: 0,
      data2: [
        {
          name: '新增用户',
          type: 'line',
          data: [
            '19',
            '36',
            '26',
            '18',
            '39',
            '24',
            '28',
            '5',
            '1',
            '7',
            '26',
            '13',
            '12',
            '16',
            '15',
            '6',
            '37',
            '6',
            '5',
            '16',
            '2',
            '23',
            '43',
            '58',
            '9',
            '11',
            '12',
            '26',
            '15',
            '15',
            '50',
            '28']
        },
        {
          name: '用户消费',
          type: 'line',
          data: [
            '2593.00',
            '734.00',
            '714.00',
            '562.00',
            '617.00',
            '1017.00',
            '424.00',
            '992.00',
            '1116.00',
            '750.00',
            '983.00',
            '2273.00',
            '2198.00',
            '394.00',
            '984.00',
            '673.00',
            '1480.00',
            '1174.00',
            '714.00',
            '4223.00',
            '1012.00',
            '930.00',
            '598.00',
            '1326.00',
            '294.00',
            '1849.00',
            '90.00',
            '1655.00',
            '964.00',
            '45.00',
            '252.00',
            '1274.00']
        }
      ],
      tableData: [],
      columns: [
        {
          title: '排名',
          key: 'store_name'
        },
        {
          width: 72,
          title: '用户名',
          key: 'w'
        },
        {
          title: '时间',
          key: 'p_count'
        },
        {
          width: 100,
          title: '消费金额￥',
          key: 'sum_price'
        },
        {
          title: '余额',
          key: 'sum_price'
        },
        {
          title: '操作',
          key: 'sum_price'
        }
      ]

    }
  },
  methods: {
    productBtn (index, type) {
      if (type === 'time') {
        this.num = index
      } else if (type === 'state') {
        this.num2 = index
      } else {
        this.num3 = index
      }
    }
  }
}
</script>

<style>
  .ivu-btn {
    margin-right: 10px;
  }

  .isClass {
    background-color: #0092DC;
    color: #fff;
  }

  .count-text {
    font-size: 30px;
    color: #fff;
  }
  .ivu-divider-horizontal{
    margin: 10px 0;
  }
  .ed-text2 {
    position: absolute;
    top: 16px;
    left: 85px;
    background-color: #FFB800;
    color: #fff;
    padding: 0 5px;
    font-size: 11px;
    border-radius: 2px
  }
</style>
