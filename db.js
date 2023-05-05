// 从环境变量中读取数据库配置
// const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

// //导入依赖
// var mysql = require("mysql");
// sh-cynosdbmysql-grp-9brxbjem.sql.tencentcdb.com:25860
const MYSQL_ADDRESS = {
  name:'nodejs_demo',
  host:"sh-cynosdbmysql-grp-9brxbjem.sql.tencentcdb.com", //主机IP
  port:25860,        //端口号
  user:"root",	  //用户名
  password:"zfS3etee",  //密码
}

const mysql = require("mysql")  // 导入mysql，连接mysql 需要用到

// mysqljs 连接 mysql数据库
let connection = mysql.createConnection({
  host:"sh-cynosdbmysql-grp-9brxbjem.sql.tencentcdb.com", //主机IP
  port:25860,        //端口号
  user:"root",	  //用户名
  password:"zfS3etee",  //密码
  database: 'nodejs_demo' // 你要连接那个数据库
})
// });
// 导出初始化方法和模型
module.exports = {
  connection
};
