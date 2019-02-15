import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
// import { getMe } from '@/http/admin';
// import MyForm from '@/components/Me/BaseForm';
// import PasswordForm from '@/components/Me/PasswordForm';
const User = () => {
    const [info, useInfo] = useState({})
    useEffect(async () => {
        // useInfo(await getMe())
    }, [])
    return(
        <>
            <Card
                style={{ width: 1000 }}
                title="基本信息"
            >
                <MyForm formData={info} />
            </Card>

            <Card
                style={{ width: 1000, marginTop: 50 }}
                title="密码修改"
            >
                <PasswordForm formData={info} />
            </Card>

        </>
    )
}

export default User