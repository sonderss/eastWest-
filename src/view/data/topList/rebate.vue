<template>
  <Row>
      <Col span="11" class="item">
        <p>总佣金排名</p>
        <div>
           <Table highlight-row :columns="columns1" :data="data1"></Table>
        </div>

      </Col>
      <Col span="11" offset="1" class="item">
        <p>本月佣金排名</p>
        <div>
          <Table highlight-row :columns="columns2" :data="data2"></Table>
        </div>
      </Col>
  </Row>
</template>

<script>
export default {
  name: 'rebate',
  data () {
    return {
      columns1: [
        {
          title: '排名',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '昵称/手机号',
          key: 'name'
        },
        {
          title: '收入佣金',
          key: 'integral'
        },
        {
          title: '佣金余额',
          key: 'many'
        }
      ],
      data1: [
        // {
        //   name: 'A+2王博',
        //   integral: '30.00'
        // },
        // {
        //   name: 'A+2王博',
        //   integral: '20.00'
        // },
        // {
        //   name: 'A+2王博',
        //   integral: '10.00'
        // },
        // {
        //   name: 'A+2王博',
        //   integral: '10.00'
        // },
        // {
        //   name: 'A+2王博',
        //   integral: '5.00'
        // }
      ],
      columns2: [
        {
          title: '排名',
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '昵称/手机号',
          key: 'name'
        },
        {
          title: '收入佣金',
          key: 'integral'
        },
        {
          title: '佣金余额',
          key: 'many'
        }
      ],
      data2: [
        // {
        //   name: '陈美惠',
        //   integral: '30.00'
        // }
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
p{
  border-bottom: 1px solid #f6f6f6;
  padding:10px;
  font-size: 15px;
}
.item{
  background: #fff;
  >div{
    padding:10px
  }
}
</style>
