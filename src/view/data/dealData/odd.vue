<template>
  <div>
    <Collapse v-model="collapsed" accordion>
      <Panel name="1">
        搜索条件
        <div slot="content" class="topBody">
          <Row>
            <Col span="24">
              <span style="margin-right: 50px">产品状态:</span>
              <i-button v-for="(item,index) in productState" @click="productBtn(index,'state')"
                        :class="{isClass:num === index}" :key="item">{{item}}
              </i-button>
            </Col>
          </Row>
          <Row>
            <Col span="24" style="margin-top: 10px">
              <span style="margin-right: 50px">产品类型:</span>
              <i-button v-for="(item,index) in productType" @click="productBtn(index,'isType')"
                        :class="{isClass:num2 === index}" :key="item">{{item}}
              </i-button>
            </Col>
          </Row>
          <Row>
            <Col span="24" style="margin-top: 10px">
              <span style="margin-right: 50px">创建时间:</span>
              <i-button v-for="(item,index) in createTime" @click="productBtn(index,'create')"
                        :class="{isClass:num3 === index}" :key="item">{{item}}
              </i-button>
            </Col>
          </Row>
          <div style="margin-top: 10px">
            <Button type="primary" icon="ios-search" @click="search">{{$t('search')}}</Button>
            <Button type="primary" icon="ios-refresh">{{$t('table.refresh')}}</Button>
          </div>
        </div>
      </Panel>
    </Collapse>
    <div class="tableText" style="background-color:#f3f3f4;">
      <div>
        <Row :gutter="20">
          <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
            <card :color="infor.color" :icon="infor.icon" :icon-size="12">
              <p style="border-bottom: 1px solid #ccc">{{ infor.title }}</p>
              <count-to :end="infor.count" count-class="count-style"/>
            </card>
          </i-col>
        </Row>
        <Row>
          <Card shadow>
            <oddEhart style="height: 310px;"/>
          </Card>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import oddEhart from './oddEhart.vue'
export default {
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    oddEhart
  },
  data () {
    return {
      collapsed: '1',
      productState: ['全部商品', '未支付', '未发货', '待收货', '待评价', '交易完成', '退款中', '已退款'],
      productType: ['全部', '普通', '拼团', '砍价', '秒杀'],
      createTime: ['全部', '今天', '昨天', '本周', '本月', '本季度', '本年', '自定义'],
      inforCardData: [
        { title: '拼团订单数量', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '砍价订单数量', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '秒杀订单数量', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '普通订单数量', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '使用优惠卷金额', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '积分消耗数', icon: 'md-map', count: 14, color: '#9A66E4' },
        { title: '积分抵扣金额', icon: 'md-map', count: 14, color: '#9A66E4' },
        { title: '在线支付金额', icon: 'md-map', count: 14, color: '#9A66E4' },
        { title: '余额支付金额', icon: 'md-map', count: 14, color: '#9A66E4' },
        { title: '赚取积分', icon: 'md-map', count: 14, color: '#9A66E4' },
        { title: '交易额', icon: 'md-map', count: 14, color: '#9A66E4' },
        { title: '订单商品数量', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      num: 0,
      num2: 0,
      num3: 0
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
  .ivu-btn {
    margin-right: 10px;
  }

  .isClass {
    background-color: #0092DC;
    color: #fff;
  }

  .count-style {
    font-size: 20px;
  }

  .tableText p {
    font-size: 13px;
  }
</style>
