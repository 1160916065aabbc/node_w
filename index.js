const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { connection } = require("./db");

const logger = morgan("tiny");
const get_user = "SELECT * FROM w_user"

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(logger);

// 首页
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/getUser", async (req, res) => {
  connection.query(get_user, (err,data) => {
    if(err) console.log(err);
    res.send({
      code: 200,
      data: data,
    });
  })
})

app.post("/api/setUser", async (req, res) => {

  let {name, tel, time} = req.body
  const sql = `INSERT INTO w_user (name, tel) VALUES (?,?)`
  connection.query(sql,[name, tel], (err, result) => {
    if (err) {
      console.error(err)
      return
    }
    res.send({
      code: 200,
      msg: '导入成功',

    })
  })

})

// 小程序调用，获取微信 Open ID
app.get("/api/wx_openid", async (req, res) => {
  if (req.headers["x-wx-source"]) {
    res.send(req.headers["x-wx-openid"]);
  }
});

// const port = process.env.PORT || 80;
const port = process.env.PORT || 80;

async function bootstrap() {
  connection.connect(err=>{
    // err代表失败
    if(err) {
      console.log("数据库初始化失败");
    }else {
      console.log("数据库初始化成功");
    }
  })

  app.listen(port, () => {
    console.log("启动成功", port);
  });
}

bootstrap();
