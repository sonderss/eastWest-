<template>
  <div>
    <div class="top" style="overflow: hidden;padding: 10px;">
      <div class="search">
        <Input v-model="inptext" style="width: 160px;margin-right: 10px;" placeholder="请输入关键字"></Input>
        <Button type="primary" icon="ios-search">快速查询</Button>
      </div>
      <div class="but_list">
        <Button type="primary" icon="ios-add" @click="add">新增</Button>
      </div>
    </div>

    <Modal width=750 draggable v-model="modal1" :title="title" @on-ok="ok">
      <div class="modal_form">
        <Form ref="formCustom" :label-width="80" :model="formItem" :rules="ruleValidate" action="">
           <FormItem label="名称" prop="nameinput">
             <Input v-model="formItem.nameinput" placeholder="请填写名称"></Input>
           </FormItem>
           <FormItem label="备注信息">
              <Input v-model="formItem.decinput"  type="textarea" :autosize="{minRows: 2,maxRows: 6}" ></Input>
           </FormItem>
        </Form>
      </div>
    </Modal>
    <Modal width=650 draggable v-model="modal2" title="删除操作" @on-ok="sure_remove">
        <p style="font-size: 18px;text-align: center;">确定删除吗?</p>
    </Modal>
    <Modal width=650 draggable v-model="modal3" title="删除操作" @on-ok="exe_sure_remove">
        <p style="font-size: 18px;text-align: center;">确定删除吗?</p>
    </Modal>
    <Modal width=650 draggable v-model="modal4" title="排序操作" @on-ok="sort_sure_remove">
         <DragLists></DragLists>
    </Modal>

    <Modal width=650 draggable v-model="modal5" :title="title" @on-ok="exe_sure_add">
         <Form ref="formCustoms" :label-width="90" :model="formItems" :rules="ruleValidates" action="">
            <FormItem label="商品类型">
              <span>{{stype}}</span>
            </FormItem>
            <FormItem label="属性名称" prop="attrinputs">
              <Input v-model="formItems.attrinputs" placeholder="请填写属性名称"></Input>
            </FormItem>
            <FormItem label="属性key" prop="keyinput">
               <Input v-model="formItems.keyinput"  placeholder="请填写属性key" ></Input>
               <span>不允许有空格</span>
            </FormItem>
            <FormItem label="属性是否可选">
                <RadioGroup v-model="formItems.originradio" @on-change="attr_change">
                   <Radio label="唯一属性">唯一属性</Radio>
                   <Radio label="单选属性">单选属性</Radio>
                   <Radio label="复选属性">复选属性</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="录入方式">
                <RadioGroup v-model="formItems.originradios" @on-change="attr_change1">
                   <Radio label="手工录入">手工录入</Radio>
                   <Radio label="列表选择" :disabled="radio1">从下面的列表选择(一行列表一个可选值)</Radio>
                   <Radio label="多行文本">多行文本框</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="可选值" prop="change">
               <Input v-model="formItems.change" :disabled="radio2"  type="textarea" :autosize="{minRows: 2,maxRows: 6}" ></Input>
            </FormItem>
         </Form>
    </Modal>
    <Table border :columns="columns1" :data="data1" highlight-row @on-row-click="rowclick">
        <template slot-scope='{row,index}' slot="action">
            <Button class="btn" type="primary" size="small" style="margin-right: 6px;background: mediumpurple; border-color: mediumpurple;" @click="show(index,$event)">修改</Button>
            <Button  type="error" size="small" @click="remove(index,$event)">删除</Button>
            <Button class="btn" type="primary" size="small" style="margin:0 6px;background: gray; border-color: gray;" @click="undercarriage(index,$event)">注销</Button>
            <Button class="btn" type="primary" size="small" style="margin-right: 6px;background: seagreen; border-color: seagreen;" @click="grounding(index,$event)">启用</Button>
        </template>
    </Table>
    <div class="page"><Page :total="page_total"  show-elevator/></div>

    <Tabs type="card" value="name1">
      <div slot="extra" style="border: none;" class="but_lists">
        <Button style="margin-right: 10px;" size="small" icon="ios-add" type="primary" @click="exe_add">新增</Button>
        <Button style="margin-right: 10px;" size="small" icon="ios-swap" type="primary" @click="sort">排序</Button>
      </div>
      <TabPane label="扩展属性" name="name1">
        <Table border :columns="columns2" :data="data3">
          <template slot-scope='{row,index}' slot="actions" >
            <Button class="btn" type="primary" size="small" style="margin-right: 6px;background: mediumpurple; border-color: mediumpurple;" @click="exe_show(index)">修改</Button>
            <Button  type="error" size="small" @click="exe_remove(index)">删除</Button>
            <Button class="btn" type="primary" size="small" style="margin:0 6px;background: seagreen; border-color: seagreen;" @click="exe_undercarriage(index)">注销</Button>
            <Button class="btn" type="primary" size="small" style="margin-right: 6px;background: gray; border-color: gray;" @click="exe_grounding(index)">启用</Button>
            <!-- <Button class="btn" type="primary" size="small" style="margin-right: 6px;background: mediumpurple; border-color: mediumpurple;">排序</Button> -->
          </template>
          </Table>
        </TabPane>
    </Tabs>

  </div>
</template>

<script>
import DragLists from '@/view/components/drag-list/drag-list.vue'
export default {
  name: 'goodstype',
  components: {
    DragLists
  },
  watch:
  {
    lss () {
      console.log(this.lss)
    }
  },
  data () {
    return {
      lss: [
        {
          'name': '1111111111111',
          'id': 20
        },
        {
          'name': '22222222222222',
          'id': 30
        },
        {
          'name': '33333333333333',
          'id': 50
        },
        {
          'name': '444444444444444',
          'id': 10
        }
      ],
      page_total: 100,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      num1: 0,
      inptext: '',
      flag: true,
      flags: true,
      data: null,
      radio1: true,
      radio2: true,
      title: '',
      stype: '',
      formItem: {
        nameinput: '',
        decinput: ''
      },
      formItems: {
        attrinputs: '',
        keyinput: '',
        originradio: '唯一属性',
        originradios: '手工录入',
        change: ''
      },
      ruleValidates: {
        attrinputs: [
          { required: true, message: '属性名称不能为空', trigger: 'blur' }

        ],
        keyinput: [
          { required: true, message: '属性key不能为空', trigger: 'blur' }
        ]
      },
      ruleValidate: {
        nameinput: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      },
      columns2: [
        {
          title: '属性名称',
          key: 'attr_name'
        },
        {
          title: '属性KEY',
          key: 'attr_key'
        },
        {
          title: '检索属性',
          key: 'search'
        },
        {
          title: '属性是否可选',
          key: 'attr_change'
        },
        {
          title: '录入方式',
          key: 'enter_way'
        },
        {
          title: '可选值',
          key: 'option'
        },
        {
          title: '状态',
          key: 'states'
        },
        {
          title: '操作',
          slot: 'actions',
          width: 280,
          align: 'center'
        }
      ],
      columns1: [
        {
          title: '类型名称',
          key: 'sku'
        },
        {
          title: '备注信息',
          key: 'name'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: '创建人',
          key: 'people'
        },
        {
          title: '操作',
          slot: 'action',
          width: 230,
          align: 'center'
        }
      ],
      data1: [
        {
          sku: 'Oil painting',
          name: 'Oil painting',
          state: '启用',
          people: '何剑锋'
        }
      ],
      data2: [
        {
          attr_name: 'Subject',
          attr_key: 'Subject',
          search: '关键字检索',
          attr_change: '唯一属性',
          enter_way: '手工录入',
          option: '',
          states: '启用'
        },
        {
          attr_name: 'Subject',
          attr_key: 'Subject',
          search: '关键字检索',
          attr_change: '单选属性',
          enter_way: '列表选择',
          option: 'Abstract Character Plant Still Life Countryside Animal Landscapes Nude',
          states: '启用'
        },
        {
          attr_name: 'Subject',
          attr_key: 'Subject',
          search: '关键字检索',
          attr_change: '复选属性',
          enter_way: '列表选择',
          option: 'Abstract Character Plant Still Life Countryside Animal Landscapes Nude',
          states: '启用'
        }
      ],
      data3: []
    }
  },
  methods: {
    add () {
      this.modal1 = true
      this.title = '新增操作'
      this.formItem.decinput = ''
      this.$refs.formCustom.resetFields()
    },
    exe_add () {
      this.$refs.formCustoms.resetFields()
      if (this.data) {
        this.modal5 = true
        this.title = '新增商品扩展属性'
      } else {
        this.$Message.info('请选择一行数据')
      }
    },
    show (index, e) {
      e.stopPropagation()
      this.modal1 = true
      this.title = '修改操作'
      this.$refs.formCustom.resetFields()
      this.formItem.nameinput = this.data1[index].sku
      this.formItem.decinput = this.data1[index].name
      this.num1 = index
      this.flag = false
    },
    exe_show (index) {
      this.modal5 = true
      this.title = '修改商品扩展属性'
      this.$refs.formCustoms.resetFields()
      this.formItems.attrinputs = this.data3[index].attr_name
      this.formItems.keyinput = this.data3[index].attr_key
      this.formItems.originradio = this.data3[index].attr_change
      this.formItems.originradios = this.data3[index].enter_way
      this.formItems.change = this.data3[index].option
      if (this.data3[index].attr_change === '单选属性' || this.data3[index].attr_change === '复选属性') {
        this.radio1 = false
        this.radio2 = false
      }
      this.num1 = index
      this.flags = false
    },
    ok () {
      this.$refs.formCustom.validate(res => {
        if (this.flag) {
          if (res) {
            let obj = {
              sku: this.formItem.nameinput,
              name: this.formItem.decinput,
              state: '启用',
              people: '何剑锋'
            }
            this.data1.push(obj)
            this.$Message.success('添加成功')
          } else {
            this.$Message.error('操作失败')
          }
        } else {
          if (res) {
            this.data1[this.num1].sku = this.formItem.nameinput
            this.data1[this.num1].name = this.formItem.decinput
            this.$Message.success('修改成功')
          } else {
            this.$Message.error('操作失败')
          }
        }
        this.flag = true
      })
    },
    exe_sure_add () {
      this.$refs.formCustoms.validate(res => {
        if (this.flags) {
          if (res) {
            let obj = {
              attr_name: this.formItems.attrinputs,
              attr_key: this.formItems.keyinput,
              search: '关键字检索',
              attr_change: this.formItems.originradio,
              enter_way: this.formItems.originradios,
              option: this.formItems.change,
              states: '启用'
            }
            this.data3.push(obj)
            this.$Message.success('添加成功')
          } else {
            this.$Message.error('操作失败')
          }
        } else {
          if (res) {
            this.data3[this.num1].attr_name = this.formItems.attrinputs
            this.data3[this.num1].attr_key = this.formItems.keyinput
            this.data3[this.num1].attr_change = this.formItems.originradio
            this.data3[this.num1].enter_way = this.formItems.originradios
            this.data3[this.num1].option = this.formItems.change
            this.$Message.success('修改成功')
          } else {
            this.$Message.error('操作失败')
          }
        }
        this.flags = true
      })
    },
    remove (index, e) {
      e.stopPropagation()
      this.modal2 = true
      this.num1 = index
    },
    exe_remove (index) {
      this.modal3 = true
      this.num1 = index
    },
    sure_remove () {
      this.data1.splice(this.num1, 1)
      this.$Message.success('删除成功')
    },
    exe_sure_remove () {
      this.data3.splice(this.num1, 1)
      this.$Message.success('删除成功')
    },
    undercarriage (index, e) {
      e.stopPropagation()
      if (this.data1[index].state === '注销') {
        this.$Message.warning('该商品已经处于注销状态')
      } else {
        this.data1[index].state = '注销'
        this.$Message.success('注销成功')
      }
    },
    grounding (index, e) {
      e.stopPropagation()
      if (this.data1[index].state === '启用') {
        this.$Message.warning('该商品已经处于启用状态')
      } else {
        this.data1[index].state = '启用'
        this.$Message.success('启用成功')
      }
    },
    exe_undercarriage (index) {
      if (this.data3[index].states === '注销') {
        this.$Message.warning('该商品已经处于注销状态')
      } else {
        this.data3[index].states = '注销'
        this.$Message.success('注销成功')
      }
    },
    exe_grounding (index) {
      if (this.data3[index].states === '启用') {
        this.$Message.warning('该商品已经处于启用状态')
      } else {
        this.data3[index].states = '启用'
        this.$Message.success('启用成功')
      }
    },
    rowclick (data, index) {
      if (data) {
        this.data = data
        this.data3 = this.data2
        this.stype = data.sku
      } else {
        this.$Message.info('请选择一行数据')
      }
    },

    sort () {
      if (this.data) {
        this.modal4 = true
      } else {
        this.$Message.info('请选择一行数据')
      }
    },
    sort_sure_remove () {
      this.$Message.success('修改成功')
    },
    attr_change (data) {
      if (data === '唯一属性') {
        this.formItems.originradios = '手工录入'
        this.radio2 = true
        this.radio1 = true
      } else {
        this.radio1 = false
      }
    },
    attr_change1 (data) {
      console.log(data)
      if (data === '列表选择') {
        this.radio2 = false
      } else {
        this.radio2 = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.btn:hover{
  opacity: 0.8;
}
.page {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
}
.but_list {
  float:right;
  button {
    margin: 0 2px;
  }
}
.search {
  float:left;
  span {
    font-size: 15px;
  }
  Input {
    margin: 0 20px;
    padding: 5px;
  }
}

.drag-box-card{
  display: inline-block;
  width: 600px;
  height: 560px;
  .drag-item{
    margin: 10px;
  }
  h3{
    padding: 10px 15px;
  }
  .drop-box{
    border: 1px solid #eeeeee;
    height: 455px;
    border-radius: 5px;
  }
  .left-drop-box{
    margin-right: 10px;
  }
  .right-drop-box{
    //
  }
}
.handle-log-box{
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 200px;
  height: 500px;
  h3{
    padding: 10px 14px;
  }
  .handle-inner-box{
    height: ~"calc(100% - 44px)";
    overflow: auto;
    p{
      padding: 14px 0;
      margin: 0 14px;
      border-bottom: 1px dashed #eeeeee;
    }
  }
}
.res-show-box{
  display: inline-block;
  margin-left: 20px;
  border: 1px solid #eeeeee;
  vertical-align: top;
  width: 350px;
  height: 570px;
}
</style>
