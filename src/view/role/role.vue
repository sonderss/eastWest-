<template>
  <div>
    <div class="demo-split">
      <div slot="top" class="demo-split-pane">
        <div class="btn">
          <Button type="warning" @click="remove1(index)">删除</Button>
          <Button type="primary" @click="add(index)">新增</Button>
        </div>
      </div>
    </div>
    <div slot="bottom" class="pane">
      搜索
      <Input v-model="keywords" placeholder="请输入姓名关键词进行搜索..." style="width: 300px" />
      <Button type="primary" @click="search1(keywords)">搜索</Button>
    </div>
    <div>
      <Table
        :columns="columns1"
        :data="list"
        border
        highlight-row
        @on-row-click="getData"
        :loading="loading"
      ></Table>
    </div>
    <Tabs
      type="card"
      class="user_table"
      style="margin-top:240px"
      v-model="menu_tab"
      @on-click="menu_pow(index)"
    >
      <TabPane label="成员列表" name="user_tab">
        <Button
          type="primary"
          @click="getRoot_dom(index)"
          style="width:100px;align-self: flex-end;margin-right:50px"
        >菜单权限</Button>
        <Table border :columns="columns2" :data="data1" :loading="loading"></Table>
      </TabPane>
      <TabPane label="菜单权限" name="menu_tab"></TabPane>
    </Tabs>
    <model_del :modal1="modal1" @cancel="cancel" @del="okDel(index)"></model_del>
    <Modal v-model="modal0" title="添加信息" :draggable="true">
      <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="80">
        <FormItem label="工号" prop="value1">
          <Input v-model="formValidate1.value1" />
        </FormItem>
        <FormItem label="姓名" prop="value2">
          <Input v-model="formValidate1.value2" />
        </FormItem>
        <FormItem label="账号名" prop="value3">
          <Input v-model="formValidate1.value3"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="back">取消</Button>
        <Button type="primary" size="large" @click="addMessage(index)">确定</Button>
      </div>
    </Modal>
    <!-- 取消用户权限确认 -->
    <Modal v-model="modal2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>取消该用户对应的权限</span>
      </p>
      <div style="text-align:center">
        <p>取消后，该用户的权限被收回，可能会影响正常使用</p>
        <p>are you sure?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click.stop="sureDel(index,index1)">确认</Button>
      </div>
    </Modal>

    <!-- 菜单权限选择器 穿梭框 -->
    <Modal v-model="showTranser" :draggable="true" title="设置角色成员">
      <Transfer
        :data="data2"
        :target-keys="right_data"
        filterable
        :filter-method="filterMethod"
        @on-change="handleChange2"
        :titles="titleArray"
      ></Transfer>
    </Modal>
    <!-- 菜单权限 树形图-->
    <Modal
      v-model="showTranser1"
      :draggable="true"
      title="设置角色菜单权限"
      @on-ok="isOkTree"
      @on-cancel="cancelTree"
    >
      <Tree ref="tree" :data="data_tree" show-checkbox></Tree>
    </Modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import model_del from '../../components/model_del/model_del.vue'
export default {
  components: { model_del },
  data () {
    return {
      total: 20,
      pageSize: 5,
      list: [],
      titleArray: ['用户', '拥有该权限的成员'],
      keywords: '',
      pageNo: 1,
      modal1: false,
      modal0: false,
      modal2: false,
      showTranser: false,
      showTranser1: false,
      index: '',
      menu_tab: '',
      index1: '',
      loading: true,
      nameList: [],
      formValidate1: {
        value1: '',
        value2: '',
        value3: ''
      },
      ruleValidate1: {
        value1: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        value2: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        value3: [{ required: true, message: '账号名不能为空', trigger: 'blur' }]
      },
      columns1: [
        {
          title: '角色名称',
          key: 'roleName',
          width: 200
        },
        {
          title: '描述信息',
          key: 'desc'
        }
      ],
      columns2: [
        {
          title: '工号',
          key: 'id'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '账号名',
          key: 'username'
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delete(params.index)
                    }
                  }
                },
                '取消该用户权限'
              )
            ])
          }
        }
      ],
      data1: [],
      data2: [],
      right_data: [],
      data_tree: [
        {
          title: '商品管理',
          expand: false,
          checked: true,
          children: [
            {
              title: '商品信息',
              expand: true
            },
            {
              title: '商品类型',
              expand: true
            },
            {
              title: '商品分类',
              expand: true
            },
            {
              title: '油画场景',
              expand: true
            },
            {
              title: '商品推荐',
              expand: true
            }
          ]
        },
        {
          title: '订单管理',
          expand: false,
          checked: true,
          children: [
            {
              title: '订单信息',
              expand: true
            }
          ]
        },
        {
          title: '用户管理',
          expand: false,
          checked: true,
          children: [
            {
              title: '用户信息',
              expand: true
            }
          ]
        },
        {
          title: '基础数据',
          expand: false,
          checked: true,
          children: [
            {
              title: '计量单位'
            },
            {
              title: '品牌设置'
            }
          ]
        },
        {
          title: '参数设置',
          expand: false,
          checked: false,
          children: [
            {
              title: '系统参数'
            },
            {
              title: '邮件设置'
            }
          ]
        },
        {
          title: '系统管理',
          expand: false,
          checked: false,
          children: [
            {
              title: '账号管理'
            },
            {
              title: '角色'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 1000)
    this.list = [
      {
        roleName: '默认角色',
        desc: '所有成员默认拥有角色',
        arr: [
          {
            id: 1,
            name: '周星驰',
            username: 'sonder'
          },
          {
            id: 2,
            name: '梁朝伟',
            username: 'sonder'
          }
        ]
      },
      {
        roleName: '网站管理员',
        desc: '除了系统管理啥都不做',
        arr: [{ id: 2, name: '速洋网络', username: '速洋' }]
      },
      {
        roleName: '网站业务',
        desc: '负责业务相关的功能',
        arr: [
          {
            id: 3,
            name: '曾小贤',
            username: '123'
          }
        ]
      }
    ]
  },
  methods: {
    add (index) {
      if (typeof index === 'number') {
        this.modal0 = true
      } else {
        alert('请选择一项进行操作')
      }
    },
    search (keywords) {
      var brr = []
      for (var i in this.list) {
        brr = brr.concat(this.list[i].arr)
      }
      return brr.filter(item => {
        if (item.name.includes(keywords)) {
          return item
        }
      })
    },
    search1 (keywords) {
      var arr = this.search(keywords)
      this.data1 = arr
      if (!keywords) {
        this.data1 = [] // 返回之前，先把之前搜到结果为空
        this.list = [
          {
            roleName: '默认角色',
            desc: '所有成员默认拥有角色',
            arr: [
              {
                id: 1,
                name: '周星驰',
                username: 'sonder'
              },
              {
                id: 2,
                name: '梁朝伟',
                username: 'sonder'
              }
            ]
          },
          {
            roleName: '网站管理员',
            desc: '除了系统管理啥都不做',
            arr: [{ id: 2, name: '速洋网络', username: '速洋' }]
          },
          {
            roleName: '网站业务',
            desc: '负责业务相关的功能',
            arr: [
              {
                id: 3,
                name: '曾小贤',
                username: '123'
              }
            ]
          }
        ]
      }
    },
    getData (data, index) {
      this.data1 = []
      this.data2 = []
      this.right_data = []
      let data_arr = []
      for (var i in data.arr) {
        this.data1.push(data.arr[i])
      }
      for (let i = 0; i < this.list.length; i++) {
        data_arr = data_arr.concat(this.list[i].arr)
      }
      for (let i = 0; i < data_arr.length; i++) {
        this.data2.push({
          key: i.toString(),
          label: data_arr[i].name
        })
      }
      for (let i = 0; i < data.arr.length; i++) {
        for (let j = 0; j < data_arr.length; j++) {
          if (data.arr[i].name === data_arr[j].name) {
            this.right_data.push(j.toString())
          }
        }
      }
      this.index = index
    },
    remove1 (index) {
      if (typeof index === 'number') {
        this.modal1 = true
      } else {
        alert('请选择一项进行删除')
      }
    },
    okDel (index) {
      this.list.splice(index, 1)
      this.modal1 = false
      this.data1 = []
    },
    cancel () {
      this.modal1 = false
    },
    // 模态 确定按钮
    addMessage (index) {
      if (
        this.formValidate1.value1 &&
        this.formValidate1.value2 &&
        this.formValidate1.value3
      ) {
        var obj = {
          id: this.formValidate1.value1,
          name: this.formValidate1.value2,
          username: this.formValidate1.value3
        }
        this.list[index].arr.push(obj)
        this.data1.push(obj)
        this.modal0 = false
      } else {
        this.modal0 = true
        this.$Message.info('请补充完整或者取消')
      }
      this.formValidate1.value1 = ''
      this.formValidate1.value2 = ''
      this.formValidate1.value3 = ''
    },
    // 模态 取消按钮
    back () {
      this.modal0 = false
      this.index = ''
      this.formValidate1.value1 = ''
      this.formValidate1.value2 = ''
      this.formValidate1.value3 = ''
    },
    // 弹出确认对话框
    delete (ind) {
      this.index1 = ind
      this.modal2 = true
      // this.data1.splice(index,1)
      console.log(this.index1)
    },
    // 确认删除
    sureDel (index, index1) {
      this.data1.splice(index1, 1)
      this.list[index].arr.splice(index1, 1)
      this.modal2 = false
    },
    // 菜单权限
    getRoot_dom (index) {
      if (typeof index === 'number') {
        this.showTranser = true
      } else {
        alert('请选择一项进行操作')
      }
    },
    handleChange2 (newTargetKeys) {
      // console.log(newTargetKeys)
      this.right_data = newTargetKeys
    },
    filterMethod: function (data, query) {
      // 搜索
      return data.label.indexOf(query) > -1
    },
    // 菜单权限弹出确认
    menu_pow (index) {
      if (this.menu_tab === 'menu_tab' && typeof index === 'number') {
        this.showTranser1 = true
        // 网站业务的权限
        if (index === 2) {
          this.$refs.tree.data[4].checked = true
          this.$refs.tree.data[5].checked = true
        } else {
          this.$refs.tree.data[4].checked = false
          this.$refs.tree.data[5].checked = false
        }
        // 网站管理员的权限
        if (index === 1) {
          this.$refs.tree.data[4].children[0].checked = false
          this.$refs.tree.data[4].children[1].checked = false
          this.$refs.tree.data[5].children[0].checked = false
          this.$refs.tree.data[5].children[1].checked = false
        }
      } else if (this.menu_tab === 'user_tab' && typeof index === 'number') {
      } else {
        alert('请选择一项进行操作')
      }
    },
    isOkTree () {
      console.log('点击了确定')
    },
    cancelTree () {
      console.log('点击了取消')
    }
  }
}
</script>

<style  scoped>
.demo-split {
  height: 50px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.btn {
  width: 50%;
  float: right;
}
.btn button {
  float: right;
  margin: 0 6px;
}
.search {
  width: 100px;
}
.pane {
  width: 100%;
  height: 50px;
  border: 1px solid #dcdee2;
  padding: 10px;
}
.mo {
  display: flex;
  flex-direction: column;
}
.ivu-tabs .ivu-tabs-tabpane {
  visibility: visible;
  display: flex;
  flex-direction: column;
}
</style>
