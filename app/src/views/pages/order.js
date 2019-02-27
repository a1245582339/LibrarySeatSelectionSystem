import React, { useState, useEffect } from 'react'
import { getOrder, updateOrder } from '@h/order'
import { connect } from 'react-redux'
import { List, Toast, Modal } from 'antd-mobile';
import { timestampToTime, timestampTohm } from '@u/time'

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;


const Order = (props) => {
    const [data, setData] = useState([])
    const stu_id = props.student.id
    useEffect(() => {
        fetchData()
    }, [props.student.id])

    const fetchData = () => {
        if (stu_id) {
            getOrder({stu_id: stu_id}).then(res => {
                setData(res.data.data)
            })
        }
    }

    return(
        <>
            <div>

                <List className="my-list"
                    renderHeader={() => '预约列表'}
                >
                    {data.map((item, index) => {
                        return (
                            <Item arrow="horizontal"
                                key={index}
                                multipleLine
                                onClick={() => {
                                    if (item.end_time < Date.now() || item.status === 0) {
                                        Toast.fail('过期预约不可取消!', 1)
                                    } else {
                                        alert('取消预约', '确认取消此预约？', [
                                            { text: '取消', onPress: () => console.log('cancel') },
                                            {
                                              text: '确定',
                                              onPress: () =>
                                                {
                                                    return new Promise(async (resolve) => {
                                                        const data = item.start_time > Date.now() ? { status: 0 } : { end_time: Date.now() }
                                                        await updateOrder({id: item.id, data})
                                                        Toast.info('成功!', 2);
                                                        setTimeout(() => {
                                                            resolve()
                                                            fetchData()
                                                        }, 2000)
                                                    })
                                                }
                                            },
                                          ])
                                    }
                                }}
                            >
                            {`${item.name} ${item.line + 1}排 ${item.row + 1}列`}
                                {/* <span style={{color: '#ccc'}}>{`(${item.end_time < Date.now() || item.status === 0 ? '已过期' : '占用中,点击可取消'})`}</span> */}
                                <span style={{color: '#ccc'}}>{`(${item.status === 0 ? '已取消' : (item.end_time < Date.now() ? '已过期' : '占用中,点击可取消')})`}</span>
                                <Brief>预约时间:{` ${timestampToTime(item.start_time)}至${timestampTohm(item.end_time)}`}</Brief>
                            </Item>
                        )
                    })}

                </List>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        student: state.student
    }
}

export default connect(mapStateToProps)(Order)