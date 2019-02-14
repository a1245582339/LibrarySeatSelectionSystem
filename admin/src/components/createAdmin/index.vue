<template>
    <Modal v-model="show" width="360" title="创建管理员" @on-visible-change="showChange">
        <div>
            <Form ref="form" :model="form" :rules="rule">
                <FormItem prop="login_name">
                    <Input type="text" v-model="form.login_name" placeholder="请输入的登录名">
                    <Icon type="md-person" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="form.password" placeholder="请输入的密码">
                    <Icon type="md-lock" slot="prepend"></Icon>
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
import { createAdmin } from '@/api/admin';
    export default {
        props: ['create_modal_show'],
        data() {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录名！'));
                } else if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(value)) {
                    callback(new Error('字母开头，允许5-16字节，允许字母数字下划线！'));
                } else {
                    callback();
                }
            };

            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码！'));
                } else if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
                    callback(new Error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线！'));
                } else {
                    callback();
                }
            };

            return {
                show: false,
                form: {
                    login_name: '',
                    password: ''
                },
                rule: {
                    login_name: [
                        { validator: validateName, trigger: 'blur' },
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
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
                        const res = await createAdmin(this.form)
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