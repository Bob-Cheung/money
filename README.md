money 项目

一款专注于[可补充项目核心功能，如：个人财务管理、账单记录]的前端应用，简洁易用，支持通过 GitHub Pages 快速部署上线。

📋 目录

- 项目简介

- 快速开始

- 部署指南

- 常见问题

- 许可证

🔍 项目简介

这里可补充项目的详细介绍，例如：

- 核心功能：[如：收支记录、分类统计、数据可视化]

- 设计理念：[如：极简界面、高效操作]

- 技术特点：[如：响应式布局、本地数据存储]

（可选）添加项目截图，增强直观性：

🚀 快速开始

环境要求

- Node.js ≥ 14.x

- npm ≥ 6.x 或 yarn ≥ 1.22.x

本地运行步骤

1. 克隆仓库到本地
        git clone https://github.com/bob-cheung/money.git
cd money

2. 安装项目依赖
        npm install
# 或使用 yarn
yarn install

3. 启动本地开发服务器
        npm run dev
# 或使用 yarn
yarn dev

4. 访问本地服务：打开浏览器输入 http://localhost:3000（端口号以实际终端输出为准）

📦 部署指南

将项目部署到 GitHub Pages，实现免费静态网站上线：

部署步骤

1. 确保本地已完成项目配置，且代码已提交

2. 安装部署依赖（若未安装）
        npm install gh-pages --save-dev

3. 配置 package.json 部署脚本
        "scripts": {
  "build": "你的打包命令",  // 如：vite build / react-scripts build
  "deploy": "gh-pages -d dist"  // dist 为打包输出目录，React 项目替换为 build
}

4. 生成静态文件
        npm run build

5. 自动部署到 GitHub Pages
        npm run deploy注意：手动创建 gh-pages 分支，部署命令会自动创建空分支并上传静态文件。

6. GitHub 仓库配置
        打开仓库：bob-cheung/money

7. 进入「Settings」→ 下滑找到「GitHub Pages」

8. 「Source」选择「gh-pages」分支，目录默认「/(root)」

9. 点击「Save」，等待 1-2 分钟生效

访问已部署网站
        🎉 部署成功后，访问：https://bob-cheung.github.io/money/

更新部署

后续代码更新后，重复以下命令即可重新部署：

npm run build
npm run deploy

❓ 常见问题

- npm run deployQ：执行  报错「gh-pages 命令未找到」？A：需手动安装部署依赖：npm install gh-pages --save-dev

- Q：访问部署地址出现 404？A：检查 gh-pages 分支是否存在，且根目录有 index.html；框架项目需配置相对路径：Vue 项目：在 vue.config.js 中设置 publicPath: './'

- React 项目：在 package.json 中添加 "homepage": "."

Q：样式/图片加载失败？A：避免使用绝对路径（如 /static/xxx.png），改为相对路径（./static/xxx.png）

📄 许可证

本项目采用 MIT License 开源协议，详情请查看 LICENSE 文件。
