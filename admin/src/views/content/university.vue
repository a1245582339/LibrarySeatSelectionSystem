<template>
    <div style="width: 90%">
        <h1>
            学校管理
        </h1>
        <div style="margin-top: 20px;">
            <Input style="width: 300px; float: left" v-model="search_word" search enter-button placeholder="请输入关键字" @on-search="fetchData" />
            <Button style="float: right" type="primary" @click="modalNoshow">新建</Button>
            <div style="clear: both"></div>
        </div>
        <Table style="margin-top: 20px" :loading="loading" :columns="columns" :data="data"></Table>
        <Page style="margin-top: 20px" :total="total" @on-change="pageChange" />
        <create-uni :create_modal_show="create_modal_show" @noshow="modalNoshow" @refresh="fetchData" />
    </div>
</template>
<script>
    import { getUniversity, updateUniversity } from '@/api/university';
    import createUni from '@/components/createUni';
    export default {
        components: {
            createUni
        },
        data() {
            return {
                columns: [{
                        title: 'ID',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            if (params.row.edit) {
                                this.edit.name = params.row.name
                                return h('div', [
                                    h('Input', {
                                        props: {
                                            placeholder: '请输入大学名称',
                                            style: {
                                                width: '300px'
                                            },
                                            value: params.row.name
                                        },
                                        on: {
                                            'on-change': (e) => {
                                                this.edit.name = e.target.value
                                                
                                            }
                                        }
                                    })
                                ])
                            } else {
                                return (
                                    <div>{ params.row.name }</div>
                                )
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            if (params.row.edit) {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '5px',
                                        },
                                        on: {
                                            click: async () => {
                                                if (this.edit.name) {
                                                    const res = await updateUniversity(params.row.id, {name: this.edit.name})
                                                    if (res.data.code === 20000) {
                                                        this.$Message.success('编辑成功！');
                                                        this.fetchData()
                                                    } else {
                                                        this.$Message.warning(res.data.msg);
                                                    }
                                                } else {
                                                    this.$Message.warning('学校名称不能为空！');
                                                }
                                            }
                                        }
                                    }, '确定'),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.data[params.index].edit = false
                                                this.edit.name = '';
                                            }
                                        }
                                    }, '取消'),
                                ])
                            } else {
                                return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.data.forEach(item => {
                                                item.edit = params.row.id === item.id ? true : false
                                                // 保证只有一个是打开的
                                            });
                                        }
                                    }
                                }, '编辑'),
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
                                            await updateUniversity(params.row.id, {isDel: 1})
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
                const res = await getUniversity({ name: search_word, page })
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