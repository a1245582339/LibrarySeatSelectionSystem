'use strict';

const Service = require('egg').Service;
class Order extends Service {
    async find(query) {
        const data = await this.app.knex('order')
            .select('order.*', 'student.name', 'seat.row', 'seat.line', 'seat.library_id', 'library.name')
            .leftJoin('student', 'student.id', 'order.stu_id')
            .leftJoin('seat', 'seat.id', 'order.seat_id')
            .leftJoin('library', 'seat.library_id', 'library.id')
            .where({stu_id: query.stu_id})
            .andWhere('start_time', '<', query.start_time)
            .andWhere('end_time', '<', query.end_time)
        return data
    }
    
    async update(id, data) {
        const update = await this.app.knex('order')
            .update(data)
            .where('id', id)
      return update === 1
    }
    async create(data) {
        const create = await this.app.knex
          .insert(data)
          .into('order')
        return create === 1
    }
}

module.exports = Order;