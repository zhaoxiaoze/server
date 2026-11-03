const mongoose = require('mongoose')
const uri =mongodb+srv://zhaoze13_db_user:92tEUL58b9q86w6q@cluster0.t45p5tn.mongodb.net/

async function testConnect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,    // ✅ 解决url解析废弃警告 + 修复端口解析bug
      useUnifiedTopology: true // ✅ mongoose5 配套必备
    })
    console.log('✅ mongoose 连接成功！')
    await mongoose.disconnect()
  } catch (err) {
    console.log('❌ 报错：', err.message)
  }
}
testConnect()