import React, { useState, useEffect } from 'react'
import { NavBar, Icon, DatePicker, List, Modal, Toast } from 'antd-mobile';
import { getLibSeat } from '@h/library';
import { createOrder } from '@h/order';
import store from '@/store'
import Seat from '@c/seat'

const alert = Modal.alert;

const LibDetail = (props) => {
    const [seat, setSeat] = useState([])
    const [seat_id, setSeatId] = useState(null)
    const [start_time, setStartTime] = useState(Date.now())
    const [end_time, setEndTime] = useState(Date.now() + 3600000)

    useEffect(() => {
        if (props.history.location.query) {
            getLibSeat({
                library_id: props.history.location.query.library_id,
                start_time,
                end_time
            }).then(res => {
                setSeat(res.data.data)
            })
        } else {
            props.history.go(-1)
        }
    }, [start_time, end_time])


    const onChoose = (newValue) => {
        const newSeat = seat.map(line =>{
                return {
                    row: line.row.map(row => {
                        return row.seat_id === newValue.seat_id ? newValue : {...row, value: row.value === 3 ? 1 : row.value}
                    })
                }
            }
        )
        if (newValue.value === 3) {
            setSeatId(newValue.seat_id)
        }
        setSeat(newSeat)
    }

    const handleSubmit = () => {
        if (!seat_id) {
            Toast.fail('请选择座位!', 2)
            return false
        }
        alert('预约', '确认预约选定座位？', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
              text: '确定',
              onPress: () =>
                {
                    return new Promise(async (resolve) => {
                        const res = await createOrder({
                            seat_id,
                            start_time,
                            end_time,
                            stu_id: store.getState().student.id,
                            status: 1
                        })
                        if (res.data.code === 20000) {
                            Toast.info('预约成功!', 2);
                            setTimeout(() => {
                                resolve()
                                props.history.go(-1)
                            }, 2000)
                        } else {
                            Toast.fail(res.data.msg, 2)
                            setTimeout(resolve, 2000)
                        }
                    })
                }
            },
          ])
    }

    return (
        <>
            <NavBar
                icon={<Icon type="left" />}
                mode="light"
                onLeftClick={() => {
                    props.history.go(-1)
                }}
                rightContent={[
                    <span key="0"
                        onClickCapture={() => {handleSubmit()}}
                    >提交</span>
                ]}
            >{props.history.location.query ? props.history.location.query.name : ''}</NavBar>
            <List>
            <DatePicker
                maxDate={new Date(end_time)}
                minDate={new Date(Date.now())}
                mode="time"
                onOk={time => {
                    setStartTime(time.getTime())
                }}
                use12Hours
                value={new Date(start_time)}
            >
                <List.Item arrow="horizontal">开始时间</List.Item>
            </DatePicker>
            <DatePicker
                maxDate={new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)}
                minDate={new Date(start_time)}
                mode="time"
                onOk={time => {
                    setEndTime(time.getTime())
                }}
                use12Hours
                value={new Date(end_time)}
            >
                <List.Item arrow="horizontal">结束时间</List.Item>
            </DatePicker>
            </List>
            <Seat onChoose={onChoose}
                seat={seat}
            />
        </>
    )
}

export default LibDetail