<template>
    <div>
             <div class="demo-split">
            
                    <div slot="top" class="demo-split-pane">
                        <Button type="info">测试发送</Button>
                          <Button type="error">删除</Button>
                           <Button type="warning">修改</Button>
                         <Button type="success">新增</Button>
                    </div>
                
            </div>  
         <Table :columns="columns1" :data="list"></Table>
         <Page :total="total"  :current="pageNo" id='emailMessage' :page-size='pageSize' @on-change='onChange' />
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
            return {
                total:20,
                pageSize:5, //每页条数
                list:[],
                pageNo:1,
                columns1: [
                    {
                        title: '标识',
                        key: 'id'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '发件人',
                        key: 'name'
                    },
                    {
                        title: '备注',
                        key: 'desc'
                    }
                ]
            }
    },
    mounted() {
        axios({
            url:'http://www.baidu.com/emil'
        }).then((res)=>{
            console.log(res.data.list)
            if(res.data.list.length <= 5 ){
                this.list = res.data.list
            }else{
                this.list = res.data.list.splice(0,this.pageSize)
            }
        })
    },
    methods: {
        onChange(val){
           // console.log(val)
            this.pageNo = val  //改变后的页码
            
        }
    },
}
</script>

<style  scoped>
#emailMessage{
    float: right;
    padding-top: 20px
}
.demo-split{
        height: 50px;
        border-bottom: 1px solid #dcdee2;
    }
.demo-split-pane{
        padding: 10px;
    }
.demo-split-pane  button{
    margin: 0 10px;
    float: right;
}   
</style>