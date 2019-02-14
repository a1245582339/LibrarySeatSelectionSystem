'use strict';

const Service = require('egg').Service;
class University extends Service {
    async find(query, page, limit) {
        const data = await this.app.knex('university')
            .select('id', 'name')
            .where('name', 'like', `%${query}%`)
            .where({ isDel: 0 })
            .offset(page * limit)
            .limit(limit || 10)
        const total = (await this.app.knex('university')
                            .count('*')
                            .where('name', 'like', `%${query}%`)
                            .where({ isDel: 0 }))[0]["count(*)"]
        return { data, total }
    }

    async update(id, data) {
        const updateCal = await this.app.knex('university')
          .update(data)
          .where('id', id)
        return updateCal === 1
    }

    async create(data) {
        const updateCal = await this.app.knex.insert(data).into('university')
        return updateCal === 1
    }
}

module.exports = University;