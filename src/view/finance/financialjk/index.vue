<template>
  <div>
    <Row>
      <Col span="24">
        <Card dis-hover>
          <p slot="title">搜索条件</p>
          <div style="display:flex;">
            <div class="content">
              <p class="text">昵称/ID</p>
              <input type="text" v-model="keyWords" placeholder="请输入您的姓名..." />
            </div>
            <div class="content" style="margin-left:20px">
              <p class="text">时间范围</p>
                    <DatePicker type="date"  @on-change="changeTime"  placeholder="开始时间" style="width:150px;border-radius:0;margin-right:10px"></DatePicker>
              <p>-</p>
            </div>
            <div class="content">
                    <DatePicker type="date"  @on-change="changeTime1"  placeholder="结束时间" style="width:150px;margin-left:10px"></DatePicker>
            </div>
            <div class="content" style="margin-left:20px">
              <p class="text" style="border-right:none">筛选类型</p>
              <i-select
                :model.sync="model3"
                style="width:150px;outline:none"
                size="large"
                @on-change="selectValue1"
              >
                <i-option
                  v-for="(item,index) in cityList"
                  :value="item.value"
                  :key="index"
                >{{ item.label }}</i-option>
              </i-select>
            </div>
            <Button
              type="info"
              icon="ios-search"
              style="margin-left:20px"
              @click="search(keyWords,startTime,endTime)"
            >搜索</Button>
            <Button icon="md-print" type="primary" style="margin-left:20px" @click="expend">导出</Button>
          </div>
        </Card>
      </Col>
    </Row>
    <Row style="margin-top:15px">
      <Col span="24">
        <Card dis-hover>
          <p slot="title">资金监控日志</p>
          <Table border :columns="columns5" :data="data5" ref="table" :loading="loading"></Table>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    axios({
      url: 'http://www.baidu.com/jiankong'
    }).then(res => {
      // console.log(res.data.list);
      this.data5 = res.data.list
      this.list = res.data.list
      this.loading = false
    })
  },
  data () {
    return {
      list: [],
      keyWords: '',
      minMoney: '',
      maxMoney: '',
      loading: true,
      startTime: '',
      endTime: '',
      cityList: [
        {
          value: 'push',
          label: '全部'
        },
        {
          value: 'poll',
          label: '用户分享记录'
        }
      ],
      model3: '',
      columns5: [
        {
          title: '会员ID',
          key: 'id',
          align: 'center',
          'sortable': true
        },
        {
          title: '昵称',
          key: 'nickName',
          align: 'center'
        },
        {
          title: '金额积分',
          key: 'moneyJF',
          align: 'center',
          'sortable': true
        },
        {
          title: '类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '备注',
          key: 'desc',
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'setTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'set',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '删除操作',
                        content: '<p>确认删除吗？</p>',
                        onOk: () => {
                          this.remove(params.index)
                        }
                      })
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data5: []
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '用户信息',
        content: `姓名：${this.data5[index].nickName}<br>金额积分：${this.data5[index].moneyJF}<br>类型：${this.data5[index].type}<br>
                    备注：${this.data5[index].desc}<br>
                    `
      })
    },
    remove (index) {
      this.data5.splice(index, 1)
    },
    selectValue1 (e) {
    //   console.log(e)
      // 这里只是升序降序，需要接口来判断
      if (e === 'push') {
        // 升序
        // eslint-disable-next-line no-inner-declarations
        function compare (property) {
          return function (a, b) {
            var value1 = a[property]
            var value2 = b[property]
            return value1 - value2
          }
        }
        this.data5.sort(compare('moneyJF'))
      }
      if (e === 'poll') {
        // 降序
        // eslint-disable-next-line no-inner-declarations
        function compare (property) {
          return function (a, b) {
            var value1 = a[property]
            var value2 = b[property]
            return value2 - value1
          }
        }
        this.data5.sort(compare('moneyJF'))
      }
    },
    // 导出文件
    expend () {
      this.$Modal.confirm({
        title: '导出文件操作',
        content: '<p>是否导出？</p>',
        onOk: () => {
          this.$refs.table.exportCsv({
            filename: '资金监控日志'
          })
        },
        onCancel: () => {
          this.$Message.info('您取消了导出操作！')
        }
      })
    },
    // 定义一个范围搜索方法
    search2 (startTime, endTime) {
      console.log(startTime, endTime)
      var newStartTime = startTime.split('-')
      var newendTime = endTime.split('-')
      console.log(newStartTime, newendTime)
      return this.data5.filter(item => {
        if (startTime <= item.setTime && item.setTime <= endTime) {
          return item
        }
      })
    },
    // 自定义一个搜索方式
    search1 (keyWords) {
      return this.list.filter(item => {
        if (item.nickName.includes(keyWords)) {
          return item
        }
      })
    },
    search (keyWords, startTime, endTime) {
      var arr = this.search1(keyWords)
      if (arr.length > 0) {
        this.data5 = arr
      } else if (arr.length === 0) {
        this.$Message.info('请输入用户姓名...')
      }

      if (startTime && endTime) {
        var brr = this.search2(startTime, endTime)
        // console.log(brr, startTime, endTime)
        this.data5 = brr
        if (brr.length === 0) {
          this.$Message.info('暂未搜到匹配信息，请检查时间范围')
          this.data5 = this.list
        }
      } else if (startTime || endTime) {
        this.$Message.info('请输入正确的时间范围')
        this.data5 = this.list
      }

      if (!keyWords && !startTime && !endTime) {
        this.$Message.info('请输入关键词进行搜索吧')
      }
    },
    changeTime (e) {
      this.startTime = e
    },
    changeTime1 (e) {
      this.endTime = e
    }
  }
}
</script>
<style scoped>
.content {
  display: flex;

  align-items: center;
}

.content input {
  outline: none;
  width: 150px;
  height: 34px;
  padding: 5px 15px;
  line-height: 24px;
  border-radius: 0 5px 5px 0;
  background: none;
  border: 1px solid #ccc;
  border-left: none;
}

.text {
  width: 110px;
  padding: 5px 15px;
  height: 34px;
  line-height: 24px;
  background: none;
  border-radius: 5px 0 0 5px;
  border: 1px solid #ccc;
  text-align: center;
}

.ivu-select-selection {
  outline: none;
  height: 34px;
}
</style>
