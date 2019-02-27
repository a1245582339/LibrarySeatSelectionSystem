<template>
    <div style="width: 90%">
        <h1>
            管理员管理
        </h1>
        <div style="margin-top: 20px;">
            <!-- <Input style="width: 300px; float: left" v-model="search_word" search enter-button placeholder="请输入关键字" @on-search="fetchData" /> -->
            <Button style="float: right" type="primary" @click="modalNoshow">新建</Button>
            <div style="clear: both"></div>
        </div>
        <Table style="margin-top: 20px" :loading="loading" :columns="columns" :data="data"></Table>
        <Page style="margin-top: 20px" :total="total" @on-change="pageChange" />
        <create-admin :create_modal_show="create_modal_show" @noshow="modalNoshow" @refresh="fetchData" />
    </div>
</template>
<script>
    import { getAdminList, updateAdmin } from '@/api/admin';
    import createAdmin from '@/components/createAdmin';
    export default {
        components: {
            createAdmin
        },
        data() {
            return {
                columns: [{
                        title: 'ID',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '登录名',
                        key: 'login_name',
                    },
                    {
                        title: '名称',
                        key: 'role',
                        render: (h, params) => {
                            return (
                                <span>{params.row.role === 1 ? '超级管理员' : '管理员'}</span>
                            )
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                                if (params.row.role === 1) {
                                    return (
                                        <span>不可修改超级管理员</span>
                                    )
                                } else {
                                    return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px',
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.data.forEach(item => {
                                //                 item.edit = params.row.id === item.id ? true : false
                                //             });
                                //         }
                                //     }
                                // }, '编辑'),
                                h('Poptip', {
                                    props: {
                                        confirm: true,
                                        title: "确定删除？"
                                    },
                                    style: {
                                        textAlign: 'left'
                                    },
                                    on: {
                                        'on-ok': async () => {
                                            await updateAdmin(params.row.id, {isDel: 1})
                                            this.$Message.success('删除成功！');
                                            this.fetchData()
                                        }
                                    }
                                }, [h('Button', {props: {type: 'error', size: 'small'}}, '删除')])
                            ]);
                                }
                                
                        }
                    }
                ],
                data: [],
                page: 1,
                loading: true,
                search_word: '',
                total: 0,
                edit: {
                    name: ''
                },
                create_modal_show: false
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            async fetchData() {
                this.loading = true
                const { search_word, page } = this
                const res = await getAdminList()
                this.data = res.data.data.map(item => {
                    return {
                        ...item,
                        edit: false
                    }
                })
                this.total = res.data.total
                setTimeout(() => {
                    this.loading = false
                }, 300)
            },
            modalNoshow() {
                this.create_modal_show = !this.create_modal_show
            },
            pageChange(page) {
                this.page = page
                this.fetchData()
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>