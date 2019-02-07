'use strict';

const Service = require('egg').Service;
class Library extends Service {
    async find(query) {
        const list = await this.app.knex('library')
            .select('library.id', 'library.name', 'library.university_id', 'university.name')
            .leftJoin('university', 'university.id', 'library.university_id')
            .leftJoin('seat', 'seat.library_id', 'library.id')
            .where({...query, 'university.isDel': 0, 'library.isDel': 0, 'seat.value': 1 })

        const total = (await this.app.knex('library')
                            .count('*')
                            .where({ id: query['university.id'], isDel: 0 }))[0]["count(*)"]

        const timestamp = Date.now()

        const seatStatus = list.map(item => this.app.knex('order').select('id').where({seat_id: item.id}).where('start_time', '<', timestamp).andWhere('end_time', '>', timestamp))  
        // 返回的每一项都是一个promise pending，等待结束之后如果这个座有人，数组长度是1，没人长度是0
        for(let i = 0; i < seatStatus.length; i++) {
            // 循环中await，解决await并发问题，尽量减少循环体中的同步操作
            list[i].seat_status = (await seatStatus[i]).length ? true : false     // 1为该座现在为被占状态，0为没人
        }
        const data = list.reduce((total, curr) => {
            const index = total.findIndex(item => item.id === curr.id)
            if (index > -1) {
                // 如果已存在，则在总数+1，如果可用，则可用数+1
                total[index].total_seat_count++
                curr.seat_status ? total[index].available_seat_count : total[index].available_seat_count++
                return total
            } else {
                // 不存在，则总数=1，后面同上
                let i = { ...curr }
                i.total_seat_count = 1
                curr.seat_status ? i.available_seat_count = 0 : i.available_seat_count = 1
                delete i.seat_status    // 把这个没用的字段删掉
                return [...total, i]
            }
        }, [])
        return { data, total }
    }

    async update(id, data) {
        const updateCal = await this.app.knex('library')
          .update(data)
          .where('id', id)
        return updateCal === 1
    }

    async create(data) {
        const insertCal = await this.app.knex.insert(data).into('library')
        return insertCal === 1
    }
}

module.exports = Library;