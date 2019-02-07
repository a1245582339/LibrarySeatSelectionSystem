'use strict'
const jwt = require('jsonwebtoken') // 引入jsonwebtoken

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.request.header.authorization) {
      const token = ctx.request.header.authorization.split(' ')[1];
      try {
        jwt.verify(token, 'secret');
        await next()
      } catch (err) {
        if (err.message === 'invalid token') {
          ctx.body = {
            code: 20001,
            message: '身份认证过期请重新登录!',
          }
          ctx.status = 401;
        } else {
          throw err
        }
      }
    } else {
      ctx.body = {
        code: 20001,
        message: '请登录!',
      }
      ctx.status = 401;
    }
  }
}

