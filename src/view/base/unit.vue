<template>
  <div>
    <div class="topBody">
      <Input v-model="something" :placeholder="$t('inputKey')" style="width: 160px;margin-right: 10px"/>
      <Button type="primary" icon="ios-search">{{ $t('search') }}</Button>
      <Button style="float: right;" type="primary" icon="ios-add" @click="addBus">{{ $t('add') }}</Button>
    </div>
    <div class="tableText">
      <Table :loading="loading" :columns="columns" :data="newList" border/>
      <Page :total="100" align="right" show-sizer show-elevator style="margin-top: 10px" @on-change="pageChange"
            @on-page-size-change="PageSizeChange"/>
    </div>
    <Modal
      :title="modalTitle"
      v-model="handleModal"
      :footer-hide="true"
      :mask-closable="true"
      draggable
      @on-visible-change="handleReset('formValidate')"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem :label="$t('table.name')" prop="name">
          <Input v-model="formValidate.name" :placeholder="$t('table.pleaseEnter') + $t('table.name')"></Input>
        </FormItem>
        <FormItem :label="$t('table.remark')" prop="remark">
          <Input v-model="formValidate.remark" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('table.pleaseEnter') + $t('table.remark')"
                 type="textarea"></Input>
        </FormItem>
        <div align="center">
          <Button type="primary" @click="handleSubmit('formValidate')">{{ $t('formButton.submit') }}</Button>
          <Button style="margin-left: 8px" @click="handleReset('formValidate')">{{ $t('formButton.reset') }}</Button>
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>

export default {
  name: 'BaseUnit',
  data () {
    return {
      handleModal: false,
      loading: true,
      modalTitle: '',
      newList: [],
      companyName: '',
      formValidate: {
        time: '',
        remark: '',
        name: '',
        author: '',
        status: ''
      },
      something: '',
      ruleValidate: {
        name: [{ required: true, message: '名称不能为空', trigger: 'change' }]
      },
      params: {
        page: 1,
        limit: 10
      },
      columns: [
        // {
        //   title: '编号',
        //   type: 'index',
        //   width: 80,
        //   align: 'center'
        // },
        {
          title: '名称',
          align: 'center',
          key: 'name'
        },
        {
          title: '备注信息',
          align: 'center',
          key: 'remark'
        },
        {
          title: '状态',
          align: 'center',
          key: 'status'
        },
        {
          title: '录入时间',
          align: 'center',
          key: 'time'
        },
        {
          title: '创建人',
          align: 'center',
          key: 'author'
        },
        {
          title: '操作',
          key: 'action',
          width: 250,
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
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.editBus(params.row, params.index)
                    }
                  }
                },
                '注销'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index)
                    }
                  }
                },
                '启用'
              )
            ])
          }

        }
      ],
      tableData: [
        {
          time: '2016-10-03',
          remark: '87987987987',
          name: '曾厉害',
          author: '曾厉害',
          status: '已确认'
        },
        {
          time: '2016-10-03',
          remark: '87987987987',
          name: '曾厉害',
          author: '曾厉害',
          status: '已确认'
        },
        {
          time: '2016-10-03',
          remark: '87987987987',
          name: '曾厉害',
          author: '曾厉害',
          status: '已确认'
        },
        {
          time: '2016-10-03',
          remark: '87987987987',
          name: '曾厉害',
          author: '曾厉害',
          status: '已确认'
        },
        {
          time: '2016-10-03',
          remark: '87987987987',
          name: '曾厉害',
          author: '曾厉害',
          status: '已确认'
        }
      ]

    }
  },
  mounted () {
    this.newList = this.tableData
    setTimeout(() => {
      this.loading = false
    }, 1000)
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
    search () {
      const len = this.tableData
      const arr = []
      for (const i in len) {
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
          const params = JSON.parse(JSON.stringify(this.formValidate))
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
    }
  }
}
</script>
