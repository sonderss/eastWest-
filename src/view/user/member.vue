<template>
  <div>
    <Collapse v-model="collapsed" accordion>
      <Panel name="1">
        {{$t('table.userSearch')}}
        <div slot="content" class="topBody">
          <i-col span="24">
            <i-form :model="formItem" :label-width="80">
              <Form-item :label="$t('table.nameNumber') + ':'" style="width: 220px">
                <i-input :value.sync="formItem.input" :placeholder="$t('table.pleaseEnter') + $t('table.nameNumber')"></i-input>
              </Form-item>
              <Form-item :label="$t('table.userType') + ':'" style="width: 220px">
                <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.userType')">
                  <i-option v-for="item in userTypeSelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.status') + ':'" style="width: 200px">
                <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.status')">
                  <i-option v-for="item in statusSelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.sex') + ':'" style="width: 200px">
                <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.sex')">
                  <i-option v-for="item in sexSelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.ID') + ':'" style="width: 200px">
                <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.ID')">
                  <i-option v-for="item in IDSelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.country') + ':'" style="width: 200px">
                <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.country')">
                  <i-option v-for="item in countrySelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.consumption') + ':'" style="width: 220px">
                <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.consumption')">
                  <i-option v-for="item in expenseList" :key="item.name" value="0">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.onVisit') + ':'" style="width: 220px">
                <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.onVisit')">
                  <i-option v-for="item in onVisitSelect" :key="item.name" value="0">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.selectTime') + ':'">
                <Date-picker :value="time" format="yyyy-MM-dd" type="daterange" placement="bottom-end"
                             :placeholder="$t('table.pleaseEnter') + $t('table.selectTime')"
                             style="width: 200px"></Date-picker>
              </Form-item>
              <Form-item :label="$t('table.memberLevel') + ':'" style="width: 200px">
                <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.memberLevel')">
                  <i-option v-for="item in userScale" :key="item.name" value="0">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.birthday') + ':'">
                <Date-picker :value="birthday" format="yyyy-MM-dd" type="date" :placeholder="$t('table.pleaseEnter') + $t('table.birthday')"
                             style="width: 200px"></Date-picker>
              </Form-item>
            </i-form>
          </i-col>
          <Button type="primary" icon="ios-search" @click="search">{{$t('search')}}</Button>
        </div>
      </Panel>
    </Collapse>
    <div class="tableText">
      <div style="margin-bottom: 8px">
        <i-button type="primary" size="small" icon="ios-undo-outline" @click="send('onCoupon')">{{$t('table.sendCoupon')}}</i-button>
        <i-button type="primary" size="small" icon="ios-undo-outline" @click="send('newsInfo')">{{$t('table.sendInfo')}}</i-button>
        <i-button type="primary" size="small" icon="ios-undo-outline" @click="send('instation')">{{$t('table.sendInstation')}}</i-button>
        <i-button type="primary" size="small" icon="ios-refresh">{{$t('table.refresh')}}</i-button>
      </div>
      <Table @on-selection-change="onSelectionChange" :loading="loading" :columns="columns" :data="newList" border/>
      <Page align="right" :total="100" show-sizer show-elevator @on-change="pageChange" style="margin-top: 10px"
            @on-page-size-change="PageSizeChange"></Page>
    </div>
    <Modal
      :title="modalTitle"
      v-model="handleModal"
      draggable
      :footer-hide="true"
      :mask-closable="true"
      @on-visible-change="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem :label="$t('table.userIndex')" style="width: 200px">
          <Input disabled v-model="formValidate.index"
                 :placeholder="$t('table.pleaseEnter') + $t('table.userIndex')"/>
        </FormItem>
        <FormItem :label="$t('table.realName')" style="width: 250px">
          <Input v-model="formValidate.name" :placeholder="$t('table.pleaseEnter') + $t('table.realName')"/>
        </FormItem>
        <FormItem :label="$t('table.birthday')">
          <Date-picker v-model="formValidate.birthday" format="yyyy-MM-dd" type="date" :placeholder="$t('table.pleaseEnter') + $t('table.birthday')"
                       style="width: 200px"></Date-picker>
        </FormItem>
        <FormItem :label="$t('table.ID')">
          <Input style="width: 250px" v-model="formValidate.id" :placeholder="$t('table.pleaseEnter') + $t('table.ID')"/>
        </FormItem>
        <FormItem :label="$t('table.userRemark')">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 :placeholder="$t('table.pleaseEnter') + $t('table.userRemark')"/>
        </FormItem>
        <Form-item :label="$t('table.promoter')">
          <Radio-group v-model="formValidate.radio">
            <Radio v-for="item in promoterSelect" :key="item.name" :label="item.value">{{item.name}}</Radio>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('table.status')">
          <Radio-group v-model="formValidate.status">
            <Radio v-for="item in statusModel" :key="item.name" :label="item.value">{{item.name}}</Radio>
          </Radio-group>
        </Form-item>
        <div align="center">
          <Button type="primary" @click="handleSubmit('handleModal')">{{$t('formButton.submit')}}</Button>
        </div>
      </Form>
    </Modal>

    <Modal
      :title="$t('table.sendInfo')"
      v-model="handleCoupon"
      draggable
      width="870"
      :footer-hide="true"
      :mask-closable="true">
      <div>
        <Input v-model="something" style="width: 160px;margin-right: 10px" :placeholder="$t('inputKey')"/>
        <Button @click="search" type="primary" icon="ios-search">{{$t('search')}}</Button>
        <Button style="float: right;" icon="ios-refresh" @click="addBus">{{$t('table.refresh')}}</Button>
      </div>
      <div style="margin-top: 10px;">
        <div @mouseenter="onMove(index)" @mouseleave="onLeave" v-for="(item,index) in imagesMessage" :key="item.title" style="width: 200px;display: inline-block;margin: 0 8px 8px 0">
          <Card style="width: 200px; display: inline-block;margin-right: 8px">
            <div v-show="seen && index == current" class="ed-seen">
              <span style="margin:0 20px 0 10px">{{$t('table.preview')}}</span>
              <span @click="sendImg">{{$t('table.push')}}</span>
            </div>
            <p slot="title">{{item.title}}</p>
            <div style="text-align:center">
              <img style="width: 100%" :src="item.url">
            </div>
          </Card>
        </div>
      </div>
      <div>总共{{imagesMessage.length}}项</div>
    </Modal>

    <Modal
      :title="$t('table.sendInstation')"
      v-model="handleInstation"
      draggable
      width="870"
      :footer-hide="true"
      :mask-closable="true">
      <div>
        <Input v-model="something" style="width: 160px;margin-right: 10px" :placeholder="$t('inputKey')"/>
        <Button @click="search" type="primary" icon="ios-search">{{$t('search')}}</Button>
      </div>
      <div style="margin-top: 10px;">
        <Table @on-selection-change="onSelectionChange" :loading="loading" :columns="instationC" :data="newList" border/>
      </div>
      <div>总共{{newList.length}}项</div>
    </Modal>

    <Modal
      :title="$t('table.editBalance')"
      v-model="handleBalance"
      draggable
      :footer-hide="true"
      :mask-closable="true">
      <Form ref="formValidate" :model="formValidate" :label-width="80">
        <Form-item :label="$t('table.edit') + $t('table.balance')" prop="status">
          <Radio-group v-model="formValidate.status">
            <Radio :label="0" checked>{{$t('table.balanceAdd')}}</Radio>
            <Radio :label="1">{{$t('table.balanceMinus')}}</Radio>
          </Radio-group>
        </Form-item>
        <FormItem :label="$t('table.balance')" style="width: 200px">
          <Input v-model="formValidate.index"
                 :placeholder="$t('table.pleaseEnter') + $t('table.balance')"/>
        </FormItem>
        <Form-item :label="$t('table.edit') + $t('table.integral')" prop="radio">
          <Radio-group v-model="formValidate.radio">
            <Radio :label="0" checked>{{$t('table.balanceAdd')}}</Radio>
            <Radio :label="1">{{$t('table.balanceMinus')}}</Radio>
          </Radio-group>
        </Form-item>
        <FormItem :label="$t('table.integral')" style="width: 200px">
          <Input v-model="formValidate.index"
                 :placeholder="$t('table.pleaseEnter') + $t('table.integral')"/>
        </FormItem>
        <div align="center">
          <Button type="primary" @click="handleSubmit('handleBalance')">{{$t('formButton.submit')}}</Button>
        </div>
      </Form>
    </Modal>

    <Modal
      title="会员详情"
      v-model="handleDetails"
      draggable
      :footer-hide="true"
      :mask-closable="true">
      还没写啦
    </Modal>

    <Modal
      :title="$t('table.editBalance')"
      v-model="handleMember"
      draggable
      :footer-hide="true"
      :mask-closable="true">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item :label="$t('table.memberLevel')" style="width: 300px">
          <i-select :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.memberLevel')">
            <i-option v-for="item in userScale" :key="item.name" value="0">{{item.name}}</i-option>
          </i-select>
        </Form-item>
        <div align="center">
          <Button type="primary" @click="handleSubmit('handleMember')">{{$t('formButton.submit')}}</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>

export default {
  name: 'base_unit',
  data () {
    return {
      userScale: [
        { name: '普通会员' },
        { name: '青铜会员' },
        { name: '黄铜会员' },
        { name: '白银会员' },
        { name: '黄金会员' },
        { name: '钻石会员' }
      ],
      collapsed: '1',
      value2: '1',
      time: '',
      birthday: '',
      formItem: {
        input: '',
        select: '',
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      handleModal: false,
      handleCoupon: false,
      handleInstation: false,
      handleBalance: false,
      handleMember: false,
      handleDetails: false,
      seen: false,
      loading: true,
      current: 0,
      modalTitle: '',
      newList: [],
      companyName: '',
      formValidate: {
        remark: '',
        name: '',
        birthday: '',
        status: '',
        radio: ''
      },
      something: '',
      ruleValidate: {},
      imagesMessage: [
        {
          url: 'http://datong.crmeb.net/public/uploads/editor/20190115/5c3dc294a9a0a.jpg',
          title: '图文名称:阿迪达斯'
        },
        {
          url: 'http://datong.crmeb.net/public/uploads/editor/20190115/5c3dc294a9a0a.jpg',
          title: '图文名称:耐克'
        },
        {
          url: 'http://datong.crmeb.net/public/uploads/editor/20190115/5c3dc294a9a0a.jpg',
          title: '图文名称:2'
        },
        {
          url: 'http://datong.crmeb.net/public/uploads/editor/20190115/5c3dc294a9a0a.jpg',
          title: '图文名称:32'
        },
        {
          url: 'http://datong.crmeb.net/public/uploads/editor/20190115/5c3dc294a9a0a.jpg',
          title: '图文名称:4'
        },
        {
          url: 'http://datong.crmeb.net/public/uploads/editor/20190115/5c3dc294a9a0a.jpg',
          title: '图文名称:3'
        }
      ],
      params: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '编号',
          type: 'index',
          width: 70,
          align: 'center'
        },
        {
          title: '头像',
          align: 'center',
          key: 'headPortrait',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.headPortrait
                },
                style: {
                  width: '40px',
                  height: '40px'
                }
              })
            ])
          }
        },
        {
          title: '名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '余额',
          align: 'center',
          key: 'money'
        },
        {
          title: '购买次数',
          align: 'center',
          key: 'buyNum'
        },
        {
          title: '累计提现',
          align: 'center',
          key: 'countMoney'
        },
        {
          title: '积分',
          align: 'center',
          key: 'integral'
        },
        {
          title: '推荐人',
          width: 80,
          align: 'center',
          key: 'referrer'
        },
        {
          title: '性别',
          width: 65,
          align: 'center',
          key: 'sex'
        },
        {
          title: '访问日期',
          width: 200,
          align: 'center',
          key: 'adddate'
        },
        {
          title: '状态',
          align: 'center',
          key: 'status',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  size: 'large',
                  type: 'primary',
                  value: params.row.status !== 1
                },
                scopedSlots: {
                  open: () => h('span', '正常'),
                  close: () => h('span', '禁止')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-change': (value) => {
                    if (value) {
                      params.row.status = 0
                    } else {
                      params.row.status = 1
                    }
                  }
                }
              })
            ])
          }
        },
        {
          width: 100,
          title: '用户类型',
          align: 'center',
          key: 'userType'
        },
        {
          title: '操作',
          key: 'action',
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
                      this.editBus(params.row, params.index)
                    }
                  }
                },
                '编辑'
              ),
              h('Dropdown', {
                props: {
                  trigger: 'click'
                },
                on: {
                  'on-click': (value) => {
                    console.log(value)
                    if (value === 'balance') {
                      this.balance(params.index)
                    } else if (value === 'memberDetails') {
                      this.memberDetails(params.index)
                    } else {
                      this.giveMembers(params.index)
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
                    name: 'balance',
                    type: 'md-create'
                  }
                }, '余额积分'),
                h('DropdownItem', {
                  props: {
                    name: 'memberDetails'
                  }
                }, '会员详情'),
                h('DropdownItem', {
                  props: {
                    name: 'giveMembers'
                  }
                }, '赠送会员')
              ])
              ])
            ])
          }
        }
      ],
      tableData: [
        {
          headPortrait: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIP3QMyyjicYCJiby9t99512msyeOBTdZNevtwwkzo9cI0beVOvpIvqKwJBibrhc2Ztw529PnQZNW3ag/132',
          money: '8888.88',
          name: '曾厉害',
          buyNum: '60',
          countMoney: '1000',
          referrer: '无',
          sex: '女',
          adddate: '2019-09-20 02:15:13',
          status: 0,
          radio: 1,
          userType: '小程序',
          index: 1,
          integral: '0.00',
          birthday: '2019-9-9',
          remark: '我我我我我',
          id: '441545588545956656'
        },
        {
          headPortrait: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIP3QMyyjicYCJiby9t99512msyeOBTdZNevtwwkzo9cI0beVOvpIvqKwJBibrhc2Ztw529PnQZNW3ag/132',
          money: '8888.88',
          name: '曾厉害',
          buyNum: '60',
          countMoney: '1000',
          referrer: '无',
          sex: '女',
          adddate: '2019-09-20 02:15:13',
          status: 1,
          radio: 0,
          userType: '微信公众号',
          index: 1,
          integral: '0.00',
          birthday: '2019-9-9'
        },
        {
          headPortrait: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIP3QMyyjicYCJiby9t99512msyeOBTdZNevtwwkzo9cI0beVOvpIvqKwJBibrhc2Ztw529PnQZNW3ag/132',
          money: '8888.88',
          name: '曾厉害',
          buyNum: '60',
          countMoney: '1000',
          referrer: '无',
          sex: '女',
          adddate: '2019-09-20 02:15:13',
          status: 0,
          radio: 1,
          userType: '小程序',
          index: 1,
          integral: '0.00',
          birthday: '2019-9-9'
        },
        {
          headPortrait: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIP3QMyyjicYCJiby9t99512msyeOBTdZNevtwwkzo9cI0beVOvpIvqKwJBibrhc2Ztw529PnQZNW3ag/132',
          money: '8888.88',
          name: '曾厉害',
          buyNum: '60',
          countMoney: '1000',
          referrer: '无',
          sex: '女',
          adddate: '2019-09-20 02:15:13',
          status: 0,
          radio: 1,
          userType: '小程序',
          index: 1,
          integral: '0.00',
          birthday: '2019-9-9'
        },
        {
          headPortrait: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIP3QMyyjicYCJiby9t99512msyeOBTdZNevtwwkzo9cI0beVOvpIvqKwJBibrhc2Ztw529PnQZNW3ag/132',
          money: '8888.88',
          name: '曾厉害',
          buyNum: '60',
          countMoney: '1000',
          referrer: '无',
          sex: '女',
          adddate: '2019-09-20 02:15:13',
          status: 0,
          radio: 1,
          userType: '小程序',
          index: 1,
          integral: '0.00',
          birthday: '2019-9-9'
        }
      ],
      expenseList: [
        { name: '0' },
        { name: '1+' },
        { name: '2+' },
        { name: '3+' },
        { name: '4+' },
        { name: '5+' }
      ],
      onCouponList: [],
      instationC: [
        {
          title: '编号',
          type: 'index',
          align: 'center'
        },
        {
          title: '发送人',
          align: 'center',
          key: 'name'
        },
        {
          title: '通知标题',
          align: 'center',
          key: 'name'
        },
        {
          title: '通知内容',
          width: 300,
          align: 'center',
          key: 'name'
        },
        {
          title: '操作',
          align: 'center',
          key: 'name'
        }
      ],
      userTypeSelect: [
        { name: '全部', value: 0 },
        { name: '微信公众号', value: 1 },
        { name: '微信小程序', value: 2 }
      ],
      statusSelect: [
        { name: '全部', value: 0 },
        { name: '正常', value: 1 },
        { name: '锁定', value: 2 }
      ],
      sexSelect: [
        { name: '男', value: 0 },
        { name: '女', value: 1 },
        { name: '保密', value: 2 }
      ],
      IDSelect: [
        { name: '全部', value: 0 },
        { name: '推广员', value: 1 },
        { name: '普通用户', value: 2 }
      ],
      countrySelect: [
        { name: '中国', value: 0 },
        { name: '外国', value: 1 }
      ],
      onVisitSelect: [
        { name: '全部', value: 0 },
        { name: '时间段未访问', value: 1 },
        { name: '时间段访问过', value: 2 },
        { name: '首次访问', value: 3 }
      ],
      promoterSelect: [
        { name: '开启', value: 0 },
        { name: '关闭', value: 1 }
      ],
      statusModel: [
        { name: '开启', value: 0 },
        { name: '锁定', value: 1 }
      ]
    }
  },
  methods: {
    balance () {
      this.handleBalance = true
    },
    giveMembers () {
      this.handleMember = true
    },
    memberDetails () {
      this.handleDetails = true
    },
    sendImg () {
      this.handleCoupon = false
      this.$Modal.confirm({ title: this.$t('message.title'),
        okText: this.$t('message.yesSend'),
        cancelText: this.$t('message.thinkAboutIt'),
        content: '<p>您确定要发送消息吗？</p><p>发送后将无法撤回，请谨慎操作！</p>' })
    },
    onSelectionChange (row) {
      this.onCouponList = row
    },
    send (type) {
      if (type === 'onCoupon') {
        if (this.onCouponList.length === 0) {
          this.$Modal.warning({
            title: this.$t('message.title'),
            content: '请选择要发送优惠券的会员'
          })
        } else {
          this.$Message.success('发送成功')
        }
      } else if (type === 'newsInfo') {
        if (this.onCouponList.length === 0) {
          this.$Modal.warning({
            title: this.$t('message.title'),
            content: '请选择要发送客服图文消息的会员'
          })
        } else {
          this.handleCoupon = true
        }
      } else {
        if (this.onCouponList.length === 0) {
          this.$Modal.warning({
            title: this.$t('message.title'),
            content: '请选择要发送站内信息的会员'
          })
        } else {
          this.handleInstation = true
        }
      }
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
    addBus () {
      this.handleModal = true
      this.modalTitle = '新增'
    },
    editBus (item, index) {
      this.handleModal = true
      this.modalTitle = '编辑'
      this.itemIndex = index
      this.formValidate = JSON.parse(JSON.stringify(item))
    },
    submit () {
      let params = JSON.parse(JSON.stringify(this.formValidate))
      if (this.modalTitle === '新增') {
        this.$Message.success(this.$t('message.addSuccess'))
        this.newList.unshift(params)
      } else {
        this.$set(this.newList, this.itemIndex, params)
        this.$Message.success(this.$t('message.editSuccess'))
      }
    },
    handleSubmit (name) {
      if (name === 'handleModal') {
        this.submit()
        this.handleModal = false
      } else if (name === 'handleBalance') {
        this.submit()
        this.handleBalance = false
      } else {
        this.submit()
        this.handleMember = false
      }
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
    onMove (index) {
      this.current = index
      this.seen = true
    },
    onLeave (index) {
      this.seen = false
      this.current = index
    }
  },
  mounted () {
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

  .tableText button {
    margin-right: 1px;
  }

  .ed-seen {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 12px;
    height: 26px;
    line-height: 26px;
    position: absolute;
    width: 166px;
    cursor: pointer;
  }

</style>
