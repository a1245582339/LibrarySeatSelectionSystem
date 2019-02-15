import React, { useCallback, useState } from 'react';
import { Button, Input, Modal, message } from 'antd';
// import RichText from '@/components/RichText';
// import { updateNotice } from '@/http/notice';
// import '@/style/pages/newBulletin.scss';

const NewBulletin = (props) => {
    const [title, useTitle] = useState('')
    const [author, useAuthor] = useState('')
    const [richText, useRichText] = useState('<p></p>')
    const [visible, useVisible] = useState(false)
    const [confirmLoading, useConfirmLoading] = useState(false)
    const [confirmText, useConfirmText] = useState('')

    const titleChange = useCallback((e) => {
        useTitle(e.target.value)
    }, [title])

    const authorChange = useCallback((e) => {
        useAuthor(e.target.value)
    }, [author])

    const richTextChange = useCallback((richTextcb) => {
        useRichText(richTextcb)
    }, [richText])

    const handleSubmit = () => {
        if (richText === '<p></p>') {
            useConfirmText('该公告没有添加正文，是否确认提交？')
        } else {
            useConfirmText('是否确认提交？')
        }
        useVisible(true)
    }

    const handleOk = async () => {
        const data = {
            title,
            author,
            content: richText
        }
        useConfirmLoading(true)
        // await updateNotice(data)
        message.success('创建成功');
        useConfirmLoading(false)
        props.history.push({pathname: '/main/notice'})
    }

    const handleCancel = () => {
        useVisible(false)
    }

    return (
        <>
            <div className="from-item">
                <p>标题</p>
                <Input onChange={titleChange}
                    placeholder="请输入标题"
                />
            </div>
            <div className="from-item">
                <p>作者</p>
                <Input onChange={authorChange}
                    placeholder="请输入作者"
                />
            </div>
            <div className="from-item">
                <p>内容</p>
                <RichText onChange={richTextChange}/>
            </div>

            <Button disabled={!title || !author}
                onClick={handleSubmit}
                size="large"
                style={{float: 'right', marginTop: '20px'}}
                type="primary"
            >发布</Button>

            <Modal confirmLoading={confirmLoading}
                onCancel={handleCancel}
                onOk={handleOk}
                title="Title"
                visible={visible}
            >
                <p>{confirmText}</p>
            </Modal>
        </>
    )
}

export default NewBulletin