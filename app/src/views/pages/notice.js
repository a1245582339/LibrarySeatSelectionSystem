import React, { useState, useEffect } from 'react'
import { List, Pagination, Input, Skeleton, Modal, message  } from 'antd'
// import { getNotice, updateNotice } from '@/http/notice';
// import { timestampToTime } from '@/utiles/time';
// import NoticePreview from '@/components/Notice/preview'

const Search = Input.Search;
const Notice = () => {
    const [page, usePage] = useState(0);
    const [limit, useLimit] = useState(10);
    const [data, useData] = useState([]);
    const [count, useCount] = useState(0);
    const [searchWord, useSearchWord] = useState('');
    const [loading, useLoading] = useState(true);
    const [previewShow, usePreviewShow] = useState(false)
    const [noticeId, useNoticeId] = useState('')
    useEffect(async () => {
        fetchData()
    }, [page, limit, searchWord])
    const fetchData = async () => {
        useLoading(true)
        // const {data, count} = (await getNotice({page, limit, title: searchWord})).data
        useData(data)
        useCount(count)
        setTimeout(() => {
            useLoading(false)
        }, 800)
    }
    const delNotice = (id) => {
        Modal.confirm({
            title: '确定删除此条公告？',
            async onOk() {
                // const res = await updateNotice({isDel: 1}, id)
                // console.log(res)
                message.success('删除成功');
                fetchData()
            },
            onCancel() {
                console.log('Cancel');
            }
        });


    }
    return (
        <>
            <Search
                enterButton
                onSearch={value => useSearchWord(value)}
                placeholder="请输入公告标题"
                style={{width: '300px'}}
            />

            <List
                bordered
                dataSource={data}
                itemLayout="horizontal"
                renderItem={item => (
                    <List.Item
                        actions={loading ? [] :[<span key={item.id}
                            onClick={() => {useNoticeId(item.id); usePreviewShow(true)}}
                            style={{color: '#1890ff'}}
                                                >预览</span>, <span key={item.id}
                                                    onClick={() => delNotice(item.id)}
                                                    style={{color: '#f5222d'}}
                                                            >删除</span>]}
                        key={item.title}
                    >
                        <Skeleton active
                            loading={loading}
                            paragraph={{ rows: 1 }}
                        >
                            <List.Item.Meta
                                description={`作者：${item.author + ' '}发布时间`}
                                title={<a href={item.href}>{item.title}</a>}
                            />
                        </Skeleton>
                    </List.Item>
                )}
                size="large"
                style={{marginTop: '20px'}}
            />,

            <Pagination defaultCurrent={1}
                onChange={page => usePage(page - 1)}
                onShowSizeChange={(current, pageSize) => useLimit(pageSize)}
                showSizeChanger
                style={{marginTop: '20px', float: 'right'}}
                total={count}
            />

            <NoticePreview noticeId={noticeId}
                onClose={() => usePreviewShow(false)}
                show={previewShow}
            />

        </>
    )
}

export default Notice