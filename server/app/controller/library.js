'use strict';

const Controller = require('egg').Controller;

class Library extends Controller {
    async getLibrary() {
        const ctx = this.ctx;
        const {id} = ctx.request.query
        const query = id ? { 'university.id': id } : {}
        const data = await ctx.service.library.find(query)
        this.ctx.body = { code: 20000, msg: '自习室列表', ...data }
    }

    async updatelibrary() {
        const ctx = this.ctx;
        const {id} = ctx.request.query
        const {data} = ctx.request.body
        if (id) {
            await ctx.service.library.update(id, data)
        } else {
            await ctx.service.library.create(data)
        }
        this.ctx.body = { code: 20000, msg: '更新成功' }
    }

}

module.exports = Library