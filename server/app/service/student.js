'use strict';

const Service = require('egg').Service;

class Student extends Service {
  async findStu(query, page, limit) {
    const stu = await this.app.knex('student')
      .where({...query, isDel: 0})
      .select('id', 'name', 'tel', 'sex')
      .leftJoin('university', 'student.university_id', 'university.id')
      .offset(page * limit || 0)
      .limit(limit || 10)
      .orderBy('id')
    return stu
  }

  async update(id, data) {
    const updateStu = await this.app.knex('student')
      .update(data)
      .where({ id })
    return updateStu === 1
  }
}

module.exports = Student