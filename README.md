# electron-demo

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

#### 发布流程

1. 修改package.json中version, 配置build, 指定github仓库

2. 前往github生成token，选择repo下所有权限，并设置环境变量。   https://github.com/settings/tokens/new.  
    ```
    export GH_TOKEN="<YOUR_TOKEN_HERE>"
    ```
   这样auto-updater模块可授权查询，获取github中更新内容

3. `npm run build`并发布到github releases
