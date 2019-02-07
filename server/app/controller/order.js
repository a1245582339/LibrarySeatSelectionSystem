'use strict';

const Controller = require('egg').Controller;
class Order extends Controller {
    async getOrder() {
        const ctx = this.ctx
        const query = ctx.request.query
        const data = await ctx.service.find(query)
        ctx.body = { code: 20000, data: data, msg: '订单' }
    }

    async updateOrder() {
        const ctx = this.ctx;
        const { id } = ctx.request.query
        const { data } = ctx.request.body;
        if (id) {
            await ctx.service.order.update(id, data)
            ctx.body = { code: 20000, msg: '更新成功' }
        } else {
            await ctx.service.order.create(data)
            ctx.body = { code: 20000, msg: '新增成功' }
        }
      }
}
module.exports = Order