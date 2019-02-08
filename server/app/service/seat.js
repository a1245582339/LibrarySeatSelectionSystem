'use strict';

const Service = require('egg').Service;
class Seat extends Service {
    async find(query) {
        const seat = await this.app.knex('seat')
            .select('id as seat_id', 'line', 'row', 'value')
            .where({library_id: query.library_id, isDel: 0})
        
        const order = seat.map(item => this.app.mysql.query(
            'select `id` as `order_id`, `create_time`, `start_time`, `end_time`, `status` from `order` where `seat_id` = ? and `status` in(1, 2) and ((`start_time` < ? and `end_time` > ?) or (`start_time` > ? and `start_time` < ?) or (`end_time` > ? and `end_time` < ?) or (`start_time` = ? and `start_time` = ?) or (`start_time` > ? and `start_time` < ?))'
            , [item.seat_id, query.start_time, query.end_time, query.start_time, query.end_time, query.start_time, query.end_time, query.start_time, query.end_time, query.start_time, query.end_time]
            ))
        /* 
        五种情况 
            表中    |----------|

            1.         |---|               表中时间段包含传入时间段
            2.   |-------|                 表中开始时间在传入时间段之间
            3.            |-------|        表中结束时间在传入时间段之间
            4.      |----------|           完全相等
            5.   |------------------|      传入时间段包含表中时间段
        */
        for(let i = 0; i < order.length; i++) {
            seat[i] = { ...seat[i], ...(await order[i])[0] }
        }
        return seat
    }

    async update(library_id, data) {
        await this.app.knex('seat')
            .update({isDel: 1})
            .where('id', library_id)
        const insertCal = await this.app.knex.insert(data).into('seat')
        return insertCal === 1
    }
}

module.exports = Seat;