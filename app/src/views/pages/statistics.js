import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import { DatePicker } from 'antd';
import { timestampToDate } from '@/utiles/time';
import { getNoticeLog } from '@/http/notice';
// import NoData from '@/components/Notice/noData'

const dateFormat = 'YYYY/MM/DD';

const Statistics = () => {
    const [start_time, useStartTime] = useState(new Date().getTime() - 604800000)       // 默认一周前开始
    const [end_time, useEndTime] = useState(new Date().getTime())       // 默认当前时间结束
    const [label, useLabel] = useState([])
    const [data, useData] = useState([])        // 放到饼图里的数据
    const [totalData, useTotalData] = useState([])      // 原始数据
    // const [modalShow, useModalShow] = useState(false)   // 单独的模态框显示
    useEffect(() => {
        fetchData()
    }, [start_time, end_time])
    const fetchData = async () => {
        const {label, data, totalData} = (await getNoticeLog({start_time, end_time}))
        useLabel(label)
        useData(data)
        useTotalData(totalData)
    }
    const onTimeChange = (date) => {
        useStartTime(date[0]._d.getTime())
        useEndTime(date[1]._d.getTime())
    }
    const onClickBlock = (params) => {
        // useModalShow(true)
        console.log(totalData.find((_, index) => index === params.dataIndex).notice_id)
    }
    const onEvents = {
        click: onClickBlock
    }
    return (
        <>
            <DatePicker.RangePicker defaultValue={[moment(timestampToDate(start_time), dateFormat), moment(timestampToDate(end_time), dateFormat)]}
                format={dateFormat}
                onChange={onTimeChange}
            />
            {/* <NoData /> */}
            <div style={{marginTop: '50px', height: '100%', width: '100%'}}>
                <ReactEcharts
                    onEvents={onEvents}
                    option={{
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'right',
                            data: label
                        },
                        series: [
                            {
                                name:'公告标题',
                                type:'pie',
                                radius: ['50%', '70%'],
                                avoidLabelOverlap: true,
                                data: data
                            }
                        ]
                    }}
                />
            </div>
        </>
    )
}

export default Statistics