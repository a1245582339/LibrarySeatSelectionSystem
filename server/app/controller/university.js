'use strict';

const Controller = require('egg').Controller;

class University extends Controller {
    async getUniversity() {
        const ctx = this.ctx;
        const {name} = ctx.request.query
        const page = ctx.request.query.page - 1 || 0
        const limit = ctx.request.query.limit || 10
        const data = await ctx.service.university.find(name, page, limit)
        this.ctx.body = { code: 20000, msg: '大学列表', ...data }
    }

    async updateUniversity() {
        const ctx = this.ctx;
        const id = ctx.request.query.id
        const data = ctx.request.body.data
        if (id && id !== 'undefined') {
            const uni = await ctx.service.university.find(data.name)
            if (uni.data.length && uni.data[0].id !== id && uni.data[0].name === data.name) {
                this.ctx.body = { code: 20005, msg: '已有同名学校，请重新编辑！' }
                return false
            } else {
                await ctx.service.university.update(id, data)
            }
        } else {
            const uni = await ctx.service.university.find(data.name)
            if (uni.data.length) {
                this.ctx.body = { code: 20005, msg: '已有同名学校，请重新编辑！' }
                return false
            } else {
                await ctx.service.university.create(data)
            }
            
        }
        this.ctx.body = { code: 20000, msg: '更新成功' }
    }

}

module.exports = University