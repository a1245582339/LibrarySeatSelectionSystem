<template>
    <div>
        <h1>
            请选择要查询的自习室
        </h1>
        <div style="margin-top: 20px">
            <Row>
                <Col :gutter="16" span="10" style="padding-right:10px">
                    <Select 
                        v-model="form.university_id" 
                        filterable 
                        remote 
                        :remote-method="debounce(searchUni, 300)" 
                        :loading="uni_loading" 
                        @on-change="chooseUni" 
                        placeholder="请输入搜索大学名称"
                    >
                        <Option v-for="(option, index) in uni_option" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </Col>
                <Col :gutter="16" span="10" style="padding-right:10px">
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
            <seat :seat="seat" @refresh="handleSearch" />
            <Spin size="large" fix v-if="seat_loading"></Spin>
        </div>
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
        getSeat
    } from '@/api/seat';
    import seat from '@/components/seat';
    import lodash from 'lodash';
    export default {
        components: {
            seat
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
                seat_loading: false
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
                        label: `${item.name} (可用座位${item.available_seat_count} 总座位${item.total_seat_count})`
                    }
                })
            },
            async handleSearch() {
                this.seat_loading = true
                const res = await getSeat({library_id: this.form.library_id, start_time: Date.now(), end_time: Date.now() + 1})
                this.seat = res.data.data
                setTimeout(() => {
                    this.seat_loading = false
                }, 200)
            },
            debounce(fun, time) {
                return lodash.debounce(fun, time)
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>