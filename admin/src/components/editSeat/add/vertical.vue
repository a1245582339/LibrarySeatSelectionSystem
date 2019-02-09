<template>
    <div class="divider">
        <Button style="position: relative" shape="circle" icon="md-add" size="small" @click.stop="onclickBtn"></Button>
    </div>
</template>
<script>
export default {
    props: ['index'],
    methods: {
        onclickBtn() { 
            this.$emit('addRow', this.index)
        }
    }
}
</script>
<style lang="scss" scoped>
.divider {
    position: absolute;
    top: -40px;
}
</style>
