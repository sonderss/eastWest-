<template>
  <div>
    <Modal :value="modal1" title="删除操作" @on-ok="onOK" @on-cancel="cancel">
      <p>确定删除吗？</p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'model_del',
  props: {
    modal1: {
      type: Boolean,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: ''
    }
  },
  methods: {
    onOK () {
      this.$emit('del')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
