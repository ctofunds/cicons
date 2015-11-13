## Cicons - CTOFunds 图标字体库

### 图标一览

[dist/icons-reference.html](http://ctofunds.github.io/cicons/dist/icons-reference.html)

### 安装

1. `npm install cicons --save`

2. 在页面中引用 cicons.css：
  `<link href="node_modules/cicons/dist/cicons.css" media="all" rel="stylesheet" type="text/css">`

### 命名规则

基本规则是（以 CSS 类名传统为准）：

* 命名采用英文
* 全部小写
* 使用中划线连字符
* 相关联的图标应统一前缀

### 怎样更新图标

1. 在 `source` 或 `source` 目录下更新图标源文件（svg 格式）
1. 执行 `gulp build` 命令生成图标和对应样式表

#### 发布流程

1. 执行 `npm run patch` 或 `npm run minor` 或 `npm run major` 生成版本标签
1. 执行 `git push && git push --tags` 推送到远端
