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
      <div style="margin-bottom: 10px">
        <Row>
          <Card shadow>
            <p>充值笔数</p>
            <Divider/>
            <chart-line style="height: 300px;" :value="time" :data="data" text="充值笔数曲线图"></chart-line>
          </Card>
        </Row>
      </div>
      <div>
        <Row>
          <Card shadow>
            <p>充值金额</p>
            <Divider/>
            <chart-bar style="height: 300px;" :value="barData" text="充值金额柱状图"></chart-bar>
          </Card>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from '_c/count-to'
import { ChartLine, ChartBar } from '_c/charts'

export default {
  name: 'oddChart',
  components: {
    CountTo,
    ChartLine,
    ChartBar
  },
  data () {
    return {
      collapsed: '1',
      createTime: ['全部', '今天', '本周', '本月', '本季度', '本年'],
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
      barData: {
        普通商品: 625,
        拼团商品: 5,
        会员充值: 62,
        秒杀商品: 125
      },
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

  .count-text {
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
