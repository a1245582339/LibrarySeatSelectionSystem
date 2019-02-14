<template>
    <div>
        <CellGroup style="width: 500px;background: #fff">
            <Cell title="登录名" :extra="user.login_name" />
            <Cell title="角色" :extra="user.role === 1 ? '超级管理员' : '管理员'" />
            <Cell title="密码" label="点击修改" extra="********" @click.native="show = true" />
        </CellGroup>

        <Modal v-model="show" width="360" title="修改密码" @on-visible-change="showChange">
        <div>
            <Form ref="form" :model="form" :rules="rule">
                <FormItem prop="old_password">
                    <Input type="password" v-model="form.old_password" placeholder="请输入原密码">
                        <Icon type="md-lock" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="new_password">
                    <Input type="password" v-model="form.new_password" placeholder="请输入新密码">
                        <Icon type="md-lock" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="repeat_password">
                    <Input type="password" v-model="form.repeat_password" placeholder="请重复新密码">
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
    </div>
</template>
<script>
import { checkPassword } from '@/api/user'
import { updateAdmin } from '@/api/admin'
import user from '../../store/modules/user';
export default {
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码！'));
            } else if (!/^[a-zA-Z]\w{5,17}$/.test(value)) {
                callback(new Error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线！'));
            } else {
                callback();
            }
        };
        const validateRepeatPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请重复新密码！'));
            } else if (value !== this.form.new_password) {
                callback(new Error('两次密码必须一致！'));
            } else {
                callback();
            }
        };
        return {
            user: this.$store.getters.userInfo,
            show: false,    // 密码框
            form: {
                old_password: '',
                new_password: '',
                repeat_password: ''
            },
            rule: {
                old_password: [
                    { required: true, message: '请输入旧密码！', trigger: 'blur' },
                ],
                new_password: [
                    { validator: validatePass, trigger: 'blur' },
                ],
                repeat_password: [
                    { validator: validateRepeatPass, trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        showChange(val) {
            if (!val) {
                    this.$refs.form.resetFields();
            }
        },
        submit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const res = await checkPassword({login_name: this.user.login_name, password: this.form.old_password})
                    if (res.data.code === 20000) {
                        await updateAdmin(this.user.id, { password: this.form.new_password })
                        this.$Message.success('更新成功！');
                        this.show = false
                    } else {
                        this.$Message.error('原密码错误！请重新输入！');
                    }
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
