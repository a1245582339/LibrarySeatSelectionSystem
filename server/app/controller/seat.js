'use strict';

const Controller = require('egg').Controller;

class Seat extends Controller {
    async getSeat() {
        const ctx = this.ctx
        const query = ctx.request.query // library的id，查询的时间段
        const seat = await ctx.service.seat.find(query)
        const data = seat.reduce((total, curr) => {
            const index = total.findIndex((_, index) => index === curr.line)
            let { seat_id, value, start_time, end_time, create_time, status, order_id } = curr
            if (index > -1) {
                start_time ? value = 2 : value      // 如果这个地方被预约了，就置为2，前端变为不可选
                total[index].row.push({ seat_id, value, start_time, end_time, create_time, status, order_id })
                return total
            } else {
                return [ ...total, { row: [{ seat_id, value, start_time, end_time, create_time, status, order_id }] } ]
            }
        }, []) 
        ctx.body = { code: 20000, msg: '座位', data }
    }

    async updateSeat() {
        const ctx = this.ctx
        const { library_id } = ctx.request.query
        const { data } = ctx.request.body
        const seat = data.reduce((total, curr, index) => {
            const line = index
            const seatArr = curr.row.map((item, _index) => {
                return { line, library_id, row: _index, value: item.value}
            })
            return [...total, ...seatArr]
        }, [])
        await this.ctx.service.seat.update(library_id, seat)
        ctx.body = { code: 20000, msg: '更新成功' }
    }
}

module.exports = Seat