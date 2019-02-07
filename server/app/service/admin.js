'use strict';

const Service = require('egg').Service;

class Admin extends Service {

  async find(query) {
    const admin = await this.app.knex.select('id', 'login_name', 'role').from('admin')
      .where({
        ...query,
        isDel: 0,
      })
    return admin;
  }

  async update(id, data) {
    const updateAdmin = await this.app.knex('admin')
      .update(data)
      .where('id', id)
    return updateAdmin === 1
  }

  async create(data) {
    const createAdmin = await this.app.knex
      .insert(data)
      .into('admin')
    return createAdmin === 1
  }
}

module.exports = Admin;
