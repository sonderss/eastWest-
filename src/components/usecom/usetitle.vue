<template>
    <div>
        <Card :bordered="false">
            <p slot="title">搜索条件</p>
            <Row>
            <Col span="24">
              <span style="margin-right: 50px">创建时间:</span>
              <i-button v-for="(item,index) in productState" @click.stop="productBtn(index,'state',item)"
                    class="styleTitle"    :class="{isClass:num === index}" :key="item">{{item}}
              </i-button>
              <DatePicker type="daterange"   v-model='value'  :clearable='false' :editable="false"   confirm placement="bottom-end" v-show="isShowDate" placeholder="自定义时间" style="width: 200px">

              </DatePicker>
            </Col>
          </Row>
           <Row>
            <Col span="24">
              <span style="margin-right: 115px;"></span>
               <Button style="margin-top:20px;margin-right: 15px;" @click="changeClass('id')" :class="{isClass:id === 'id'}" icon="ios-search">搜索</Button>
                <Button style="margin-top:20px"  icon="md-refresh" @click="changeClass1('id1')" :class="{isClass:id1 === 'id1'}">刷新</Button>
              </i-button>
            </Col>
          </Row>
        </Card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      productState: ['全部商品', '今天', '本周', '本月', '本季度', '本年'],
      num: 0,
      id: 'id',
      id1: '',
      isShowDate: true
    }
  },
  methods: {
    productBtn (index, type, item) {
      if (type === 'state') {
        this.num = index
      }
    },
    changeClass (id) {
      this.id = 'id'
      this.id1 = ''
    },
    changeClass1 (id) {
      this.id1 = id
      this.id = ''
    }
  }
}
</script>

<style scoped>
.isClass {
    background-color: #0092DC;
    color: #fff;

  }
  .styleTitle{
    margin: 0 5px;

  }
</style>
