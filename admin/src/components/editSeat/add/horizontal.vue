<template>
    <div class="divider">
        <Button shape="circle" icon="md-add" size="small" @click.stop="onclickBtn"></Button>
    </div>
</template>
<script>
export default {
    props: ['index'],
    methods: {
        onclickBtn() { 
            this.$emit('addLine', this.index)
        }
    }
}
</script>
<style lang="scss" scoped>
.divider {
    z-index: 9999;
}
</style>
