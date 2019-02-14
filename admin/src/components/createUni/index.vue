<template>
    <Modal v-model="show" width="360" title="创建学校" @on-visible-change="showChange">
        <div>
            <Form ref="form" :model="form" :rules="rule">
                <FormItem prop="name">
                    <Input type="text" v-model="form.name" placeholder="请输入大学名称">
                    <Icon type="md-home" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="show = false">取消</Button>
            <Button type="primary" @click="submit">创建</Button>
        </div>
    </Modal>
</template>
<script>
import { updateUniversity } from '@/api/university';
    export default {
        props: ['create_modal_show'],
        data() {
            return {
                show: false,
                form: {
                    name: ''
                },
                rule: {
                    name: [
                        { required: true, message: '请输入大学名称！', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            showChange(val) {
                if (!val) {
                    this.$emit('noshow')
                    this.$refs.form.resetFields();
                }
            },
            submit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        const res = await updateUniversity(undefined, {name: this.form.name})
                        if (res.data.code === 20000) {
                            this.$Message.success('创建成功！');
                            this.show = false
                            this.$emit('refresh')
                        } else {
                            this.$Message.warning(res.data.msg);
                        }
                    } else {
                        return false
                    }
                })
            },
            cancel() {
                this.$emit('noshow')
            }
        },
        watch: {
            create_modal_show: {
                handler: function (val1, val2) {
                    if (this.show !== val1) {
                        this.show = val1
                    }
                },
                immediate: true
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>