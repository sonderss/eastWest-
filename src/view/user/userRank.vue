<template>
  <div>
    <Collapse v-model="collapsed" accordion>
      <Panel name="1">
        搜索条件
        <div slot="content" class="topBody">
          <Row>
            <Col span="24">
              <i-form :model="formItem" :label-width="80">
                <Form-item label="是否显示:" style="width: 220px">
                  <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect')">
                    <i-option v-for="item in yesOrNoShow" :key="item.value" :value="item.value">{{item.name}}</i-option>
                  </i-select>
                </Form-item>
                <Form-item label="任务名称:" style="width: 220px">
                  <i-input :value.sync="formItem.input" :placeholder="$t('table.pleaseEnter')"></i-input>
                </Form-item>
                <Button style="margin:1px 0 0 10px" type="primary" icon="ios-search" @click="search">{{$t('search')}}
                </Button>
              </i-form>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
    <div class="tableText">
      <Button type="primary" icon="ios-add" style="margin-bottom: 5px" @click="addBus('addMemberLevel')">添加会员等级</Button>
      <Table :loading="loading" :columns="columns" :data="newList" border/>
      <Page align="right" :total="100" show-sizer show-elevator @on-change="pageChange" style="margin-top: 10px"
            @on-page-size-change="PageSizeChange"></Page>
    </div>
    <Modal
      :title="modalTitle"
      v-model="handleModal"
      :width="700"
      :footer-hide="true"
      @on-visible-change="handleReset('formAdd')"
    >
      <Form ref="formAdd" :model="formAdd" :label-width="100">
        <FormItem label="等级名称" style="width: 250px" prop="name">
          <Input v-model="formAdd.name" :placeholder="$t('table.pleaseEnter') + $t('table.levelName')"/>
        </FormItem>
        <FormItem label="是否为永久会员" porp="cfVip">
          <RadioGroup v-model="formAdd.cfVip">
            <Radio :label="0">永久</Radio>
            <Radio :label="1">非永久</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="等级价格" porp="levelMuch">
          <InputNumber v-model="formAdd.levelMuch" :min="0" :step="1"></InputNumber>
        </FormItem>
        <FormItem label="是否需要购买" porp="needBuy">
          <RadioGroup v-model="formAdd.needBuy">
            <Radio :label="0">需要</Radio>
            <Radio :label="1">免费</Radio>
          </RadioGroup>
        </FormItem>
        <Row>
          <Col span="8">
            <FormItem label="有效时间(天)" prop="validTime">
              <InputNumber v-model="formAdd.validTime" :min="0" :step="1"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="等级" prop="level">
              <InputNumber v-model="formAdd.level" :min="0" :step="1"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="享受折扣" prop="discount">
              <InputNumber v-model="formAdd.discount" :min="0" :step="1"></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="图标">
          <div v-if="formAdd.headPortrait" class="demo-upload-list">
            <template v-if="formAdd.status === 'finished'">
              <img :src="formAdd.headPortrait">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(formAdd)"></Icon>
              </div>
            </template>
          </div>
          <Upload
            v-if="!formAdd.headPortrait"
            ref="upload"
            :show-upload-list="false"
            :default-file-list="tableData"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
          </Modal>
        </FormItem>
        <FormItem label="会员背景">
          <div v-if="formAdd.headPortrait" class="demo-upload-list">
            <template v-if="formAdd.status === 'finished'">
              <img :src="formAdd.bg">
              <div class="demo-upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(formAdd)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="formAdd.showProgress" :percent="formAdd.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            v-if="!formAdd.headPortrait"
            ref="upload"
            :show-upload-list="false"
            :default-file-list="tableData"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="View Image" v-model="visible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
          </Modal>
        </FormItem>
        <FormItem label="是否显示" prop="yesOrNoShow">
          <RadioGroup v-model="formAdd.yesOrNoShow">
            <Radio :label="0">显示</Radio>
            <Radio :label="1">不显示</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="等级说明" prop="levelRemark">
          <Input v-model="formAdd.levelRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 :placeholder="$t('table.pleaseEnter') + $t('table.userRemark')"/>
        </FormItem>
        <div align="center">
          <Button type="primary" @click="handleSubmit('formAdd')">{{$t('formButton.submit')}}</Button>
        </div>
      </Form>
    </Modal>
    <Modal
      title="等级任务"
      v-model="handleLevelModel"
      :width="900"
      :footer-hide="true"
      @on-visible-change="handleReset('formAdd')"
    >
      <i-form :model="formItem" :label-width="80">
        <Form-item label="是否显示:" style="width: 220px;display: inline-block">
          <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect')">
            <i-option v-for="item in yesOrNoShow" :key="item.value" :value="item.value">{{item.name}}</i-option>
          </i-select>
        </Form-item>
        <Form-item label="任务名称:" style="width: 220px;display: inline-block">
          <i-input :value.sync="formItem.input" :placeholder="$t('table.pleaseEnter')"></i-input>
        </Form-item>
        <Button style="margin:1px 0 0 10px" type="primary" icon="ios-search" @click="search">{{$t('search')}}</Button>
      </i-form>
      <div class="tableText">
        <Button type="primary" icon="ios-add" style="margin-bottom: 5px;margin-right: 10px" @click="addBus('addMember')">添加会员任务</Button>
        <Button type="primary" icon="ios-refresh" style="margin-bottom: 5px">{{$t('table.refresh')}}</Button>
        <Alert closable>
          <span slot="desc">添加等级任务,任务类型中的{$num}会自动替换成限定数量+系统预设的单位生成任务名</span>
        </Alert>
        <Table :loading="loading" :columns="columns2" :data="newList" border/>
        <Page align="right" :total="100" show-sizer show-elevator @on-change="pageChange" style="margin-top: 10px"
              @on-page-size-change="PageSizeChange"></Page>
      </div>
    </Modal>

    <Modal
      title="添加会员任务"
      v-model="handleAddMember"
      :width="700"
      :footer-hide="true"
      @on-visible-change="handleReset('formAdd')"
    >
      <Form ref="formAdd" :model="formAdd" :label-width="100">
        <FormItem label="任务类型" style="width: 450px" prop="name">
          <i-select v-model="formAdd.needBuy" clearable :placeholder="$t('table.pleaseSelect')">
            <i-option v-for="item in taskType" :key="item.name" :value="item.value">{{item.name}}</i-option>
          </i-select>
        </FormItem>
        <FormItem label="限定数量" prop="validTime">
          <InputNumber v-model="formAdd.validTime" :min="0" :step="1"></InputNumber>
        </FormItem>
        <FormItem label="排序" prop="level">
          <InputNumber v-model="formAdd.level" :min="0" :step="1"></InputNumber>
        </FormItem>
        <FormItem label="是否显示" prop="yesOrNoShow">
          <RadioGroup v-model="formAdd.yesOrNoShow">
            <Radio :label="0">显示</Radio>
            <Radio :label="1">不显示</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否务必达成" porp="cfVip">
          <RadioGroup v-model="formAdd.cfVip">
            <Radio :label="0">务必达成</Radio>
            <Radio :label="1">达成其一</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="等级说明" prop="levelRemark">
          <Input v-model="formAdd.levelRemark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 :placeholder="$t('table.pleaseEnter') + $t('table.userRemark')"/>
        </FormItem>
        <div align="center">
          <Button type="primary" @click="handleSubmit('formAdd')">{{$t('formButton.submit')}}</Button>
        </div>
      </Form>
    </Modal>

  </div>
</template>
<script>
export default {
  name: 'member',
  data () {
    return {
      imgName: '',
      visible: false,
      uploadList: [],
      formAdd: {
        name: '',
        cfVip: 0,
        levelMuch: 0,
        needBuy: 0,
        validTime: 0,
        level: 0,
        discount: 0,
        isIcon: '',
        memberBG: '',
        isShow: '',
        levelRemark: '',
        headPortrait: '',
        yesOrNoShow: 0
      },
      collapsed: '1',
      formItem: {
        input: '',
        select: ''
      },
      handleModal: false,
      handleLevelModel: false,
      handleAddMember: false,
      loading: true,
      modalTitle: '',
      newList: [],
      companyName: '',
      something: '',
      ruleValidate: {},
      params: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          title: '编号',
          type: 'index',
          width: 80,
          align: 'center',
          sortable: true
        },
        {
          title: '等级图标',
          align: 'center',
          key: 'headPortrait',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.headPortrait
                },
                style: {
                  width: '60px',
                  height: '60px'
                }
              })
            ])
          }
        },
        {
          title: '等级名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '等级',
          align: 'center',
          key: 'level'
        },
        {
          title: '享受折扣',
          align: 'center',
          key: 'discount'
        },
        {
          title: '有效时间',
          align: 'center',
          key: 'validTime'
        },
        {
          title: '是否永久',
          align: 'center',
          key: 'cfVip',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  size: 'large',
                  type: 'primary',
                  value: params.row.cfVip !== 1,
                  disabled: true
                },
                scopedSlots: {
                  open: () => h('span', '永久'),
                  close: () => h('span', '非永久')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-change': (value) => {
                    console.log(params.row.cfVip)
                    if (value) {
                      params.row.cfVip = 0
                    } else {
                      params.row.cfVip = 1
                    }
                  }
                }
              })
            ])
          }
        },
        {
          title: '是否付费',
          align: 'center',
          key: 'status',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  size: 'large',
                  type: 'primary',
                  value: params.row.needBuy !== 1,
                  disabled: true
                },
                scopedSlots: {
                  open: () => h('span', '需要'),
                  close: () => h('span', '免费')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-change': (value) => {
                    console.log(params.row.needBuy)
                    if (value) {
                      params.row.needBuy = 0
                    } else {
                      params.row.needBuy = 1
                    }
                  }
                }
              })
            ])
          }
        },
        {
          title: '是否显示',
          align: 'center',
          key: 'yesOrNoShow',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  size: 'large',
                  type: 'primary',
                  value: params.row.yesOrNoShow !== 1
                },
                scopedSlots: {
                  open: () => h('span', '显示'),
                  close: () => h('span', '隐藏')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-change': (value) => {
                    console.log(params.row.yesOrNoShow)
                    if (value) {
                      params.row.yesOrNoShow = 0
                    } else {
                      params.row.yesOrNoShow = 1
                    }
                  }
                }
              })
            ])
          }
        },
        {
          width: 100,
          title: '等级说明',
          align: 'center',
          key: 'levelRemark'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Dropdown', {
                props: {
                  trigger: 'click'
                },
                on: {
                  'on-click': (value) => {
                    console.log(value)
                    if (value === 'level') {
                      this.levelModel(params.index)
                    } else if (value === 'editLevel') {
                      this.editBus(params.row, params.index, 'editLevel')
                    } else {
                      this.remove(params.index)
                    }
                  }
                }
              },
              [h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                }
              },
              [
                h('span', '操作'),
                h('Icon', {
                  props: {
                    type: 'md-arrow-dropdown'
                  }
                })
              ]),
              h('DropdownMenu', {
                slot: 'list'
              },
              [
                h('DropdownItem', {
                  props: {
                    name: 'level',
                    type: 'md-create'
                  }
                }, '等级任务'),
                h('DropdownItem', {
                  props: {
                    name: 'editLevel'
                  }
                }, '编辑等级'),
                h('DropdownItem', {
                  props: {
                    name: 'remove'
                  }
                }, '删除等级')
              ])
              ])
            ])
          }
        }
      ],
      columns2: [
        {
          title: '编号',
          type: 'index',
          width: 80,
          align: 'center',
          sortable: true
        },
        {
          title: '等级名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '任务名称',
          align: 'center',
          key: 'level'
        },
        {
          title: '排序',
          align: 'center',
          key: 'discount',
          sortable: true
        },
        {
          title: '是否显示',
          align: 'center',
          key: 'yesOrNoShow',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  size: 'large',
                  type: 'primary',
                  value: params.row.yesOrNoShow !== 1
                },
                scopedSlots: {
                  open: () => h('span', '显示'),
                  close: () => h('span', '隐藏')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-change': (value) => {
                    console.log(params.row.yesOrNoShow)
                    if (value) {
                      params.row.yesOrNoShow = 0
                    } else {
                      params.row.yesOrNoShow = 1
                    }
                  }
                }
              })
            ])
          }
        },
        {
          title: '务必达成',
          align: 'center',
          key: 'cfVip',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  size: 'large',
                  type: 'primary',
                  value: params.row.cfVip !== 1,
                  disabled: true
                },
                scopedSlots: {
                  open: () => h('span', '全部'),
                  close: () => h('span', '其一')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-change': (value) => {
                    console.log(params.row.cfVip)
                    if (value) {
                      params.row.cfVip = 0
                    } else {
                      params.row.cfVip = 1
                    }
                  }
                }
              })
            ])
          }
        },
        {
          width: 100,
          title: '任务说明',
          align: 'center',
          key: 'levelRemark'
        },
        {
          title: '操作',
          key: 'action',
          width: 130,
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
                      this.editBus(params.row, params.index, 'editTask')
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      tableData: [
        {
          headPortrait: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8bc1e0.png',
          bg: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8cd632.jpg',
          name: '普通会员',
          level: 1,
          discount: 1006.00,
          validTime: 0,
          cfVip: 0,
          needBuy: 1,
          yesOrNoShow: 0,
          levelRemark: '普通会员'
        },
        {
          headPortrait: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8f0a30.png',
          bg: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca904016.jpg',
          name: '青铜会员',
          level: 2,
          discount: 1020.00,
          validTime: 0,
          cfVip: 0,
          needBuy: 1,
          yesOrNoShow: 0,
          levelRemark: '青铜会员'
        },
        {
          headPortrait: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8e9365.png',
          bg: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8c3bff.jpg',
          name: '黄铜会员',
          level: 3,
          discount: 1000.00,
          validTime: 0,
          cfVip: 0,
          needBuy: 1,
          yesOrNoShow: 0,
          levelRemark: '黄铜会员'
        },
        {
          headPortrait: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8a27f0.png',
          bg: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8d6ae1.jpg',
          name: '白银会员',
          level: 4,
          discount: 1000.00,
          validTime: 0,
          cfVip: 0,
          needBuy: 1,
          yesOrNoShow: 0,
          levelRemark: '白银会员'
        },
        {
          headPortrait: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8aa5b9.png',
          bg: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8b27f1.jpg',
          name: '黄金会员',
          level: 5,
          discount: 1000.00,
          validTime: 0,
          cfVip: 0,
          needBuy: 1,
          yesOrNoShow: 0,
          levelRemark: '黄金会员'
        },
        {
          headPortrait: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca90d2d3.png',
          bg: 'http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca8dfe16.jpg',
          name: '钻石会员',
          level: 6,
          discount: 1000.00,
          validTime: 0,
          cfVip: 0,
          needBuy: 1,
          yesOrNoShow: 0,
          levelRemark: '钻石会员'
        }
      ],
      yesOrNoShow: [
        { name: '显示', value: 0 },
        { name: '不显示', value: 1 }
      ],
      taskType: [
        { name: '消费满{$num}----单位[元]', value: 0 },
        { name: '消费{$num}----单位[次]', value: 1 },
        { name: '累计签到{$num}----单位[天]', value: 2 },
        { name: '分享给朋友{$num}----单位[次]', value: 3 },
        { name: '邀请好友{$num}成为下线----单位[人]', value: 4 },
        { name: '邀请好友{$num}成为会员----单位[人]', value: 5 }
      ]
    }
  },
  methods: {
    levelModel () {
      this.handleLevelModel = true
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    pageChange (page) {
      this.params.page = page
    },
    search () {
      let len = this.tableData
      console.log(this.tableData)
      let arr = []
      console.log(this.companyName)
      for (let i in len) {
        if (len[i].name === this.companyName) {
          arr.push(len[i])
        } else if (this.companyName === '') {
          this.newList = this.tableData
          return
        }
      }
      this.newList = arr
    },
    addBus (txt) {
      if (txt === 'addMemberLevel') {
        this.handleModal = true
        this.modalTitle = '新增'
        delete this.formAdd.headPortrait
      }
      if (txt === 'addMember') {
        this.handleAddMember = true
      }
    },
    editBus (item, index, type) {
      if (type === 'editLevel') {
        this.handleModal = true
        this.modalTitle = '编辑'
        this.itemIndex = index
        // this.uploadList = this.$refs.upload.fileList
        this.formAdd = JSON.parse(JSON.stringify(item))
      }
      if (type === 'editTask') {
        this.handleAddMember = true
        this.modalTitle = '编辑'
        this.itemIndex = index
        this.formAdd = JSON.parse(JSON.stringify(item))
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const params = JSON.parse(JSON.stringify(this.formAdd))
          if (this.modalTitle === '新增') {
            this.$Message.success(this.$t('message.addSuccess'))
            this.newList.unshift(params)
          } else {
            this.$set(this.newList, this.itemIndex, params)
            this.$Message.success(this.$t('message.editSuccess'))
          }
          this.handleModal = false
        } else {
          if (this.modalTitle === '新增') {
            this.$Message.error(this.$t('message.addError'))
          } else {
            this.$Message.error(this.$t('message.editError'))
          }
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    remove (index) {
      this.$Modal.warning({
        title: this.$t('message.title'),
        content: this.$t('message.delete'),
        onOk: () => {
          this.newList.splice(index, 1)
        }
      })
    },
    handleRemove (file) {
      console.log(file)
      console.log(this.tableData)
      this.formAdd.splice(file)
      // const fileList = this.$refs.upload.fileList
      // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
    }
  },
  mounted () {
    console.log(this.$refs.upload.fileList)
    this.newList = this.tableData
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>

<style scoped>
  .topBody .ivu-form-item {
    display: inline-block;
  }

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
