<template>
  <div>
    <div class="topBody">
      <Input v-model="something" style="width: 160px;margin-right: 10px" :placeholder="$t('inputKey')" />
      <Button type="primary" icon="ios-search">{{$t('search')}}</Button>
      <Button style="float: right;" type="primary" icon="ios-add" @click="addBus">{{$t('add')}}</Button>
    </div>
    <div class="tableText">
      <Table @on-row-click="edTable" :loading="loading" :columns="columns" :data="newList" border/>
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
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem :label="$t('table.keyName')"  prop="key_name">
          <Input v-model="formValidate.key_name" :placeholder="$t('table.pleaseEnter') + $t('table.keyName')"></Input>
        </FormItem>
        <FormItem :label="$t('table.name')"  prop="name">
          <Input v-model="formValidate.name" :placeholder="$t('table.pleaseEnter') + $t('table.name')"></Input>
        </FormItem>
        <FormItem :label="$t('table.englishName')"  prop="english_name">
          <Input v-model="formValidate.english_name" :placeholder="$t('table.pleaseEnter') + $t('table.englishName')"></Input>
        </FormItem>
        <div align="center" style="padding-top:10px;">
          <Button type="primary" @click="handleSubmit('formValidate')">{{$t('formButton.submit')}}</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">{{$t('formButton.reset')}}</Button>
        </div>
      </Form>
    </Modal>
    <div class="footer">
      <div>
        <Tabs type="card">
          <TabPane :label="$t('table.goodsList')"  :value="1" name="$t('table.goodsList')">
            <div style="border: none;" class="but_list">
              <Button type="warning" @click="goodsSet">{{$t('table.goodsSet')}}</Button>
            </div>
            <Table :loading="loading" :columns="oddDetail" :data="fList" border/>
          </TabPane>
        </Tabs>
      </div>
    </div>

    <Modal
      :title="goodsSetTitle"
      v-model="goodsSetModal"
      :width="600"
      draggable
      :footer-hide="true"
      :mask-closable="true"
    >
      <Form :label-width="80">
        <Transfer
          :data="data2"
          :target-keys="targetKeys2"
          filterable
          :filter-method="filterMethod"
          :titles="[$t('table.goodsList'),$t('table.goodsHot')]"
          :listStyle="{ width: '250px',height: '300px'}"
          @on-change="handleChange">
        </Transfer>
        <div align="center" style="padding-top: 10px">
          <Button type="primary" @click="handleTransfer('formValidate')">{{$t('formButton.submit')}}</Button>
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
      data2: this.getMockData(),
      targetKeys2: this.getTargetKeys(),
      handleModal: false,
      goodsSetModal: false,
      loading: true,
      modalTitle: '',
      goodsSetTitle: '',
      newList: [],
      fList: [],
      companyName: '',
      formValidate: {
        name: '',
        key_name: '',
        english_name: ''
      },
      something: '',
      ruleValidate: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }],
        key_name: [{ required: true, message: 'key名称不能为空', trigger: 'change' }],
        english_name: [{ required: true, message: '英文名称不能为空', trigger: 'change' }]
      },
      params: {
        page: 1,
        limit: 10
      },
      columns: [
        {
          title: 'Key名称',
          align: 'center',
          key: 'key_name'
        },
        {
          title: '名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '英文名称',
          align: 'center',
          key: 'english_name'
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
                '修改'
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
                      this.remove(params.row, params.index)
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
          name: '曾厉害',
          key_name: 'k曾厉害',
          english_name: 'edith'
        },
        {
          name: '曾厉害',
          key_name: 'k曾厉害',
          english_name: 'edith'
        },
        {
          name: '曾厉害',
          key_name: 'k曾厉害',
          english_name: 'edith'
        },
        {
          name: '曾厉害',
          key_name: 'k曾厉害',
          english_name: 'edith'
        },
        {
          name: '曾厉害',
          key_name: 'k曾厉害',
          english_name: 'edith'
        },
        {
          name: '曾厉害',
          key_name: 'k曾厉害',
          english_name: 'edith'
        }
      ],
      oddDetail: [
        {
          title: 'SKU',
          align: 'center',
          key: 'SKU'
        },
        {
          title: '简称',
          align: 'center',
          key: 'ShortlName'
        },
        {
          title: '售价',
          align: 'center',
          key: 'Price'
        },
        {
          title: '状态',
          align: 'center',
          key: 'Status'
        }
      ],
      footerData: [
        {
          Identifier: '0f4ebcf21c7e4be39bb098d295275423',
          Price: '$341.00',
          SKU: 'OPT0093',
          ShortlName: 'New York',
          Status: '下架'
        },
        {
          Identifier: '0f4ebcf21c7e4be39bb098d295275423',
          Price: '$341.00',
          SKU: 'OPT0093',
          ShortlName: 'New York',
          Status: '下架'
        },
        {
          Identifier: '0f4ebcf21c7e4be39bb098d295275423',
          Price: '$341.00',
          SKU: 'OPT0093',
          ShortlName: 'New York',
          Status: '下架'
        }
      ]
    }
  },
  methods: {
    tabs (index) {
      console.log(index)
    },
    PageSizeChange (limit) {
      this.params.limit = limit
    },
    pageChange (page) {
      this.params.page = page
    },
    edTable (row, index) {
      console.log(row)
      this.fList = this.footerData
    },
    goodsSet () {
      this.goodsSetModal = true
      this.goodsSetTitle = '设置推荐商品'
    },
    search () {
      let len = this.tableData
      let arr = []
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
      this.modalTitle = '修改'
      this.itemIndex = index
      this.formValidate = JSON.parse(JSON.stringify(item))
    },

    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.formValidate))
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
    handleTransfer () {
      let params = JSON.parse(JSON.stringify(this.targetKeys2))
      console.log(this.$set(this.newList, params))
      this.$Message.success(this.$t('message.editSuccess'))
      this.goodsSetModal = false
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
    getMockData () {
      let mockData = []
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: 'Content ' + i,
          description: 'The desc of content  ' + i
          // disabled: Math.random() * 3 < 1
        })
      }
      return mockData
    },
    getTargetKeys () {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map(item => item.key)
    },
    handleChange (newTargetKeys) {
      this.targetKeys2 = newTargetKeys
    },
    filterMethod (data, query) {
      return data.label.indexOf(query) > -1
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
  .but_list {
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px dashed #dedede;
    padding-bottom: 10px;
  }

  .but_list button {
    margin: 0 2px;
  }
</style>
