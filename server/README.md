
# 错误定义


| state | 错误       |
| ----- | ---------- |
| 401   | 无权限     |
| 400   | 请求无效   |
| 500   | 服务器错误 |

| code  | 错误             |
| ----- | ---------------- |
| 20001 | 用户失效         |
| 20002 | 用户名或密码错误 |
| 20003 | 用户名已存在     |
| 20004 | 密码校验失败     |

# 接口定义

## 管理端用户

### 登录

#### 请求
```http
POST /login/admin
```
#### 参数
```json
login_name: 用户名
password: 密码
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiYWFhIiwicGFzc3dvcmQiOiJhYWEiLCJpYXQiOjE1NDU4ODI2ODMsImV4cCI6MTU0NjQ4NzQ4M30.a0vhnaVYIcbckJdJqtKmdYdotWe7t7d6c0cxszP1Uyg"
}
```
***
### 拉取管理员用户信息

#### 请求
Authorization:token
```http
GET /info/admin
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "res": [
        {
            "id": 1,
            "login_name": "aaa",
            "name": "aaa",
            "role": 0,
            "isDel": 0
        }
    ]
}
```

***
### 更新/新增/删除管理员用户信息

#### 请求
```http
POST /admin
```
#### 参数
```
id: 用户id,
data: {
    login_name: 登录名,
    name: 用户名,
    password: 密码,
    role: 角色,
    isDel: 删除     // 0: 未删, 1: 已删
}
// 有id时为更新，否则为新增
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20003,
    "msg": "用户名已存在，新增失败！"
} // 新增时，用户名已存在，抛出异常

{
    "code": 20000,
    "msg": "更新成功/新增成功"
}
```
***
### 获取管理员列表

#### 请求
```http
GET /admin
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "data": [
        {
            "id": 1,
            "login_name": "aaa",
            "name": "aaa",
            "role": 0,
            "isDel": 0
        },
        {
            "id": 2,
            "login_name": "bbb",
            "name": "bbb",
            "role": 1,
            "isDel": 0
        }
    ],
    "msg": "管理员列表"
}
```
***
### 验证密码
#### 请求
```http
GET /admin/password
```
#### 参数
```json
login_name: 登录名
password: 密码
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "msg": "校验成功"
}
```
***
***
## 客户端用户

### 登录

#### 请求
```http
POST /login/student
```
#### 参数
```json
stu_id: 用户名
password: 密码
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVfaWQiOiIyMDE0MTExNjM0IiwicGFzc3dvcmQiOiIwIiwiaWF0IjoxNTQ1ODkxNDAwLCJleHAiOjE1NDY0OTYyMDB9.9Y0eaNO8nxKQrCssEW1uW72PIm225TB8TcAATK4A5RQ"
}
```
***
### 拉取用户信息

#### 请求
```http
GET /info/student
```
#### 参数
```json
token: cookie中存放的token
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code":20000,
    "res":[
        {
        "stu_id":"2014111634",
        "stu_name":"张三",
        "tel":"13555555555",
        "sex":1
        }
    ]
}
```

***
### 更新/新增/删除用户信息

#### 请求
```http
POST /student
```
#### 参数
```
{
    stu_id: 学号,
    data:{
        stu_name: 学生姓名,
        password: 密码,
        sex: 性别,
        tel: 手机号
    }
}
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code":20000,
    "msg":"更新成功"
}
```
***
### 验证密码
#### 请求
```http
GET /student/password
```
#### 参数
```json
login_id: 学号
password: 密码
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "msg": "校验成功"
}
```
***
***
### 获取用户列表
#### 请求
```http
GET /student
```
#### 参数
```json
limit: 查询条数
page: 查询页数
stu_id: 学号
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "msg": "用户列表",
    "data": [
        {
            "id": 1,
            "name": "张三三三三",
            "password": "213",
            "sex": 1,
            "room_id": 1,
            "role": 2,
            "isDel": "0",
            "tel": "1321",
            "room": "101"
        },
        {
            "id": 2,
            "name": "李四四四四",
            "password": "123",
            "sex": 1,
            "room_id": 2,
            "role": 1,
            "isDel": "0",
            "tel": "2132",
            "room": "102"
        }
    ]
}
```

***
***
## 社团信息
### 获取社团列表

#### 请求
```http
GET /community
```
#### 参数
```json
community_name: 社团名称
page: 页数  // 默认0
limit: 每页条数     //默认10
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
	"code": 20000,
	"msg": "社团列表",
	"data": [{
		"id": 1,
		"community_name": "天津财经大学社团联合会",
		"desp": "test",
		"belong_dept": 1,
		"manage_dept": 1,
		"chairman_stu_id": 2014111634,
		"type": "2",
		"create_time": "1136044800000",
		"status": 1,
		"stu_name": "test"
	}, {
		"id": 2,
		"community_name": "天津财经大学民乐团",
		"desp": null,
		"belong_dept": 1,
		"manage_dept": 2,
		"chairman_stu_id": 2014111634,
		"type": "2",
		"create_time": "978278400000",
		"status": 1,
		"stu_name": "test"
	}, {
		"id": 3,
		"community_name": "天津财经大学管弦乐团",
		"desp": null,
		"belong_dept": 1,
		"manage_dept": 1,
		"chairman_stu_id": 2014111634,
		"type": "2",
		"create_time": "978278400000",
		"status": 1,
		"stu_name": "test"
	}, {
		"id": 4,
		"community_name": "天津财经大学艺体团",
		"desp": "test",
		"belong_dept": 1,
		"manage_dept": 1,
		"chairman_stu_id": 2014111634,
		"type": "2",
		"create_time": "1544595711208",
		"status": 0,
		"stu_name": "test"
	}]
}
```
***
### 新增/编辑社团

#### 请求
```http
POST /community
```
#### 参数
```json
community_name: 社团名称
desp: 社团描述
belong_dept: 所属单位
manage_dept: 主管单位
chairman_stu_id: 会长学号
type: 分类
status：审核状态
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "msg": "更新成功"
}
```
***
***
### 获取部门列表

#### 请求
```http
GET /dept
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
	"code": 20000,
	"msg": "部门列表",
	"data": [{
		"id": 1,
		"dept_name": "学工部",
		"isDel": 0
	}, {
		"id": 2,
		"dept_name": "学工部艺术教育中心",
		"isDel": 0
	}]
}
```
***
### 获取社团成员

#### 请求
```http
GET /community/student
```
#### 参数
```
community_id: 社团id
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "msg": "社团成员",
    "data": [
        {
            "stu_id": "2014111634",
            "stu_name": "test",
            "tel": "13555555555",
            "role": 0
        }
    ]
}
```
***
### 更新社团成员

#### 请求
```http
POST /community/student
```
#### 参数
```
id: 记录id      // 有id为更新，没有id为新增
data: {
    isDel: 1或0
    // 其他参数暴露了接口，可以调用，但是页面没有实际操作
}
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "msg": "更新成功"
}
```
***
### 获取社团分类

#### 请求
```http
GET /community/type
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
	"code": 20000,
	"msg": "社团分类列表",
	"data": [{
		"id": 1,
		"type_name": "其他",
		"isDel": "0"
	}, {
		"id": 2,
		"type_name": "文艺",
		"isDel": "0"
	}]
}
```
***
### 更新社团分类

#### 请求
```http
POST /community/type
```
#### 参数
```
id: 分类id
data: {
    type_name: 分类名称
    isDel: 删除
}
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "msg": "修改成功/新增成功"
}
```
***
***
## 公告相关
### 获取公告

#### 请求
```http
GET /notice
```
#### 参数
```json
id: 公告id      // 传id为获取详情，不传id为获取列表
title: 公告标题     // 模糊查询
page: 页数   
limit: 每页条数
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
	"code": 20000,
	"msg": "公告",
	"data": [{
		"title": "公告测试",
		"author": "test",
		"create_time": "1545120330588"
	}, {
		"title": "test",
		"author": "test",
		"create_time": "1542955541456"
	}]
}

{
    "code": 20000,
    "msg": "公告",
    "data": [
        {
            "title": "test",
            "content": "<h1>test</h1>",
            "author": "test",
            "create_time": "1542955541456"
        }
    ]
}
```
***
### 新增/编辑公告

#### 请求
```http
POST /notice
```
#### 参数
```json
id: 公告id      // 有id为编辑，无id为新增
title: 标题
author: 作者
content: 内容
isDel: 删除
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "code": 20000,
    "msg": "更新成功"
}
```
***
### 上传图片

#### 请求
```http
POST /notice/upload
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
    "msg":"ok"
}
```
***
***

***
### 获取公告日志

#### 请求
```http
GET /notice/log
```
#### 参数
```json
notice_id: 公告id
start_time: 起始时间  // 默认七天前
end_time: 结束时间     // 默认当前时间
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{
	"code": 20000,
	"msg": "公告日志",
	"data": [{
		"title": "test",
		"author": "test",
		"create_time": "1542955541456",
		"stu_id": "2014111634",
		"stu_name": "test",
		"sex": 1
	}]
}
```
***
### 新增公告日志

#### 请求
```http
POST /notice/log
```
#### 参数
```json
notice_id: 公告id
stu_id: 学号
```
#### 响应
```json
HTTP/1.1 200 OK
Content-Type:application/json
{"code":20000,"msg":"logok"}