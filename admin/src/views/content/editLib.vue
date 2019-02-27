<template>
    <div>
        <h1>
            编辑自习室座位
        </h1>
        <div style="margin-top: 20px">
            <Row>
                <Col :gutter="16" span="7" style="padding-right:10px">
                    <Select v-model="form.university_id" filterable remote :remote-method="debounce(searchUni, 300)" :loading="uni_loading" @on-change="chooseUni" placeholder="请输入搜索大学名称">
                        <Option v-for="(option, index) in uni_option" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </Col>
                <Col :gutter="16" span="7" style="padding-right:10px">
                    <Select v-model="form.library_id" filterable :disabled="!form.university_id" :placeholder="form.university_id ? '请选择自习室' : '请先选择大学'">
                        <Option v-for="(option, index) in lib_option" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </Col>
                <Col :gutter="16" span="4" style="padding-right:10px">
                    <Button type="primary" @click="handleSearch">查询</Button>
                </Col>
            </Row>
        </div>
        
        <div style="margin-top: 20px; position: relative">
            <edit-seat :seat="seat" @refresh="handleSearch" />
            <Spin size="large" fix v-if="seat_loading"></Spin>
        </div>
        <Button style="margin-top: 20px" v-if="seat.length" type="primary" @click="submit">提交</Button>
    </div>
</template>
<script>
    import {
        getUniversity
    } from '@/api/university';
    import {
        getLibrary
    } from '@/api/library';
    import {
        getSeat,
        updateSeat
    } from '@/api/seat';
    import editSeat from '@/components/editSeat';
    import lodash from 'lodash';
    export default {
        components: {
            editSeat
        },
        data() {
            return {
                uni_loading: false,
                form: {
                    university_id: '',
                    library_id: ''
                },
                uni_option: [],
                lib_option: [],
                seat: [],
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
                            value: item.id,
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
            async chooseUni() {
                const res = await getLibrary({ id: this.form.university_id })
                this.lib_option = res.data.data.map(item => {
                    return {
                        value: item.id,
                        label: `${item.name}`
                    }
                })
            },
            async handleSearch() {
                this.seat_loading = true
                const res = await getSeat({library_id: this.form.library_id, start_time: Date.now(), end_time: Date.now()})
                this.seat = res.data.data
                setTimeout(() => {
                    this.seat_loading = false
                }, 200)
            },
            submit() {
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>此操作会清除当前未开始的预约信息，强烈建议在自习室闭馆后操作，确认提交？</p>',
                    loading: true,
                    onOk: async () => {
                        const res = await updateSeat(this.form.library_id, this.seat)
                        this.$Message.success(res.data.msg);
                        this.handleSearch()
                    }
                });
                
            },
            debounce(fun, time) {
                return lodash.debounce(fun, time)
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>