# 锁定 Node 20 alpine（轻量版）
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 先拷贝依赖文件，利用docker缓存
COPY package*.json ./

# 安装依赖
RUN npm install

# 拷贝全部源码
COPY . .

# 暴露容器内端口，和你的服务端口一致：3000
EXPOSE 3000

# 启动命令，和 package.json 的 scripts.start 对应
CMD ["npm", "start"]
