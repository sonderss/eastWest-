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
                <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.userType')">
                  <i-option v-for="item in userTypeSelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.status') + ':'" style="width: 200px">
                <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.status')">
                  <i-option v-for="item in statusSelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.sex') + ':'" style="width: 200px">
                <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.sex')">
                  <i-option v-for="item in sexSelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.ID') + ':'" style="width: 200px">
                <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.ID')">
                  <i-option v-for="item in IDSelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.country') + ':'" style="width: 200px">
                <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.country')">
                  <i-option v-for="item in countrySelect" :key="item.value"  :value="item.value">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.consumption') + ':'" style="width: 220px">
                <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.consumption')">
                  <i-option v-for="item in expenseList" :key="item.name" :value="item.name">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.onVisit') + ':'" style="width: 220px">
                <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.onVisit')">
                  <i-option v-for="item in onVisitSelect" :key="item.name" :value="item.name">{{item.name}}</i-option>
                </i-select>
              </Form-item>
              <Form-item :label="$t('table.selectTime') + ':'">
                <Date-picker :value="time" format="yyyy-MM-dd" type="daterange" placement="bottom-end"
                             :placeholder="$t('table.pleaseEnter') + $t('table.selectTime')"
                             style="width: 200px"></Date-picker>
              </Form-item>
              <Form-item :label="$t('table.memberLevel') + ':'" style="width: 200px">
                <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.memberLevel')">
                  <i-option v-for="item in userScale" :key="item.value" :value="item.value">{{item.name}}</i-option>
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
      :footer-hide="true"
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
      width="870"
      :footer-hide="true">
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
      width="870"
      :footer-hide="true">
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
      :footer-hide="true">
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
      :width="840"
      :footer-hide="true">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <div v-for="item in modelDetails" class="ed-member" :key="item.title">
          <Card>
            <p slot="title">会员详情</p>
            <Card dis-hover :bordered="false" style="background-color:#f8f8f8; margin-bottom: 10px">
              <h3 class="ed-card-h3">{{memberDetailsTitle.address}}</h3>
              <p class="ed-card-txt">{{item.address}}</p>
            </Card>
            <Card dis-hover :bordered="false" class="ed-card">
              <h3 class="ed-card-h3">{{memberDetailsTitle.weChat}}</h3>
              <p class="ed-card-txt">{{item.real_name}}</p>
            </Card>
            <Card dis-hover :bordered="false" class="ed-card">
              <h3 class="ed-card-h3">{{memberDetailsTitle.integral}}</h3>
              <p class="ed-card-txt">0.00</p>
            </Card>
            <Card dis-hover :bordered="false" class="ed-card">
              <h3 class="ed-card-h3">{{memberDetailsTitle.accountBalance}}</h3>
              <p class="ed-card-txt">100000.00</p>
            </Card>
          </Card>
        </div>
        <div class="ed-member">
          <Card>
            <p slot="title">{{memberDetailsTitle.elseDetails}}</p>
            <Card dis-hover :bordered="false" class="ed-card2">
              <p slot="title">{{memberDetailsTitle.totalOdd}}</p>
              <span class="ed-a" slot="extra">笔</span>
              <p class="ed-p">20</p>
            </Card>
            <Card dis-hover :bordered="false" class="ed-card2">
              <p slot="title">{{memberDetailsTitle.monetary}}</p>
              <span class="ed-a" slot="extra">元</span>
              <p class="ed-p">100</p>
            </Card>
            <Card dis-hover :bordered="false" class="ed-card2">
              <p slot="title">{{memberDetailsTitle.monthOdd}}</p>
              <span class="ed-a" slot="extra">笔</span>
              <p class="ed-p">10000</p>
            </Card>
            <Card dis-hover :bordered="false" class="ed-card2">
              <p slot="title">{{memberDetailsTitle.monthMoney}}</p>
              <span class="ed-a" slot="extra">元</span>
              <p class="ed-p">20000.00</p>
            </Card>
          </Card>
        </div>
        <div class="footer" style="padding-top: 30px;">
          <div>
            <Tabs type="card">
              <TabPane v-for="(item,index) in footerName" :key="item.name" :label="item.name" :value="1" :name="item.name">
                <Table v-if="index === 0" :loading="loading" :columns="oddDetail" :data="fList" border/>
                <Table  v-if="index === 1" :loading="loading" :columns="takeContact" :data="fList2" border/>
                <Table  v-if="index === 2" :loading="loading" :columns="billContact" :data="fList3" border/>
                <Table  v-if="index === 3" :loading="loading" :columns="payRecord" :data="fList4" border/>
                <Table  v-if="index === 4" :loading="loading" :columns="oddChangeLog" :data="fList5" border/>
                <Table  v-if="index === 5" :loading="loading" :columns="logistics" :data="fList6" border/>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Form>
    </Modal>

    <Modal
      :title="$t('table.editBalance')"
      v-model="handleMember"
      :footer-hide="true">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item :label="$t('table.memberLevel')" style="width: 300px">
          <i-select clearable :model.sync="formItem.select" :placeholder="$t('table.pleaseSelect') + $t('table.memberLevel')">
            <i-option v-for="item in userScale" :key="item.value" :value="item.value">{{item.name}}</i-option>
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
  name: 'member',
  data () {
    return {
      userScale: [
        { name: '普通会员', value: 0 },
        { name: '青铜会员', value: 1 },
        { name: '黄铜会员', value: 2 },
        { name: '白银会员', value: 3 },
        { name: '黄金会员', value: 4 },
        { name: '钻石会员', value: 5 }
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
                  width: '60px',
                  height: '60px'
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
                    console.log(params.row.status)
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
          headPortrait: 'https://edithtsang.gitee.io/img/me.png',
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
          headPortrait: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epYkFElOD7At6QambeApRMUd39B9SKwd6CmoRZgtQiajd3tLHdxNfgNHLynpMH8dvRw2bXUrcCRmPg/132',
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
          index: 2,
          integral: '0.00',
          birthday: '2019-9-9'
        },
        {
          headPortrait: 'https://edithtsang.gitee.io/img/me.png',
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
          index: 3,
          integral: '0.00',
          birthday: '2019-9-9'
        },
        {
          headPortrait: 'https://edithtsang.gitee.io/img/me.png',
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
          index: 4,
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
          index: 5,
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
      ],
      memberDetailsTitle: {
        weChat: '微信名称',
        integral: '积分',
        accountBalance: '账户余额',
        address: '默认收货地址',
        elseDetails: '其他详情',
        totalOdd: '总计订单',
        monetary: '总消费金额',
        monthOdd: '本月订单',
        monthMoney: '本月消费金额'

      },
      modelDetails: [
        {
          address: '收货人:曾厉害 邮编:0 收货人电话:13525585888 地址:天安科技园',
          bargain_id: 0,
          order_id: 'wx2019092305483710002',
          paid: 1,
          pay_price: '439.00',
          pay_time: '2019-09-23',
          pay_type: 'weixin',
          pink_id: 0,
          real_name: '曾厉害',
          seckill_id: 0,
          total_num: 11,
          total_price: '439.00'
        }
      ],
      oddDetail: [
        {
          title: '订单编号',
          align: 'center',
          key: 'GoodsName'
          // render: (h, params) => {
          //   return h('div', [
          //     h(
          //       'Button',
          //       {
          //         props: {
          //           type: 'primary',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: (e) => {
          //             e.stopPropagation()
          //             this.editBus(params.row, params.index)
          //           }
          //         }
          //       },
          //       '设置'
          //     )
          //   ])
          // }
        },
        {
          title: '收货人',
          align: 'center',
          key: 'Weight'
        },
        {
          title: '商品数量',
          align: 'center',
          key: 'Volume'
        },
        {
          title: '商品总价',
          align: 'center',
          key: 'SetUnitPrice'
        },
        {
          title: '实付金额',
          align: 'center',
          key: 'SetUnitPrice'
        },
        {
          title: '交易完成时间',
          align: 'center',
          key: 'SetUnitPrice'
        }
      ],
      takeContact: [
        {
          title: '来源/用途',
          align: 'center',
          key: 'Address'
        },
        {
          title: '积分变化',
          align: 'center',
          key: 'AddressInfo'
        },
        {
          title: '变化后积分',
          align: 'center',
          key: 'Zipcode'
        },
        {
          title: '日期',
          align: 'center',
          key: 'Company'
        },
        {
          title: '备注',
          align: 'center',
          key: 'FullName'
        }
      ],
      billContact: [
        {
          title: '动作',
          align: 'center',
          key: 'Address'
        },
        {
          title: '获得积分',
          align: 'center',
          key: 'AddressInfo'
        },
        {
          title: '签到时间',
          align: 'center',
          key: 'Zipcode'
        },
        {
          title: '备注',
          align: 'center',
          key: 'Memo'
        }
      ],
      payRecord: [
        {
          title: '优惠券名称',
          align: 'center',
          key: 'date'
        },
        {
          title: '面值',
          align: 'center',
          key: 'date'
        },
        {
          title: '有效期',
          align: 'center',
          key: 'date'
        },
        {
          title: '所需积分',
          align: 'center',
          key: 'date'
        },
        {
          title: '兑换时间',
          align: 'center',
          key: 'date'
        }
      ],
      oddChangeLog: [
        {
          title: '变动金额',
          align: 'center',
          key: 'AddTime'
        },
        {
          title: '变动后',
          align: 'center',
          key: 'Memo'
        },
        {
          title: '类型',
          align: 'center',
          key: 'OPTId'
        },

        {
          title: '创建时间',
          align: 'center',
          key: 'OPTId'
        },
        {
          title: '备注',
          align: 'center',
          key: 'Status'
        }
      ],
      logistics: [
        {
          title: '昵称',
          align: 'center',
          key: 'GoodsName'
        },
        {
          title: '余额',
          align: 'center',
          key: 'Weight'
        },
        {
          title: '积分',
          align: 'center',
          key: 'Volume'
        },
        {
          title: '加入时间',
          align: 'center',
          key: 'SetUnitPrice'
        }
      ],
      fList: [],
      fList2: [],
      fList3: [],
      fList4: [],
      fList5: [],
      fList6: [],
      footerName: [
        { name: '消费能力', num: 12 },
        { name: '积分明细', num: 3 },
        { name: '签到记录', num: 5 },
        { name: '持有优惠劵', num: 6 },
        { name: '余额变动记录', num: 9 },
        { name: '推广下线明细', num: 1 }
      ],
      detail: [
        {
          billing: [
            {
              Address: '广州塔',
              AddressInfo: '顶楼',
              Company: '有关部门',
              FullName: 'edith',
              Memo: '',
              Phone: '13652658888',
              Zipcode: '523000'
            }
          ],
          contact: [
            {
              Address: '去问问',
              AddressInfo: 'wer',
              Company: 'fsaerf',
              FullName: 'edith',
              Memo: '',
              Phone: '12312312',
              Zipcode: '23123'
            }
          ],
          detail: [
            {
              GoodsName: 'everything',
              Num: 2,
              SKU: '我是假数据',
              SetSum: '5641.80',
              SetUnitPrice: '$298.90',
              Unit: 'Piece',
              Volume: '30000.00',
              Weight: '5.00'
            },
            {
              GoodsName: 'meten',
              Num: 1,
              SKU: 'edith',
              SetSum: '324',
              SetUnitPrice: '451.70',
              Unit: 'Piece',
              Volume: '10000.00',
              Weight: '2.30'
            }
          ],
          log: [
            {
              AddTime: '2019-9-12',
              Memo: '我是备注',
              OPTId: 'edith',
              Status: '已确认'
            },
            {
              AddTime: '2019-9-12',
              Memo: '',
              OPTId: '',
              Status: '暂存'
            }
          ],
          logistics: [],
          payLog: []
        }
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
      for (let i = 0; i < this.detail.length; i++) {
        this.fList = this.detail[i].detail
        this.fList2 = this.detail[i].contact
        this.fList3 = this.detail[i].billing
        this.fList4 = this.detail[i].payLog
        this.fList5 = this.detail[i].log
        this.fList6 = this.detail[i].logistics
      }
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
  @import "../../assets/css/member.css";
</style>
