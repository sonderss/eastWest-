<template>
  <div>
    <Input
      style="width:300px;margin-bottom:15px"
      v-model="keyWords"
      search
      enter-button="搜索"
      placeholder="请输入订单编号..."
      @on-search="search(keyWords)"
    />
    <Table border :columns="columns7" :data="data6" :loading="loading"></Table>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export default {
  mounted () {
    axios({
      url: 'http://www.baidu.com/chongzhi'
    }).then(res => {
      // console.log(res.data.list)
      this.data6 = res.data.list
      this.dataList = res.data.list
      this.loading = false
    })
  },
  data () {
    return {
      keyWords: '',
      dataList: [],
      loading: true,
      columns7: [
        {
          title: '编号',
          key: 'id',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.id)
            ])
          }
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '订单编号',
          key: 'orderNum'
        },
        {
          title: '支付金额',
          key: 'payMoney'
        },
        {
          title: '支付类型',
          key: 'payMethod'
        },
        {
          title: '支付时间',
          key: 'payTime'
        },
        {
          title: '操作',
          key: 'set',
          width: 150,
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
      data6: []
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '充值信息',
        content: `名字：${this.data6[index].name}<br>支付金额：${this.data6[index].payMoney}<br>支付时间：${this.data6[index].payTime}<br>支付方式：${this.data6[index].payMethod}`
      })
    },
    // 定义一个搜索方法
    searchKeyWords (keyWords) {
      return this.dataList.filter(item => {
        if (item.orderNum.includes(keyWords)) {
          return item
        }
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    },
    search (keyWords) {
      // console.log(keyWords)
      var arr = this.searchKeyWords(keyWords)
      if (arr) {
        this.data6 = arr
      } else {
        this.$Message.info('未查询到相关信息，请核实编号')
      }
    }
  }
}
</script>
