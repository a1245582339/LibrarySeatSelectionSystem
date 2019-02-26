'use strict';

const Controller = require('egg').Controller;
class Order extends Controller {
    async getOrder() {
        const ctx = this.ctx
        const { stu_id } = ctx.request.query

        const data = await ctx.service.order.find({stu_id})
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
            if ((await ctx.service.order.checkOrderExist(data)).length) {
                ctx.body = { code: 20005, msg: '该时间段已存在有效预约,请选择其他时间段!' }
            } else {
                await ctx.service.order.create({...data, create_time: Date.now()})
                ctx.body = { code: 20000, msg: '新增成功' }
            }
            
        }
      }
}
module.exports = Order