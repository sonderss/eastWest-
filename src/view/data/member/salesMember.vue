<template>
  <div>
    <use-title></use-title>
    <Row  :gutter="15" ref='test'>
      <i-col :xs="2" :sm="4" :md="6"  v-for="(item, i) in dataArr" :key="i" style="margin-bottom: 10px;">
              <Col >
                <Card style="margin-top:10px;">
                  <p slot="title">

                      {{item.title}}
                  </p>
                  <p slot="extra" class="ed-text">

                      {{item.text}}
                  </p>
                  <Row  type="flex" class="countto-page-row">
                      <count-to :end="item.count" count-class="count-text" unit-class="unit-count"></count-to>
                  </Row>

                </Card>
            </Col>
      </i-col>
  <i-col span='8' v-for="item in dataArr1" :key="item.id" style="margin-bottom: 10px;">
              <Col >
                <Card style="margin-top:10px;">
                  <p slot="title">

                      {{item.title}}
                  </p>
                  <p slot="extra" class="ed-text">

                      {{item.text}}
                  </p>
                  <Row  type="flex" class="countto-page-row">
                      <count-to :end="item.count" count-class="count-text" unit-class="unit-count"></count-to>
                  </Row>

                </Card>
            </Col>
      </i-col>
    </Row>
      <ueChets></ueChets>
      <ueChets1></ueChets1>
      <Row style="padding:15px 0" >
        <Col span="11">
            <Card :bordered="false">
                <p slot="title">分销商数量饼状图</p>
               <!-- 插入eachts -->
               <uPro title="分销商数量饼状图" style="height:400px" :dataArr="dataArr3" :botn='botm1'></uPro>
            </Card>
        </Col>
        <Col span="12" push='1'>
            <Card shadow>
                <p slot="title">多次购物会员数量饼状图</p>
                <uPro title="多次购物会员数量饼状图" style="height:400px" :dataArr="dataArr2" :botn='botm'></uPro>
            </Card>
        </Col>
      </Row>
      <Row style="padding:15px 0">
        <Col span="11">
            <Card :bordered="false">

                  <p slot="title">
                    分销商佣金总额排行榜
                      <Tag  style="line-height:18px"  color="warning">TOP10</Tag>
                    </p>

               <Table :columns="columns1" ></Table>
            </Card>
        </Col>
        <Col span="12" push='1'>
            <Card shadow>
                <p slot="title">分销商佣金提现排行榜
                 <Tag  style="line-height:18px"  color="warning">TOP10</Tag>
                </p>

              <Table :columns="columns2" ></Table>
            </Card>
        </Col>
    </Row>

  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars

import useTitle from '../../../components/usecom/usetitle'
import ueChets from './echats/uechets'
import CountTo from '_c/count-to'
import ueChets1 from './echats/uechets1'
import uPro from '../../../components/charts/upro'
export default {
  components: { CountTo, useTitle, ueChets, ueChets1, uPro },
  data () {
    return {
      dataArr: [
        { title: '分销商总佣金', text: '元', count: 803, num: 3 },
        { title: '分销商总佣金余额', text: '元', count: 232, num: 3 },
        { title: '分销商总提现佣金', text: '元', count: 142, num: 3 },
        { title: '本月分销商业务佣金', text: '元', count: 10000, num: 3 }

      ],
      dataArr1: [
        { title: '本月分销商佣金提现金额', text: '元', count: 12, id: 10 },
        { title: '上月分销商业务佣金', text: '元', count: 14, num: 3, id: 20 },
        { title: '上月分销商佣金提现金额', text: '元', count: 14, num: 3, id: 30 }
      ],
      dataArr2: [
        { value: 30, name: '至少十次' },
        { value: 100, name: '至少一百次' },
        { value: 15, name: '至少五十次' }
      ],
      dataArr3: [
        { value: 60, name: '广州' },
        { value: 27, name: '上海' },
        { value: 27, name: '北京' }
      ],
      columns1: [
        {
          title: '排名',
          key: 'sort1'
        },
        {
          title: '昵称/手机',
          key: 'nickname1'
        },
        {
          title: '佣金',
          key: 'money'
        },
        {
          title: '注册时间',
          key: 'time1'
        }
      ],
      columns2: [
        {
          title: '排名',
          key: 'sort2'
        },
        {
          title: '昵称/手机',
          key: 'nickname2'
        },
        {
          title: '购物次数',
          key: 'buynum'
        },
        {
          title: '注册时间',
          key: 'time2'
        }
      ],
      botm: ['至少十次', '至少一百次', '至少五十次'],
      botm1: ['广州', '上海', '北京']
    }
  },
  mounted () {
    // var a = document.getElementsByClassName('ivu-row')[2].childNodes
    // console.log(a)
    // a[5].style.width = 400 + 'px'
  }
}
</script>

<style >
  .ed-text {

    background-color: #2F4056;
    color: #fff;
    padding: 0 5px;
    font-size: 12px;
    border-radius: 2px
  }
.count-text{
  font-size: 30px
}
.tag{

}
</style>
