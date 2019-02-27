/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : library_seat_selecton

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 27/02/2019 09:44:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` int(11) NOT NULL COMMENT '1: 超级管理员\r\n2: 管理员\r\n',
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'qqqqqq', 1, 0);
INSERT INTO `admin` VALUES (2, 'editor', '111111', 1, 0);
INSERT INTO `admin` VALUES (3, 'test1', 'aaaaaa', 2, 0);
INSERT INTO `admin` VALUES (4, 'edit11', 'aaaaaa', 2, 1);

-- ----------------------------
-- Table structure for library
-- ----------------------------
DROP TABLE IF EXISTS `library`;
CREATE TABLE `library`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `university_id` int(11) NOT NULL COMMENT '学校/机构id',
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of library
-- ----------------------------
INSERT INTO `library` VALUES (1, 'H座自习室', 1, 0);
INSERT INTO `library` VALUES (7, '图书馆', 2, 0);

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seat_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `start_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `end_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0：已取消\r\n1：已预定\r\n2：已签到\r\n',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, 1049, 2015111654, '1549174938000', '1551161210104', '1551164810105', 1);
INSERT INTO `order` VALUES (5, 756, 1, '1551168075608', '1551168066762', '1551171666762', 1);
INSERT INTO `order` VALUES (6, 797, 1, '1551175834299', '1551175824747', '1551194424747', 0);
INSERT INTO `order` VALUES (7, 756, 1, '1551177336068', '1551177324779', '1551180924779', 0);
INSERT INTO `order` VALUES (8, 742, 1, '1551179528844', '1551179513706', '1551183113706', 0);
INSERT INTO `order` VALUES (9, 743, 1, '1551179561045', '1551193933696', '1551194053696', 0);
INSERT INTO `order` VALUES (10, 889, 1, '1551181611733', '1551181485053', '1551185085053', 0);

-- ----------------------------
-- Table structure for seat
-- ----------------------------
DROP TABLE IF EXISTS `seat`;
CREATE TABLE `seat`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `library_id` int(11) NOT NULL,
  `line` int(11) NOT NULL COMMENT '行',
  `row` int(11) NOT NULL COMMENT '列',
  `value` int(11) NOT NULL COMMENT '0：无座\r\n1：有座',
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1051 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of seat
-- ----------------------------
INSERT INTO `seat` VALUES (417, 7, 0, 0, 1, 0);
INSERT INTO `seat` VALUES (418, 7, 0, 1, 0, 0);
INSERT INTO `seat` VALUES (419, 7, 1, 0, 0, 0);
INSERT INTO `seat` VALUES (420, 7, 1, 1, 1, 0);
INSERT INTO `seat` VALUES (736, 1, 0, 0, 1, 0);
INSERT INTO `seat` VALUES (737, 1, 0, 1, 1, 0);
INSERT INTO `seat` VALUES (738, 1, 0, 2, 1, 0);
INSERT INTO `seat` VALUES (739, 1, 0, 3, 1, 0);
INSERT INTO `seat` VALUES (740, 1, 0, 4, 1, 0);
INSERT INTO `seat` VALUES (741, 1, 0, 5, 1, 0);
INSERT INTO `seat` VALUES (742, 1, 0, 6, 1, 0);
INSERT INTO `seat` VALUES (743, 1, 0, 7, 1, 0);
INSERT INTO `seat` VALUES (744, 1, 0, 8, 1, 0);
INSERT INTO `seat` VALUES (745, 1, 0, 9, 1, 0);
INSERT INTO `seat` VALUES (746, 1, 0, 10, 1, 0);
INSERT INTO `seat` VALUES (747, 1, 0, 11, 1, 0);
INSERT INTO `seat` VALUES (748, 1, 0, 12, 1, 0);
INSERT INTO `seat` VALUES (749, 1, 0, 13, 1, 0);
INSERT INTO `seat` VALUES (750, 1, 0, 14, 1, 0);
INSERT INTO `seat` VALUES (751, 1, 0, 15, 1, 0);
INSERT INTO `seat` VALUES (752, 1, 0, 16, 1, 0);
INSERT INTO `seat` VALUES (753, 1, 0, 17, 1, 0);
INSERT INTO `seat` VALUES (754, 1, 0, 18, 1, 0);
INSERT INTO `seat` VALUES (755, 1, 0, 19, 1, 0);
INSERT INTO `seat` VALUES (756, 1, 0, 20, 1, 0);
INSERT INTO `seat` VALUES (757, 1, 1, 0, 0, 0);
INSERT INTO `seat` VALUES (758, 1, 1, 1, 0, 0);
INSERT INTO `seat` VALUES (759, 1, 1, 2, 0, 0);
INSERT INTO `seat` VALUES (760, 1, 1, 3, 0, 0);
INSERT INTO `seat` VALUES (761, 1, 1, 4, 0, 0);
INSERT INTO `seat` VALUES (762, 1, 1, 5, 0, 0);
INSERT INTO `seat` VALUES (763, 1, 1, 6, 0, 0);
INSERT INTO `seat` VALUES (764, 1, 1, 7, 0, 0);
INSERT INTO `seat` VALUES (765, 1, 1, 8, 0, 0);
INSERT INTO `seat` VALUES (766, 1, 1, 9, 0, 0);
INSERT INTO `seat` VALUES (767, 1, 1, 10, 0, 0);
INSERT INTO `seat` VALUES (768, 1, 1, 11, 0, 0);
INSERT INTO `seat` VALUES (769, 1, 1, 12, 0, 0);
INSERT INTO `seat` VALUES (770, 1, 1, 13, 0, 0);
INSERT INTO `seat` VALUES (771, 1, 1, 14, 0, 0);
INSERT INTO `seat` VALUES (772, 1, 1, 15, 0, 0);
INSERT INTO `seat` VALUES (773, 1, 1, 16, 0, 0);
INSERT INTO `seat` VALUES (774, 1, 1, 17, 0, 0);
INSERT INTO `seat` VALUES (775, 1, 1, 18, 0, 0);
INSERT INTO `seat` VALUES (776, 1, 1, 19, 0, 0);
INSERT INTO `seat` VALUES (777, 1, 1, 20, 0, 0);
INSERT INTO `seat` VALUES (778, 1, 2, 0, 1, 0);
INSERT INTO `seat` VALUES (779, 1, 2, 1, 1, 0);
INSERT INTO `seat` VALUES (780, 1, 2, 2, 1, 0);
INSERT INTO `seat` VALUES (781, 1, 2, 3, 1, 0);
INSERT INTO `seat` VALUES (782, 1, 2, 4, 1, 0);
INSERT INTO `seat` VALUES (783, 1, 2, 5, 1, 0);
INSERT INTO `seat` VALUES (784, 1, 2, 6, 1, 0);
INSERT INTO `seat` VALUES (785, 1, 2, 7, 1, 0);
INSERT INTO `seat` VALUES (786, 1, 2, 8, 1, 0);
INSERT INTO `seat` VALUES (787, 1, 2, 9, 1, 0);
INSERT INTO `seat` VALUES (788, 1, 2, 10, 0, 0);
INSERT INTO `seat` VALUES (789, 1, 2, 11, 1, 0);
INSERT INTO `seat` VALUES (790, 1, 2, 12, 1, 0);
INSERT INTO `seat` VALUES (791, 1, 2, 13, 1, 0);
INSERT INTO `seat` VALUES (792, 1, 2, 14, 1, 0);
INSERT INTO `seat` VALUES (793, 1, 2, 15, 1, 0);
INSERT INTO `seat` VALUES (794, 1, 2, 16, 1, 0);
INSERT INTO `seat` VALUES (795, 1, 2, 17, 1, 0);
INSERT INTO `seat` VALUES (796, 1, 2, 18, 1, 0);
INSERT INTO `seat` VALUES (797, 1, 2, 19, 1, 0);
INSERT INTO `seat` VALUES (798, 1, 2, 20, 1, 0);
INSERT INTO `seat` VALUES (799, 1, 3, 0, 1, 0);
INSERT INTO `seat` VALUES (800, 1, 3, 1, 0, 0);
INSERT INTO `seat` VALUES (801, 1, 3, 2, 0, 0);
INSERT INTO `seat` VALUES (802, 1, 3, 3, 0, 0);
INSERT INTO `seat` VALUES (803, 1, 3, 4, 0, 0);
INSERT INTO `seat` VALUES (804, 1, 3, 5, 0, 0);
INSERT INTO `seat` VALUES (805, 1, 3, 6, 0, 0);
INSERT INTO `seat` VALUES (806, 1, 3, 7, 0, 0);
INSERT INTO `seat` VALUES (807, 1, 3, 8, 0, 0);
INSERT INTO `seat` VALUES (808, 1, 3, 9, 0, 0);
INSERT INTO `seat` VALUES (809, 1, 3, 10, 0, 0);
INSERT INTO `seat` VALUES (810, 1, 3, 11, 0, 0);
INSERT INTO `seat` VALUES (811, 1, 3, 12, 0, 0);
INSERT INTO `seat` VALUES (812, 1, 3, 13, 0, 0);
INSERT INTO `seat` VALUES (813, 1, 3, 14, 0, 0);
INSERT INTO `seat` VALUES (814, 1, 3, 15, 0, 0);
INSERT INTO `seat` VALUES (815, 1, 3, 16, 0, 0);
INSERT INTO `seat` VALUES (816, 1, 3, 17, 0, 0);
INSERT INTO `seat` VALUES (817, 1, 3, 18, 0, 0);
INSERT INTO `seat` VALUES (818, 1, 3, 19, 0, 0);
INSERT INTO `seat` VALUES (819, 1, 3, 20, 1, 0);
INSERT INTO `seat` VALUES (820, 1, 4, 0, 1, 0);
INSERT INTO `seat` VALUES (821, 1, 4, 1, 0, 0);
INSERT INTO `seat` VALUES (822, 1, 4, 2, 1, 0);
INSERT INTO `seat` VALUES (823, 1, 4, 3, 0, 0);
INSERT INTO `seat` VALUES (824, 1, 4, 4, 1, 0);
INSERT INTO `seat` VALUES (825, 1, 4, 5, 1, 0);
INSERT INTO `seat` VALUES (826, 1, 4, 6, 1, 0);
INSERT INTO `seat` VALUES (827, 1, 4, 7, 0, 0);
INSERT INTO `seat` VALUES (828, 1, 4, 8, 1, 0);
INSERT INTO `seat` VALUES (829, 1, 4, 9, 0, 0);
INSERT INTO `seat` VALUES (830, 1, 4, 10, 0, 0);
INSERT INTO `seat` VALUES (831, 1, 4, 11, 0, 0);
INSERT INTO `seat` VALUES (832, 1, 4, 12, 1, 0);
INSERT INTO `seat` VALUES (833, 1, 4, 13, 0, 0);
INSERT INTO `seat` VALUES (834, 1, 4, 14, 1, 0);
INSERT INTO `seat` VALUES (835, 1, 4, 15, 1, 0);
INSERT INTO `seat` VALUES (836, 1, 4, 16, 1, 0);
INSERT INTO `seat` VALUES (837, 1, 4, 17, 0, 0);
INSERT INTO `seat` VALUES (838, 1, 4, 18, 1, 0);
INSERT INTO `seat` VALUES (839, 1, 4, 19, 0, 0);
INSERT INTO `seat` VALUES (840, 1, 4, 20, 1, 0);
INSERT INTO `seat` VALUES (841, 1, 5, 0, 1, 0);
INSERT INTO `seat` VALUES (842, 1, 5, 1, 0, 0);
INSERT INTO `seat` VALUES (843, 1, 5, 2, 1, 0);
INSERT INTO `seat` VALUES (844, 1, 5, 3, 1, 0);
INSERT INTO `seat` VALUES (845, 1, 5, 4, 0, 0);
INSERT INTO `seat` VALUES (846, 1, 5, 5, 0, 0);
INSERT INTO `seat` VALUES (847, 1, 5, 6, 0, 0);
INSERT INTO `seat` VALUES (848, 1, 5, 7, 1, 0);
INSERT INTO `seat` VALUES (849, 1, 5, 8, 1, 0);
INSERT INTO `seat` VALUES (850, 1, 5, 9, 0, 0);
INSERT INTO `seat` VALUES (851, 1, 5, 10, 0, 0);
INSERT INTO `seat` VALUES (852, 1, 5, 11, 0, 0);
INSERT INTO `seat` VALUES (853, 1, 5, 12, 1, 0);
INSERT INTO `seat` VALUES (854, 1, 5, 13, 1, 0);
INSERT INTO `seat` VALUES (855, 1, 5, 14, 0, 0);
INSERT INTO `seat` VALUES (856, 1, 5, 15, 0, 0);
INSERT INTO `seat` VALUES (857, 1, 5, 16, 0, 0);
INSERT INTO `seat` VALUES (858, 1, 5, 17, 1, 0);
INSERT INTO `seat` VALUES (859, 1, 5, 18, 1, 0);
INSERT INTO `seat` VALUES (860, 1, 5, 19, 0, 0);
INSERT INTO `seat` VALUES (861, 1, 5, 20, 1, 0);
INSERT INTO `seat` VALUES (862, 1, 6, 0, 1, 0);
INSERT INTO `seat` VALUES (863, 1, 6, 1, 0, 0);
INSERT INTO `seat` VALUES (864, 1, 6, 2, 1, 0);
INSERT INTO `seat` VALUES (865, 1, 6, 3, 1, 0);
INSERT INTO `seat` VALUES (866, 1, 6, 4, 0, 0);
INSERT INTO `seat` VALUES (867, 1, 6, 5, 0, 0);
INSERT INTO `seat` VALUES (868, 1, 6, 6, 0, 0);
INSERT INTO `seat` VALUES (869, 1, 6, 7, 1, 0);
INSERT INTO `seat` VALUES (870, 1, 6, 8, 1, 0);
INSERT INTO `seat` VALUES (871, 1, 6, 9, 0, 0);
INSERT INTO `seat` VALUES (872, 1, 6, 10, 0, 0);
INSERT INTO `seat` VALUES (873, 1, 6, 11, 0, 0);
INSERT INTO `seat` VALUES (874, 1, 6, 12, 1, 0);
INSERT INTO `seat` VALUES (875, 1, 6, 13, 1, 0);
INSERT INTO `seat` VALUES (876, 1, 6, 14, 0, 0);
INSERT INTO `seat` VALUES (877, 1, 6, 15, 0, 0);
INSERT INTO `seat` VALUES (878, 1, 6, 16, 0, 0);
INSERT INTO `seat` VALUES (879, 1, 6, 17, 1, 0);
INSERT INTO `seat` VALUES (880, 1, 6, 18, 1, 0);
INSERT INTO `seat` VALUES (881, 1, 6, 19, 0, 0);
INSERT INTO `seat` VALUES (882, 1, 6, 20, 1, 0);
INSERT INTO `seat` VALUES (883, 1, 7, 0, 1, 0);
INSERT INTO `seat` VALUES (884, 1, 7, 1, 0, 0);
INSERT INTO `seat` VALUES (885, 1, 7, 2, 1, 0);
INSERT INTO `seat` VALUES (886, 1, 7, 3, 0, 0);
INSERT INTO `seat` VALUES (887, 1, 7, 4, 1, 0);
INSERT INTO `seat` VALUES (888, 1, 7, 5, 1, 0);
INSERT INTO `seat` VALUES (889, 1, 7, 6, 1, 0);
INSERT INTO `seat` VALUES (890, 1, 7, 7, 0, 0);
INSERT INTO `seat` VALUES (891, 1, 7, 8, 1, 0);
INSERT INTO `seat` VALUES (892, 1, 7, 9, 0, 0);
INSERT INTO `seat` VALUES (893, 1, 7, 10, 0, 0);
INSERT INTO `seat` VALUES (894, 1, 7, 11, 0, 0);
INSERT INTO `seat` VALUES (895, 1, 7, 12, 1, 0);
INSERT INTO `seat` VALUES (896, 1, 7, 13, 0, 0);
INSERT INTO `seat` VALUES (897, 1, 7, 14, 1, 0);
INSERT INTO `seat` VALUES (898, 1, 7, 15, 1, 0);
INSERT INTO `seat` VALUES (899, 1, 7, 16, 1, 0);
INSERT INTO `seat` VALUES (900, 1, 7, 17, 0, 0);
INSERT INTO `seat` VALUES (901, 1, 7, 18, 1, 0);
INSERT INTO `seat` VALUES (902, 1, 7, 19, 0, 0);
INSERT INTO `seat` VALUES (903, 1, 7, 20, 1, 0);
INSERT INTO `seat` VALUES (904, 1, 8, 0, 1, 0);
INSERT INTO `seat` VALUES (905, 1, 8, 1, 0, 0);
INSERT INTO `seat` VALUES (906, 1, 8, 2, 0, 0);
INSERT INTO `seat` VALUES (907, 1, 8, 3, 0, 0);
INSERT INTO `seat` VALUES (908, 1, 8, 4, 0, 0);
INSERT INTO `seat` VALUES (909, 1, 8, 5, 0, 0);
INSERT INTO `seat` VALUES (910, 1, 8, 6, 0, 0);
INSERT INTO `seat` VALUES (911, 1, 8, 7, 0, 0);
INSERT INTO `seat` VALUES (912, 1, 8, 8, 0, 0);
INSERT INTO `seat` VALUES (913, 1, 8, 9, 0, 0);
INSERT INTO `seat` VALUES (914, 1, 8, 10, 0, 0);
INSERT INTO `seat` VALUES (915, 1, 8, 11, 0, 0);
INSERT INTO `seat` VALUES (916, 1, 8, 12, 0, 0);
INSERT INTO `seat` VALUES (917, 1, 8, 13, 0, 0);
INSERT INTO `seat` VALUES (918, 1, 8, 14, 0, 0);
INSERT INTO `seat` VALUES (919, 1, 8, 15, 0, 0);
INSERT INTO `seat` VALUES (920, 1, 8, 16, 0, 0);
INSERT INTO `seat` VALUES (921, 1, 8, 17, 0, 0);
INSERT INTO `seat` VALUES (922, 1, 8, 18, 0, 0);
INSERT INTO `seat` VALUES (923, 1, 8, 19, 0, 0);
INSERT INTO `seat` VALUES (924, 1, 8, 20, 1, 0);
INSERT INTO `seat` VALUES (925, 1, 9, 0, 0, 0);
INSERT INTO `seat` VALUES (926, 1, 9, 1, 0, 0);
INSERT INTO `seat` VALUES (927, 1, 9, 2, 0, 0);
INSERT INTO `seat` VALUES (928, 1, 9, 3, 0, 0);
INSERT INTO `seat` VALUES (929, 1, 9, 4, 0, 0);
INSERT INTO `seat` VALUES (930, 1, 9, 5, 0, 0);
INSERT INTO `seat` VALUES (931, 1, 9, 6, 0, 0);
INSERT INTO `seat` VALUES (932, 1, 9, 7, 0, 0);
INSERT INTO `seat` VALUES (933, 1, 9, 8, 0, 0);
INSERT INTO `seat` VALUES (934, 1, 9, 9, 0, 0);
INSERT INTO `seat` VALUES (935, 1, 9, 10, 0, 0);
INSERT INTO `seat` VALUES (936, 1, 9, 11, 0, 0);
INSERT INTO `seat` VALUES (937, 1, 9, 12, 0, 0);
INSERT INTO `seat` VALUES (938, 1, 9, 13, 0, 0);
INSERT INTO `seat` VALUES (939, 1, 9, 14, 0, 0);
INSERT INTO `seat` VALUES (940, 1, 9, 15, 0, 0);
INSERT INTO `seat` VALUES (941, 1, 9, 16, 0, 0);
INSERT INTO `seat` VALUES (942, 1, 9, 17, 0, 0);
INSERT INTO `seat` VALUES (943, 1, 9, 18, 0, 0);
INSERT INTO `seat` VALUES (944, 1, 9, 19, 0, 0);
INSERT INTO `seat` VALUES (945, 1, 9, 20, 0, 0);
INSERT INTO `seat` VALUES (946, 1, 10, 0, 1, 0);
INSERT INTO `seat` VALUES (947, 1, 10, 1, 0, 0);
INSERT INTO `seat` VALUES (948, 1, 10, 2, 0, 0);
INSERT INTO `seat` VALUES (949, 1, 10, 3, 0, 0);
INSERT INTO `seat` VALUES (950, 1, 10, 4, 0, 0);
INSERT INTO `seat` VALUES (951, 1, 10, 5, 0, 0);
INSERT INTO `seat` VALUES (952, 1, 10, 6, 0, 0);
INSERT INTO `seat` VALUES (953, 1, 10, 7, 0, 0);
INSERT INTO `seat` VALUES (954, 1, 10, 8, 0, 0);
INSERT INTO `seat` VALUES (955, 1, 10, 9, 0, 0);
INSERT INTO `seat` VALUES (956, 1, 10, 10, 0, 0);
INSERT INTO `seat` VALUES (957, 1, 10, 11, 0, 0);
INSERT INTO `seat` VALUES (958, 1, 10, 12, 0, 0);
INSERT INTO `seat` VALUES (959, 1, 10, 13, 0, 0);
INSERT INTO `seat` VALUES (960, 1, 10, 14, 0, 0);
INSERT INTO `seat` VALUES (961, 1, 10, 15, 0, 0);
INSERT INTO `seat` VALUES (962, 1, 10, 16, 0, 0);
INSERT INTO `seat` VALUES (963, 1, 10, 17, 0, 0);
INSERT INTO `seat` VALUES (964, 1, 10, 18, 0, 0);
INSERT INTO `seat` VALUES (965, 1, 10, 19, 0, 0);
INSERT INTO `seat` VALUES (966, 1, 10, 20, 1, 0);
INSERT INTO `seat` VALUES (967, 1, 11, 0, 1, 0);
INSERT INTO `seat` VALUES (968, 1, 11, 1, 0, 0);
INSERT INTO `seat` VALUES (969, 1, 11, 2, 1, 0);
INSERT INTO `seat` VALUES (970, 1, 11, 3, 1, 0);
INSERT INTO `seat` VALUES (971, 1, 11, 4, 1, 0);
INSERT INTO `seat` VALUES (972, 1, 11, 5, 1, 0);
INSERT INTO `seat` VALUES (973, 1, 11, 6, 1, 0);
INSERT INTO `seat` VALUES (974, 1, 11, 7, 1, 0);
INSERT INTO `seat` VALUES (975, 1, 11, 8, 1, 0);
INSERT INTO `seat` VALUES (976, 1, 11, 9, 0, 0);
INSERT INTO `seat` VALUES (977, 1, 11, 10, 0, 0);
INSERT INTO `seat` VALUES (978, 1, 11, 11, 0, 0);
INSERT INTO `seat` VALUES (979, 1, 11, 12, 1, 0);
INSERT INTO `seat` VALUES (980, 1, 11, 13, 1, 0);
INSERT INTO `seat` VALUES (981, 1, 11, 14, 1, 0);
INSERT INTO `seat` VALUES (982, 1, 11, 15, 1, 0);
INSERT INTO `seat` VALUES (983, 1, 11, 16, 1, 0);
INSERT INTO `seat` VALUES (984, 1, 11, 17, 1, 0);
INSERT INTO `seat` VALUES (985, 1, 11, 18, 1, 0);
INSERT INTO `seat` VALUES (986, 1, 11, 19, 0, 0);
INSERT INTO `seat` VALUES (987, 1, 11, 20, 1, 0);
INSERT INTO `seat` VALUES (988, 1, 12, 0, 1, 0);
INSERT INTO `seat` VALUES (989, 1, 12, 1, 0, 0);
INSERT INTO `seat` VALUES (990, 1, 12, 2, 1, 0);
INSERT INTO `seat` VALUES (991, 1, 12, 3, 1, 0);
INSERT INTO `seat` VALUES (992, 1, 12, 4, 1, 0);
INSERT INTO `seat` VALUES (993, 1, 12, 5, 1, 0);
INSERT INTO `seat` VALUES (994, 1, 12, 6, 1, 0);
INSERT INTO `seat` VALUES (995, 1, 12, 7, 1, 0);
INSERT INTO `seat` VALUES (996, 1, 12, 8, 1, 0);
INSERT INTO `seat` VALUES (997, 1, 12, 9, 0, 0);
INSERT INTO `seat` VALUES (998, 1, 12, 10, 0, 0);
INSERT INTO `seat` VALUES (999, 1, 12, 11, 0, 0);
INSERT INTO `seat` VALUES (1000, 1, 12, 12, 1, 0);
INSERT INTO `seat` VALUES (1001, 1, 12, 13, 1, 0);
INSERT INTO `seat` VALUES (1002, 1, 12, 14, 1, 0);
INSERT INTO `seat` VALUES (1003, 1, 12, 15, 1, 0);
INSERT INTO `seat` VALUES (1004, 1, 12, 16, 1, 0);
INSERT INTO `seat` VALUES (1005, 1, 12, 17, 1, 0);
INSERT INTO `seat` VALUES (1006, 1, 12, 18, 1, 0);
INSERT INTO `seat` VALUES (1007, 1, 12, 19, 0, 0);
INSERT INTO `seat` VALUES (1008, 1, 12, 20, 1, 0);
INSERT INTO `seat` VALUES (1009, 1, 13, 0, 1, 0);
INSERT INTO `seat` VALUES (1010, 1, 13, 1, 0, 0);
INSERT INTO `seat` VALUES (1011, 1, 13, 2, 0, 0);
INSERT INTO `seat` VALUES (1012, 1, 13, 3, 0, 0);
INSERT INTO `seat` VALUES (1013, 1, 13, 4, 0, 0);
INSERT INTO `seat` VALUES (1014, 1, 13, 5, 0, 0);
INSERT INTO `seat` VALUES (1015, 1, 13, 6, 0, 0);
INSERT INTO `seat` VALUES (1016, 1, 13, 7, 0, 0);
INSERT INTO `seat` VALUES (1017, 1, 13, 8, 0, 0);
INSERT INTO `seat` VALUES (1018, 1, 13, 9, 0, 0);
INSERT INTO `seat` VALUES (1019, 1, 13, 10, 0, 0);
INSERT INTO `seat` VALUES (1020, 1, 13, 11, 0, 0);
INSERT INTO `seat` VALUES (1021, 1, 13, 12, 0, 0);
INSERT INTO `seat` VALUES (1022, 1, 13, 13, 0, 0);
INSERT INTO `seat` VALUES (1023, 1, 13, 14, 0, 0);
INSERT INTO `seat` VALUES (1024, 1, 13, 15, 0, 0);
INSERT INTO `seat` VALUES (1025, 1, 13, 16, 0, 0);
INSERT INTO `seat` VALUES (1026, 1, 13, 17, 0, 0);
INSERT INTO `seat` VALUES (1027, 1, 13, 18, 0, 0);
INSERT INTO `seat` VALUES (1028, 1, 13, 19, 0, 0);
INSERT INTO `seat` VALUES (1029, 1, 13, 20, 1, 0);
INSERT INTO `seat` VALUES (1030, 1, 14, 0, 1, 0);
INSERT INTO `seat` VALUES (1031, 1, 14, 1, 1, 0);
INSERT INTO `seat` VALUES (1032, 1, 14, 2, 1, 0);
INSERT INTO `seat` VALUES (1033, 1, 14, 3, 1, 0);
INSERT INTO `seat` VALUES (1034, 1, 14, 4, 1, 0);
INSERT INTO `seat` VALUES (1035, 1, 14, 5, 1, 0);
INSERT INTO `seat` VALUES (1036, 1, 14, 6, 1, 0);
INSERT INTO `seat` VALUES (1037, 1, 14, 7, 1, 0);
INSERT INTO `seat` VALUES (1038, 1, 14, 8, 1, 0);
INSERT INTO `seat` VALUES (1039, 1, 14, 9, 0, 0);
INSERT INTO `seat` VALUES (1040, 1, 14, 10, 0, 0);
INSERT INTO `seat` VALUES (1041, 1, 14, 11, 0, 0);
INSERT INTO `seat` VALUES (1042, 1, 14, 12, 1, 0);
INSERT INTO `seat` VALUES (1043, 1, 14, 13, 1, 0);
INSERT INTO `seat` VALUES (1044, 1, 14, 14, 1, 0);
INSERT INTO `seat` VALUES (1045, 1, 14, 15, 1, 0);
INSERT INTO `seat` VALUES (1046, 1, 14, 16, 1, 0);
INSERT INTO `seat` VALUES (1047, 1, 14, 17, 1, 0);
INSERT INTO `seat` VALUES (1048, 1, 14, 18, 1, 0);
INSERT INTO `seat` VALUES (1049, 1, 14, 19, 1, 0);
INSERT INTO `seat` VALUES (1050, 1, 14, 20, 0, 0);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` int(11) NOT NULL COMMENT '1：男 2：女',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `university_id` int(11) NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, 'test', '123', 1, '13555555555', 1, 0);
INSERT INTO `student` VALUES (2015111627, '赵义明', '111111', 1, '13333333333', 1, 0);

-- ----------------------------
-- Table structure for university
-- ----------------------------
DROP TABLE IF EXISTS `university`;
CREATE TABLE `university`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of university
-- ----------------------------
INSERT INTO `university` VALUES (1, '天津财经大学', 0);
INSERT INTO `university` VALUES (2, '天津科技大学', 0);
INSERT INTO `university` VALUES (3, '天津理工大学', 0);
INSERT INTO `university` VALUES (4, '天津外国语大学', 0);
INSERT INTO `university` VALUES (5, '天津大学', 0);
INSERT INTO `university` VALUES (6, '南开大学', 0);
INSERT INTO `university` VALUES (7, '天津农业大学', 0);
INSERT INTO `university` VALUES (8, '天津商业大学', 0);
INSERT INTO `university` VALUES (10, '天津师范大学', 0);
INSERT INTO `university` VALUES (11, '天津职业技术师范大学', 0);
INSERT INTO `university` VALUES (12, '北京大学', 0);

SET FOREIGN_KEY_CHECKS = 1;
