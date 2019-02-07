'use strict';

const Controller = require('egg').Controller;

class University extends Controller {
    async getUniversity() {
        const ctx = this.ctx;
        const {name} = ctx.request.query
        const {page, limit} = ctx.request.query
        const data = await ctx.service.university.find(name, page, limit)
        this.ctx.body = { code: 20000, msg: '大学列表', ...data }
    }

    async updateUniversity() {
        const ctx = this.ctx;
        const id = ctx.request.query.id
        const data = ctx.request.body.data
        if (id) {
            await ctx.service.university.update(id, data)
        } else {
            await ctx.service.university.create(data)
        }
        this.ctx.body = { code: 20000, msg: '更新成功' }
    }

}

module.exports = University