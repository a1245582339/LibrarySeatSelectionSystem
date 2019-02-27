import React from 'react'
import { connect } from 'react-redux'
import { List, Modal, Toast } from 'antd-mobile';
import { updateStu, checkPassword } from '@h/student'

const Item = List.Item;
const prompt = Modal.prompt

const User = (props) => {
    return(
        <>
            <div>
                <form>
                    <List className="my-list"
                        renderHeader={() => '个人信息'}
                    >
                        <Item extra={props.student.id}>学号</Item>
                        <Item extra={props.student.name}>姓名</Item>
                        <Item extra={props.student.sex === 1 ? '男' : '女'}>性别</Item>
                        <Item arrow="horizontal"
                            extra={props.student.tel}
                            onClick={() => {
                                prompt('手机号', '请输入手机号!', [
                                    { text: '取消' },
                                    { text: '确认', onPress: async value => {
                                        if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)) {
                                            await updateStu({id: props.student.id, data: {tel: value}})
                                            Toast.success('修改成功!')
                                        } else {
                                            Toast.fail('请输入正确手机号!', 2)
                                        }
                                    }},
                                ], 'default', props.student.tel)}
                            }
                        >手机号</Item>
                        <Item arrow="horizontal"
                            extra="点击修改"
                            onClick={() => {
                                prompt(
                                    '修改密码',
                                    '请输入原密码',
                                    async password => {
                                        const res = await checkPassword({id: props.student.id, password})
                                        if (res.data.code === 20004) {
                                            Toast.fail('密码错误!校验失败!', 2)
                                        } else {
                                            prompt(
                                                '修改密码',
                                                '请输入新密码',
                                                async password => {
                                                    await updateStu({id: props.student.id, data: {password}})
                                                    Toast.success('修改成功!')
                                                },
                                                'secure-text',
                                                null,
                                                ['请输入新密码'],
                                              )
                                        }
                                    },
                                    'secure-text',
                                    null,
                                    ['请输入原密码'],
                                  )
                            }}
                        >密码</Item>
                    </List>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        student: state.student
    }
}

export default connect(mapStateToProps)(User)