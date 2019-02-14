'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class Admin extends Controller {
  async login() {
    const ctx = this.ctx;
    const { login_name, password } = ctx.request.body
    const res = await ctx.service.admin.find({ login_name, password })
    if (res.length) {
      const token = jwt.sign({
        login_name,
        password,
      }, 'secret', { expiresIn: '604800s' })
      ctx.body = { code: 20000, token }
    } else {
      ctx.body = { code: 20002, msg: '用户名密码错误！' }
    }
  }

  async getUserInfo() {
    const ctx = this.ctx;
    console.log(jwt.verify(ctx.request.header.authorization.split(' ')[1], 'secret'))
    const { login_name, password } = jwt.verify(ctx.request.header.authorization.split(' ')[1], 'secret');
    const res = await ctx.service.admin.find({ login_name, password })
    if (res.length) {
      ctx.body = { code: 20000, data: res[0] }
    } else {
      ctx.status = 401
      ctx.body = { code: 20001, msg: '用户失效，请重新登录！' }
    }
  }

  async getUserList() {
    const ctx = this.ctx;
    const query = ctx.request.query
    const data = await ctx.service.admin.find(query)
    ctx.body = {
      code: 20000,
      data,
      msg: '管理员列表',
    }
  }

  async updateAdmin() {
    const ctx = this.ctx;
    const { id } = ctx.request.query
    const { data } = ctx.request.body;
    if (id) {
      await ctx.service.admin.update(id, data)
      ctx.body = { code: 20000, msg: '更新成功' }
    } else {
      const isExsit = (await ctx.service.admin.find({ login_name: data.login_name })).length
      if (isExsit) {
        ctx.body = { code: 20003, msg: '用户名已存在，新增失败！' }
      } else {
        await ctx.service.admin.create({...data, role: 2})
        ctx.body = { code: 20000, msg: '新增成功' }
      }
    }
  }

  async checkPassword() {
    const ctx = this.ctx;
    const { login_name, password } = ctx.request.query;
    const res = await ctx.service.admin.find({ login_name, password })
    if (res.length) {
      ctx.body = { code: 20000, msg: '校验成功' }
    } else {
      ctx.body = { code: 20004, msg: '校验失败' }
    }
  }
}

module.exports = Admin;
