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

1. 修改package.json中version, 配置build 

   ```
    发布至github

    "publish": [{
        "provider": "github",
        "owner": "light",
        "repo": "electron"
    }],

    或发布至私有服务器上

    "publish": [{
        "provider": "generic",
        "url": "http://127.0.0.1:8080/"
    }],

   ```

2. 如使用github发布，前往github生成token，选择repo下所有权限，并设置环境变量。( https://github.com/settings/tokens/new. ) 
    ```
    export GH_TOKEN="<YOUR_TOKEN_HERE>"
    ```
   这样auto-updater模块可授权查询，获取github中更新内容。

   也可使用私有服务器发布更新包，只需将资源放置在根目录。

3. `npm run build` 并将安装包（exe, dmg, pkg）和 `latest.yml` 发布到github releases或拷贝至私有服务器上
