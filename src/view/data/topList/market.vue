<template>
  <div>
    <div class="top">
      <p>搜索条件{{ i_value2 }}</p>
      <div style="overflow: hidden;">
        <div class="item">
          <span style="float: left;font-size: 13px;">商品名称</span>
          <input v-model="i_value" class="i_input" />
        </div>
        <div class="item">
          <span style="float: left;font-size: 13px;">时间范围</span>
          <DatePicker @on-change="changedata" class="d_time" size="large" type="date" placeholder="开始时间" style="width:160px"></DatePicker>
        </div>
        <div class="kline">-</div>
        <div class="item"><DatePicker @on-change="changedata2" class="d_time" size="large" type="date" placeholder="结束时间" style="width: 160px"></DatePicker></div>
        <Button style="margin-top: 12px;margin-right: 12px;" type="primary" icon="ios-search">搜索</Button>
        <Button style="margin-top: 12px;" type="success" icon="md-grid" @click.native="exportData">导出</Button>
      </div>
    </div>
    <div class="content" style="margin-top: 20px;">
      <p>资金监控日志</p>
      <div style="padding: 10px;">
        <Table border :columns="columns5" :data="data1" ref="table"></Table>
        <div class="page"><Page :total="100" size="small" show-elevator show-total show-sizer /></div>
      </div>
    </div>
    <Modal class="M_content" width="770" draggable v-model="modal1" :title="title">
      <div class="modal_form">
        <div class="search" style="margin-bottom: 20px;">
          <p>搜索条件</p>
          <div>
            <div class="create">
              <span>创建时间:</span>
              <div>
                <div class="btnlist">
                  <Button size="small" v-for="(x, index) in textlist" :key="index" :data-index="index" @click="changebtn" :class="num == index ? 'active' : ''">{{ x }}</Button>
                  <Button size="small" @click="custom">自定义</Button>
                  <DatePicker size="small" v-if="isShow" :value="value2" type="daterange" placement="bottom-end" style="width: 200px"></DatePicker>
                </div>
                <div>
                  <Button size="small" style="margin:5px;margin-bottom: 15px;" type="primary" icon="ios-search">搜索</Button>
                  <Button size="small" style="margin:5px;margin-bottom: 15px;" icon="ios-refresh">刷新</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cow" style="margin-bottom: 20px;">
          <div class="cow_item">
            <p>销售额排名</p>
            <div>15</div>
          </div>
          <div class="cow_item">
            <p>销量排名</p>
            <div>1</div>
          </div>
          <div class="cow_item">
            <p>商品销量</p>
            <div>181</div>
          </div>
          <div class="cow_item">
            <p>点赞次数</p>
            <div>0</div>
          </div>
        </div>
        <!-- 销售总额 -->
        <div class="saleall" style="margin-bottom: 20px;">
          <p>销售总额</p>
          <div>543</div>
        </div>
        <!-- 发放优惠卷： -->
        <div class="prefer" style="margin-bottom: 20px;">
          <p>发放优惠卷:</p>
          <salestrend v-if="modal1" style="height: 500px" :value="time" :data="lineData" text="销量走势"></salestrend>
        </div>
        <!-- 销售记录： -->
        <div class="notes">
          <p>销售记录:</p>
          <div style="padding:10px"><Table :columns="recordcolumns" :data="recordData"></Table></div>
          <div style="padding:10px;overflow: hidden;"><Page style="float: right;" :total="100" prev-text="上一页" next-text="下一页" /></div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Salestrend from './Salestrend.vue'
import edLine from '_c/charts/line.vue'
export default {
  name: 'market',
  data () {
    return {
      i_value: '',
      i_value2: '',
      i_value3: '',
      modal1: false,
      num: 0,
      title: '',
      value2: ['2019-01-01', '2019-12-31'],
      isShow: false,
      textlist: ['全部', '今天', '本周', '本月', '本季度', '本年'],
      time: [
        '2019-08-01',
        '2019-08-02',
        '2019-08-03',
        '2019-08-04',
        '2019-08-05',
        '2019-08-06',
        '2019-08-07',
        '2019-08-08',
        '2019-08-09',
        '2019-08-10',
        '2019-08-11',
        '2019-08-12',
        '2019-08-13',
        '2019-08-14',
        '2019-08-15',
        '2019-08-16',
        '2019-08-17',
        '2019-08-18',
        '2019-08-19',
        '2019-08-20'
      ],
      lineData: [
        {
          name: '订单数量',
          type: 'line',
          data: ['0.01',
            '1756.00',
            '3035.00',
            '402.00',
            '991.00',
            '847.00',
            '1774.00',
            '563.81',
            '1215.00',
            '584.00',
            '1062.00',
            '1380.00',
            '1392.00',
            '870.00',
            '2016.00',
            '1459.00',
            '1565.00',
            '51.00',
            '375.00',
            '867.00']
        }
      ],
      columns5: [
        {
          title: '商品编号',
          key: 'id',
          sortable: true
        },
        {
          title: '商品图片',
          key: 'two',
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  domProps: {
                    src: params.row.two
                  },
                  style: {
                    width: '100px',
                    height: 'auto',
                    display: 'block',
                    margin: '5px 0'
                  }
                },
                'View'
              )
            ])
          }
        },
        {
          title: '商品名称',
          key: 'name'
        },
        {
          title: '商品售价',
          key: 'price'
        },
        {
          title: '销售额',
          key: 'salevalue',
          sortable: true
        },
        {
          title: '销量',
          key: 'sale'
        },
        {
          title: '操作',
          key: 'four',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-document-outline'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true
                      this.title = params.row.name
                    }
                  }
                },
                '详情'
              )
            ])
          }
        }
      ],
      data1: [
        {
          id: 13,
          two: 'http://shop.0ps.top/public/uploads/attach/2019/07/30//de4d30071925b47d58da90dcdb0f9dbf.jpg',
          name: '正品盛安康L码15片装成人护理垫60X90老人产妇婴幼童一次性隔尿垫',
          price: '66.00',
          salevalue: 2028.0,
          sale: 52
        },
        {
          id: 25,
          two: 'https://shop.0ps.top/public/uploads/attach/2019/08/15/5d54a9e1401c0.jpg',
          name:
            'ICU大套装、（下单送五套探视装）、护理垫（60*90）1包，3M干洗洁肤液（1套），干，湿纸巾（各1包）、水杯（2个）指甲钳（1个）、护肤油（1瓶）、枕头（3个）、牙膏、牙刷（各1个）、诺必行润唇膏（1支）',
          price: '55.00',
          salevalue: 1501.0,
          sale: 92
        },
        {
          id: 8,
          two: 'https://shop.0ps.top/public/uploads/attach/2019/07/30/5d4041d2eb684.jpg',
          name: '好奇初生纸尿裤、NB35片装/男女宝宝通用',
          price: '309.00',
          salevalue: 1002.0,
          sale: 34
        },
        {
          id: 36,
          two: 'https://shop.0ps.top/public/uploads/attach/2019/07/30/5d4045017db50.jpg',
          name: '维达湿纸巾、正品维达80片装/天然呵护/温和洁肤/婴儿柔湿巾',
          price: '854.00',
          salevalue: 852.0,
          sale: 88
        }
      ],
      recordcolumns: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '会员昵称',
          key: 'name'
        },
        {
          title: '商品单价(元)',
          key: 'price'
        },
        {
          title: '购买数量',
          key: 'quantity'
        },
        {
          title: '销售总额',
          key: 'sale'
        }
      ],
      recordData: [
        {
          id: 27,
          time: '2019-08-01',
          name: '文仔',
          price: '3.00',
          quantity: '1',
          sale: 3
        },
        {
          id: 27,
          time: '2019-08-01',
          name: '文仔',
          price: '3.00',
          quantity: '1',
          sale: 3
        },
        {
          id: 27,
          time: '2019-08-01',
          name: '文仔',
          price: '3.00',
          quantity: '1',
          sale: 3
        },
        {
          id: 27,
          time: '2019-08-01',
          name: '文仔',
          price: '3.00',
          quantity: '1',
          sale: 3
        },
        {
          id: 27,
          time: '2019-08-01',
          name: '文仔',
          price: '3.00',
          quantity: '1',
          sale: 3
        },
        {
          id: 27,
          time: '2019-08-01',
          name: '文仔',
          price: '3.00',
          quantity: '1',
          sale: 3
        }
      ]
    }
  },
  components: {
    Salestrend,
    edLine
  },
  methods: {
    changedata (data) {
      this.i_value2 = data
    },
    changedata2 (data) {
      this.i_value3 = data
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: '商品数据'
      })
    },
    changebtn (e) {
      this.isShow = false
      if (e.target.localName === 'span') {
        this.num = e.target.parentNode.dataset.index
      } else {
        this.num = e.target.dataset.index
      }
    },
    custom () {
      this.isShow = true
      this.num = -1
    }
  }
}
</script>
<style lang="less">
.d_time {
  input {
    border-radius: 0;
    height: 37px;
  }
}
.M_content {
  .ivu-modal-body {
    background: #f1f1f1;
  }
}
</style>
<style scoped lang="less">
.top,
.content,
.search,
.cow_item,
.saleall,
.notes,
.prefer{
  width: 100%;
  background: #ffffff;
  p {
    font-size: 15px;
    padding: 10px;
    border-bottom: 1px solid #e5e6e7;
  }
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.saleall {
  div {
    font-size: 25px;
    line-height: 80px;
    text-indent: 10px;
  }
  p:after {
    overflow: hidden;
    content: '元';
    font-size: 13px;
    border-radius: 2px;
    padding: 1px 6px;
    line-height: 20px;
    width: 24px;
    height: 20px;
    background: #1e9fff;
    color: #fff;
    float: right;
  }
}
.cow_item {
  margin-right: 10px;
  overflow: hidden;
  div {
    font-size: 25px;
    line-height: 80px;
    text-indent: 10px;
  }
  p:after {
    overflow: hidden;
    content: '名';
    font-size: 13px;
    border-radius: 2px;
    padding: 1px 6px;
    line-height: 20px;
    width: 24px;
    height: 20px;
    background: #1e9fff;
    color: #fff;
    float: right;
  }
}
.cow_item:nth-child(4){
  margin-right: 0px;
  p:after {
    content: '个'
  }
}
.item {
  padding: 10px;
  overflow: hidden;
  float: left;
  span {
    width: 100px;
    text-align: center;
    padding: 8px;
    border: 1px solid #e5e6e7;
    border-right: none;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  .i_input {
    width: 160px;
    height: 37px;
    border: none;
    border: 1px solid #e5e6e7;
    outline: 0;
    text-indent: 7px;
  }
}
.kline {
  float: left;
  line-height: 57px;
}
.page {
  padding: 10px;
  border: 1px solid #e8eaec;
  border-top: none;
}
.active {
  background: #2d8cf0;
  color: #fff;
}
.btnlist {
  button {
    margin: 15px 5px;
  }
}
.create {
  > span {
    display: inline-block;
    vertical-align: middle;
    margin: 20px;
  }
  > div {
    display: inline-block;
    vertical-align: middle;
  }
}
.cow {
  display: flex;
  justify-content: space-between;
}
.modal_form {
  padding-right: 10px;
  width: 770px;
  height: 682px;
  overflow: auto;
}
</style>
