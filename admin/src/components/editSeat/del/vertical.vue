<template>
    <div class="divider">
        <Button type="error" style="position: relative" shape="circle" icon="md-close" size="small" @click.stop="onclickBtn"></Button>
    </div>
</template>
<script>
export default {
    props: ['index'],
    methods: {
        onclickBtn() { 
            this.$emit('delRow', this.index)
        }
    }
}
</script>
<style lang="scss" scoped>
.divider {
    position: absolute;
    transform: translate(3px, 15px);
}
</style>
