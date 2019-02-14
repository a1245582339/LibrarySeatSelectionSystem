<template>
    <div class="divider">
        <Button shape="circle" icon="md-close" size="small" @click.stop="onclickBtn" type="error"></Button>
    </div>
</template>
<script>
export default {
    props: ['index'],
    methods: {
        onclickBtn() { 
            this.$emit('delLine', this.index)
        }
    }
}
</script>
<style lang="scss" scoped>
.divider {
    display: inline-block;
    z-index: 9999;
    margin-left: 30px;
    transform: translateY(-10px)
}
</style>
