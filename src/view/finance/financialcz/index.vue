<template>
  <div>
    <i-select :model.sync="model1" style="width:100px" @on-change="selectValue" placeholder="提现状态">
      <i-option v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</i-option>
    </i-select>
    <i-select
      :model.sync="model2"
      style="width:100px;margin-left:15px"
      @on-change="selectValue1"
      placeholder="提现方式"
    >
      <i-option v-for="(item,index) in cityList1" :value="item.value" :key="index">{{ item.label }}</i-option>
    </i-select>
    <i-input v-model="keywords" placeholder="请输入用户信息..." style="width: 300px;margin-left:15px"></i-input>
    <i-button type="info" style="margin-left:5px" @click="search(keywords)">搜索</i-button>
    <i-table border :content="self" style="margin-top:15px" :columns="columns1" :data="data1" :loading="loading"></i-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      cityList: [
        {
          value: 'static',
          label: '提现状态'
        },
        {
          value: '未通过',
          label: '未通过'
        },
        {
          value: '未提现',
          label: '未提现'
        },
        {
          value: '已通过',
          label: '已通过'
        }
      ],
      model1: "",
      cityList1: [
        {
          value: 'CashWithdrawalMethod',
          label: '提现方式'
        },
        {
          value: '支付宝',
          label: '支付宝'
        },
        {
          value: '微信',
          label: '微信'
        },
        {
          value: '银行卡',
          label: '银行卡'
        }
      ],
      model2: "",
      value: "",
      columns1: [
        {
          title: '编号',
          key: 'id',
          align: 'center'
        },
        {
          title: '用户信息',
          key: 'userInfo',
          align: 'center'
        },
        {
          title: '提现金额',
          key: 'getMoney',
          align: 'center'
        },
        {
          title: "提现方式",
          key: "getChioce",
          align: "center"
        },
        {
          title: "添加时间",
          key: "addTime",
          align: "center"
        },
        {
          title: "备注",
          key: "desc",
          align: "center"
        },
        {
          title: "审核状态",
          key: "static",
          align: "center"
        },
        {
          title: "操作",
          key: "set",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "删除操作",
                        content: "<p>确认删除吗？</p>",
                        onOk: () => {
                          this.remove(params.index);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      list: [], // 原始数据
      data1: [],
      self: this,
      keywords: "",
      loading:true
    };
  },
  mounted() {
    setTimeout(()=> {
        this.loading = false
    },2000)
    axios({
      url: "http://www.baidu.com/getMoney"
    }).then(res => {
      // console.log(res.data.list)
      this.list = res.data.list;
      this.data1 = res.data.list;
    });
  },
  methods: {
    selectValue(e) {
      var arr = this.searchKerWords(e);
      if (arr) {
        this.data1 = arr;
      }
      if (e == "static") {
        this.data1 = this.list;
      }
    },
    selectValue1(e) {
      // console.log(e)
      var arr = this.searchKerWords1(e);
      if (arr) {
        this.data1 = arr;
      }
      if (e == "CashWithdrawalMethod") {
        this.data1 = this.list;
      }
    },
    show(index) {
      this.$Modal.info({
        title: "用户信息",
        content: `用户：${this.data1[index].userInfo}<br>金额：${this.data1[index].getMoney}<br>渠道：${this.data1[index].getChioce}
                    <br>状态：${this.data1[index].static}
                    `
      });
    },
    remove(index) {
      this.data1.splice(index, 1);
    },
    // 定义一个状态搜索方法
    searchKerWords(keywords) {
      return this.list.filter(item => {
        if (item.static.includes(keywords)) {
          return item;
        }
      });
    },
    // 定义一个提现方式搜索方法
    searchKerWords1(keywords) {
      return this.list.filter(item => {
        if (item.getChioce.includes(keywords)) {
          return item;
        }
      });
    },
    // 定义一个用户信息搜索方法
    searchKerWords2(keywords) {
      return this.list.filter(item => {
        if (item.userInfo.includes(keywords)) {
          return item;
        }
      });
    },
    search(keywords) {
      var arr = this.searchKerWords2(keywords);
      if (arr.length > 0) {
        this.data1 = arr;
      } else if (arr.length == 0) {
        this.$Message.info("请输入正确的用户信息...");
      }
      if (
        keywords.length == 0 ||
        keywords.replace(/(^s*)|(s*$)/g, '').length == 0
      ) {
        this.$Message.info("请输入正确的用户信息");
      }
    }
  }
};
</script>


