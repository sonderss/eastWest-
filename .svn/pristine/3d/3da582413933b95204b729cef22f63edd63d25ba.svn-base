<template>
  <div>
    <Icon type="md-desktop" />
    <span style="font-size: 15px;display: inline-block;vertical-align: -1px;margin-left: 10px;">油画场景</span>
    <Tree :data="data5" :render="renderContent"></Tree>
  </div>
</template>
<script>
import datas from './data.js'
export default {
  name: 'oilscene',
  dataList: datas,
  data () {
    return {
      data5: datas
    }
  },
  methods: {
    renderContent (h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]
      )
    }
  }
}
</script>
