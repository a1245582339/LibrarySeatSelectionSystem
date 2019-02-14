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
        const {data, seat} = ctx.request.body
        if (id) {
            await ctx.service.library.update(id, data)
        } else {
            const library_id = await ctx.service.library.create(data)
            const seatData = seat.reduce((total, curr, index) => {
                const line = index
                const seatArr = curr.row.map((item, _index) => {
                    return { line, library_id, row: _index, value: item.value}
                })
                return [...total, ...seatArr]
            }, [])
            await this.ctx.service.seat.update(library_id, seatData)
        }
        this.ctx.body = { code: 20000, msg: '更新成功' }
    }

}

module.exports = Library