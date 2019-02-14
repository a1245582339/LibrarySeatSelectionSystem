<template>
    <div>
        <h1>
            新建自习室
        </h1>
        <div style="margin-top: 20px">
            <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
                <FormItem label="自习室名称" prop="name">
                    <Input v-model="form.name" placeholder="请输入自习室名称" style="width: 300px"></Input>
                </FormItem>
               
                <FormItem label="学校" prop="university_id">
                    <Select style="width: 300px" v-model="form.university_id" filterable remote :remote-method="debounce(searchUni, 300)" :loading="uni_loading" placeholder="请输入搜索大学名称">
                        <Option v-for="(option, index) in uni_option" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div style="margin-top: 20px; position: relative">
            <edit-seat :seat="seat" />
        </div>
        <Button style="margin-top: 20px" v-if="seat.length" type="primary" @click="submit('form')">提交</Button>
    </div>
</template>
<script>
    import {
        getUniversity
    } from '@/api/university';
    import {
        updateSeat
    } from '@/api/seat';
    import {
        createLibrary
    } from '@/api/library';
    import editSeat from '@/components/editSeat';
    import lodash from 'lodash';
    export default {
        components: {
            editSeat
        },
        data() {
            return {
                ruleValidate: {
                    name: [
                        { required: true, message: '请输入自习室名称（不可修改）', trigger: 'blur' },
                    ],
                    university_id: [
                        { required: true, message: '请输入选择学校', trigger: 'change' },
                    ],
                },
                uni_loading: false,
                form: {
                    university_id: '',
                    name: '',
                },
                uni_option: [],
                seat: [{row: [{value: 1}]}],
                seat_loading: false,
            }
        },
        methods: {
            async searchUni(query) {
                if (query) {
                    this.uni_loading = true
                    const res = await getUniversity({
                        name: query,
                        limit: 99999
                    })
                    this.uni_option = res.data.data.map(item => {
                        return {
                            value: item.id + '',
                            label: item.name
                        }
                    })
                    setTimeout(() => {
                        this.uni_loading = false
                    }, 200)
                } else {
                    this.uni_option = []
                }
            },
            
            submit(name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        await createLibrary({data: this.form, seat: this.seat})
                        this.$refs[name].resetFields();
                        this.$Message.success('创建成功！');
                    } else {
                        return false
                    }
                })
            },
            debounce(fun, time) {
                return lodash.debounce(fun, time)
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>