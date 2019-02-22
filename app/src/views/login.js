import React from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile';
import { login } from '@h/student'
import { setToken } from '@u/cookie';


const Login = (props) => {
  const { getFieldProps } = props.form;
  const handleSubmit = () => {
    props.form.validateFields(async (error, value) => {
      if (error) {
        Toast.fail('用户名或密码不可为空！')
      } else {
        Toast.loading('登陆中...')
        const res = await login(value)
        setTimeout(() => {
          if (res.data.code === 20000) {
            setToken(res.data.token)
            Toast.success('登陆成功！', 2, () => {
              props.history.replace('/main')
            })
          } else {
            Toast.fail(res.data.msg)
          }
        }, 500)
      }
    });
  }
  return (
    <div className="login">
      <List renderHeader={() => '登录选座系统'}>
        <InputItem
            {...getFieldProps('id',
              {rules: [{required: true}],}
            )}
            // defaultValue={id}
            placeholder="请输入学号"
        >学号
        </InputItem>
        <InputItem
            type="password"
            {...getFieldProps('password',
              {rules: [{required: true}],}
            )}
            // defaultValue={password}
            placeholder="请输入密码"
        >密码
        </InputItem>
      </List>
      <WhiteSpace size="lg" />
      <WingBlank>
        <Button onClick={() => {handleSubmit()}}
            type="primary"
        >登录</Button>
      </WingBlank>
    </div>
  );
};

export default createForm()(Login);
