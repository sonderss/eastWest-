<template>
  <div>
    <Collapse v-model="collapsed" accordion>
      <Panel name="1">
        搜索条件
        <div slot="content" class="topBody">
          <Row>
            <Col span="24" style="margin-top: 10px">
              <span style="margin-right: 50px">创建时间:</span>
              <i-button v-for="(item,index) in createTime" @click="productBtn(index,'create')"
                        :class="{isClass:num3 === index}" :key="item">{{item}}
              </i-button>
              <DatePicker type="daterange" split-panels placeholder="自定义时间" style="width: 200px"></DatePicker>
            </Col>
          </Row>
          <div style="margin-top: 10px">
            <Button type="primary" icon="ios-search" @click="search">{{$t('search')}}</Button>
            <Button icon="ios-refresh">{{$t('table.refresh')}}</Button>
          </div>
        </div>
      </Panel>
    </Collapse>
    <div class="tableText" style="background-color:#f3f3f4;">
      <div>
        <Row :gutter="15">
          <i-col :xs="12" :md="8" :lg="6" v-for="(item, i) in inforCardData" :key="`item-${i}`"
                 style="margin-bottom: 10px;">
            <Card style="position: relative;">
              <p slot="title">
                <Icon type="paintbucket"></Icon>
                {{item.title}}
              </p>
              <span class="ed-text">{{item.text}}</span>
              <Row type="flex" class="countto-page-row">
                <div class="count-to-con">
                  <count-to :end="item.count" count-class="ed-count-text" unit-class="unit-count"></count-to>
                  <div class="slot-text" slot="left">{{item.title2}}</div>
                  <div style="position: absolute;right: 14px;bottom: 14px;">
                    <span style="font-size: 12px;margin-right: 5px">{{item.num}}</span>
                    <Icon :type="item.icon"/>
                  </div>
                </div>
              </Row>
            </Card>
          </i-col>
        </Row>
      </div>
      <div style="margin-bottom: 10px">
        <Row>
          <Card shadow>
            <p>提现统计</p>
            <Divider/>
            <chart-line style="height: 300px;" :value="time" :data="data" text="提现金额和人数统计图"></chart-line>
          </Card>
        </Row>
      </div>
      <div>
        <Row>
          <Card shadow>
            <p>提现方式</p>
            <Divider/>
            <chart-line style="height: 300px;" :value="time" :data="data" text="提现方式分布图"></chart-line>
          </Card>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from '_c/count-to'
import { ChartLine } from '_c/charts'

export default {
  name: 'oddChart',
  components: {
    CountTo,
    ChartLine
  },
  data () {
    return {
      collapsed: '1',
      createTime: ['全部', '今天', '本周', '本月', '本季度', '本年'],
      inforCardData: [
        { title: '总提现人数', text: '个', count: 803, color: '#2d8cf0' },
        { title: '总提现笔数', text: '笔', count: 232, color: '#19be6b' },
        { title: '本月提现人数', text: '个', count: 142, color: '#ff9900' },
        { title: '本月提现笔数', text: '件', count: 10000, color: '#ed3f14' },
        { title: '本月提现金额', title2: '总商品数量', text: '件', icon: 'md-trending-up', count: 10000, num: 3, color: '#ed3f14' },
        { title: '上月提现人数', title2: '总商品数量', text: '件', icon: 'md-trending-up', count: 10000, num: 3, color: '#ed3f14' },
        { title: '上月提现笔数', title2: '总商品数量', text: '件', icon: 'md-trending-up', count: 10000, num: 3, color: '#ed3f14' },
        { title: '上月提现金额', title2: '总商品数量', text: '件', icon: 'md-trending-up', count: 10000, num: 3, color: '#ed3f14' }
      ],
      time: ['2019-9-03',
        '2019-8-22',
        '2019-8-21',
        '2019-8-20',
        '2019-8-19',
        '2019-8-10',
        '2019-8-04',
        '2019-8-02',
        '2019-8-01',
        '2019-7-31',
        '2019-7-30',
        '2019-4-10',
        '2019-1-15',
        '2019-1-11'
      ],
      data: [
        {
          name: '提现人数',
          type: 'line',
          data: [
            '14',
            '0',
            '0',
            '2',
            '0',
            '13',
            '37',
            '132',
            '54',
            '248',
            '609',
            '0',
            '172',
            '240'
          ]
        },
        {
          name: '提现金额',
          type: 'line',
          data: [
            2,
            1,
            1,
            5,
            5,
            1,
            2,
            1,
            17,
            14,
            14,
            1,
            3,
            1
          ]
        }
      ],
      num: 0,
      num2: 0,
      num3: 0,
      fillData: []
    }
  },
  methods: {
    search () {

    },
    productBtn (index, type) {
      if (type === 'state') {
        this.num = index
      } else if (type === 'isType') {
        this.num2 = index
      } else {
        this.num3 = index
      }
    }
  }
}
</script>

<style>
  .tableText {
    padding-left: 0px;
    padding-right: 0px;
  }

  .ivu-btn {
    margin-right: 10px;
  }

  .isClass {
    background-color: #0092DC;
    color: #fff;
  }

  .tableText p {
    font-size: 13px;
  }

  .ed-count-text {
    font-size: 30px;
  }

  .slot-text {
    margin-top: 10px;
    font-size: 12px;
  }

  .ed-text {
    position: absolute;
    top: 13px;
    right: 16px;
    background-color: #2F4056;
    color: #fff;
    padding: 0 5px;
    font-size: 12px;
    border-radius: 2px
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

  .ivu-progress {
    margin-bottom: 10px;
  }
</style>
