'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 管理员登录校验
  router.post('/api/admin/login', controller.admin.login);
  // 管理员获取用户信息
  router.get('/api/admin/info', controller.admin.getUserInfo);

  // 获取管理员列表
  router.get('/api/admin', controller.admin.getUserList)
  // 验证管理员密码
  router.get('/api/admin/password', controller.admin.checkPassword)
  // 更新管理员信息
  router.post('/api/admin', controller.admin.updateAdmin);

  // 学生登录校验
  router.post('/api/student/login', controller.student.login);
  // 学生获取用户信息
  router.get('/api/student/info', controller.student.getUserInfo);

  // 获取学生列表
  router.get('/api/student', controller.student.getStudent)
  // 验证学生密码
  router.get('/api/student/password', controller.student.checkPassword)
  // 更新学生信息
  router.post('/api/student', controller.student.updateStu);

  // 获取学校列表/查询学校
  router.get('/api/university', controller.university.getUniversity)
  // 新增/更新学校
  router.post('/api/university', controller.university.updateUniversity)

  // 获取学校列表/查询学校
  router.get('/api/university', controller.university.getUniversity)
  // 新增/更新学校
  router.post('/api/university', controller.university.updateUniversity)

  // 获取自习室
  router.get('/api/library', controller.library.getLibrary)
  // 新增自习室
  router.post('/api/library', controller.library.updatelibrary)

  // 获取座位
  router.get('/api/seat', controller.seat.getSeat)
  // 更新座位
  router.post('/api/seat', controller.seat.updateSeat)

  // 获取订单
  router.get('/api/order', controller.order.getOrder)
  // 更新订单
  router.post('/api/order', controller.order.updateOrder)
  
};
