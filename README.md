### 说明

- ⚠️⚠️⚠️无聊打发时间做玩的，暂时没有任何功能，没有服务器，没有数据库，只是一个静态页面，只有登录页面，其它功能还未开发....
- 演示地址：https://bob-cheung.github.io/money/
- 账号密码：`1234@qq.com `/ `123`

### 📋 目录

- [说明](#说明)
- [📋 目录](#-目录)
- [🔍 项目简介](#-项目简介)
- [🚀 快速开始](#-快速开始)
- [本地运行步骤](#本地运行步骤)
- [📦 部署指南](#-部署指南)
- [更新部署](#更新部署)
- [❓ 常见问题](#-常见问题)

### 🔍 项目简介

这里可补充项目的详细介绍，例如：

- 核心功能：[如：音频提取] 还未完善

- 设计理念：[如：极简界面、高效操作]

- 技术特点：[如：响应式布局、本地数据存储]

### 🚀 快速开始

环境要求

- Node.js ≥ 14.x

- npm ≥ 6.x 或 yarn ≥ 1.22.x
### 本地运行步骤

1. 克隆仓库到本地
```bash
git clone https://github.com/bob-cheung/money.git
```

2. 安装项目依赖
```bash
npm install
```

3. 访问本地服务：打开浏览器输入 http://localhost:3000（端口号以实际终端输出为准）

### 📦 部署指南

将项目部署到 GitHub Pages，实现免费静态网站上线：

1. 确保本地已完成项目配置，且代码已提交

2. 安装部署依赖（若未安装
```bash
   npm install gh-pages --save-dev
```

3. 配置 package.json 部署脚本
```bash
"homepage": "https://bob-cheung.github.io/money/",
  "scripts": {
  "build": "你的打包命令",  // 如：vite build / react-scripts build
  "deploy": "gh-pages -d dist"  // dist 为打包输出目录，React 项目替换为 build
}
```

4. 生成静态文件
  ```bash
  npm run build
  ```

5. 自动部署到 GitHub Pages
npm run deploy ⚠️注意：手动创建 gh-pages 分支，部署命令会自动创建空分支并上传静态文件。

1. GitHub 仓库配置：打开仓库：bob-cheung/money

1. 进入「Settings」→ 下滑找到「GitHub Pages」

2. 「Source」选择「gh-pages」分支，目录默认「/(root)」

3. 点击「Save」，等待 1-2 分钟生效

访问已部署网站
🎉 部署成功后，访问：https://bob-cheung.github.io/money/

### 更新部署

后续代码更新后，重复以下命令即可重新部署：
```bash
  npm run build
  npm run deploy
```


### ❓ 常见问题

- ``npm run deploy ``执行报错「gh-pages 命令未找到」需手动安装部署依赖：``npm install gh-pages --save-dev``

- 访问部署地址出现 404 检查 ``gh-pages`` 分支是否存在，且根目录有 ``index.html`` 文件

📄 许可证

啦啦啦啦啦啦啦啦啦啦
