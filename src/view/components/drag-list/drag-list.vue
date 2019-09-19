<template>
  <div>
    <Card>
      <div class="drag-box-card">

        <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
       <drag-list :list1.sync="list1"  :dropConClass="dropConClass" >
          <h3 slot="left-title"></h3>
          <Card class="drag-item" slot="left" slot-scope="left">{{ left.itemLeft.name }}</Card>

        </drag-list>

      </div>

    </Card>
  </div>
</template>
<script>
import DragList from '_c/drag-list'
export default {
  name: 'drag_list_page',
  props: ['list'],
  components: {
    DragList
  },
  data () {
    return {
      list1: [
        {
          'name': '进主见就民严转属与别结历合。',
          'id': 20
        },
        {
          'name': '又造动适之低争知听在运期。',
          'id': 30
        },
        {
          'name': '局级五养圆北该统难即机自。',
          'id': 50
        },
        {
          'name': '正民府要农历众组路斗积流美。',
          'id': 10
        },
        {
          'name': '青保准品切行新包事儿说。',
          'id': 40
        },
        {
          'name': '正民府要农历众组路斗积流美。',
          'id': 10
        }
      ],
      dropConClass: {
        left: ['drop-box', 'left-drop-box']
      }
    }
  }
}
</script>
<style lang="less">
.drag-box-card{
  display: inline-block;
  width: 600px;
  height: 560px;
  margin-left:150px;
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
}

</style>
