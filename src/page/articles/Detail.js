import React, { useState } from 'react'
// import {useParams} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './../../components/articles/CodeBlock'
import Editor from './../../components/articles/Editor'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    wrapper: {
        display: 'flex'
    },
    editor: {
        flex: 1
    },
    markdown: {
        flex: 1
    }
})
export default function Detail() {
//   const { articleId } = useParams()
  const classes = useStyles()
  const input = `## Babel对ES6 Module的编译

  说白了一句话，就是将\`ES6 Module\`编译为\`commonJS\`规范
  
  那么，浏览器肯定也不支持\`commonJS\`规范啊，那一般有这种需求的时候需要怎么处理呢？
  
  ## 浏览器如何支持commonJS规范
  
  - 浏览器不兼容\`commonJS\`的根本原因，缺少以下四个\`Node.js\`的变量
      - \`module\`
      - \`exports\`
      - \`require\`
      - \`global\`
  - 模拟
  
  \`\`\` javascript
  // 引用，模块是require.modules里面
  // 如果有，直接返回module.exports
  // 如果没有，定义module.exports为空对象，执行该模块，并把this指向module.exports，传入模块和module.exports
  function require(moduleId) {
      var module = require.modules[moduleId]
      if (!module.exports) {
          module.exports = {}
          module.call(module.exports, module, module.exports)
      } else {
          return module.exports
      }
  }
  require.modules = {}
  // 注册，把导出的模块存入require.modules中
  require.define(moduleId, fn) {
      require.modules[moduleId] = fn
  }
  \`\`\`
  
  - 引用
  
  \`\`\` javascript
  // foo.js
  function foo (x) {
      return x * 100
  }
  // 注册模块，把要导出的模块赋值给当前模块的exports属性
  require.define('foo.js', function (module, exports) {
      module.exports = foo
  })
  
  // main.js
  
  // 因为require返回的是module.exports
  // 所以foo就等于注册模块是被赋值的函数
  var foo = require('foo.js')
  
  console.log(foo(5)) // 500
  \`\`\`
  
  最后来看\`webpack\`模块的打包，和上面的就已经很像了
  
  ## Webpack模块打包
  
  - \`webpack\`根据\`webpack.config.js\`中的入口文件，识别模块依赖，通过自己的\`__webpack_require__\`方法，实现模块的导出和引用
  
  - 打包前
  \`\`\` javascript
  // src/add
  export default function(a, b) {
      let { name } = { name: 'hello world,'}
      return name + a + b
  }
  
  // src/main.js
  import Add from './add'
  console.log(Add, Add(1, 2))
  
  \`\`\`
  
  - 打包后（已精简）
  
  \`\`\` javascript
  // modules类似于上面的require.modules，存放所有导出的模块{'moduleId': 代码导出的函数}
  (function (modules) {
      // 这里加了个缓存
      var installedModules = {};
  
      // 类似于上面的require函数
      function __webpack_require__(moduleId) {
          // 首先看缓存里有没有，有的话直接返回缓存里的module.exports
          if (installedModules[moduleId]) {
              return installedModules[moduleId].exports;
          }
          // 先创建一个空模块，存入缓存
          var module = installedModules[moduleId] = {
              i: moduleId,
              l: false, // 标记是否已经加载
              exports: {} // 初始导出为空
          };
  
          // 执行对应的模块函数，把this指向module.exports
          // 传入参数 先前定义的空模块 空模块的导出 require函数(为方便理解，可以先不用管这个参数)
          modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
          执行过后标记为已加载
          module.l = true; // 标记为已加载
  
          // 返回加载的模块，调用方直接调用即可
          return module.exports;
      }
  
      // __webpack_require__对象下的r函数
      // 在module.exports上定义__esModule为true，表明是一个模块对象
      __webpack_require__.r = function (exports) {
          Object.defineProperty(exports, '__esModule', {
              value: true
          });
      };
      return __webpack_require__(__webpack_require__.s = "./src/main.js");
  })
  (
      // modules实参，是涉及到的两个被导出模块{'moduleId': 代码导出的函数}
      {
          // add模块
          "./src/add.js": (function (module, __webpack_exports__, __webpack_require__) {
              // 在module.exports上定义__esModule为true
              __webpack_require__.r(__webpack_exports__);
              // 直接把add模块内容，赋给module.exports.default对象上
              __webpack_exports__["default"] = (function (a, b) {
                  let {
                      name
                  } = {
                      name: 'hello world,'
                  }
                  return name + a + b
              });
          }),
  
          // 入口模块
          "./src/main.js": (function (module, __webpack_exports__, __webpack_require__) {
              __webpack_require__.r(__webpack_exports__)
              // 拿到add模块的定义
              // _add__WEBPACK_IMPORTED_MODULE_0__ = module.exports，有点类似require
              var _add__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/add.js");
              // add模块内容: _add__WEBPACK_IMPORTED_MODULE_0__["default"]
              console.log(_add__WEBPACK_IMPORTED_MODULE_0__["default"], Object(_add__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 2))
          })
      }
  );
  \`\`\`
  
  - 首先，这是个立即执行函数，里面是一个闭包，设置了缓存变量
  - 执行函数，\`return\`时调用\`__webpack_require__\`
  方法，首先传入的\`moduleId\`是\`main.js\`
  - 先看缓存有没有，没有的话创建空模块
  - 然后执行\`main.js\`对应的模块函数
  - \`main.js\`中，首先调用\`__webpack_require__.r\`方法，传入\`module.exports\`(这时还是空对象)，把\`module.exports\`变成\`{__esModule: true}\`表明其是一个模块对象
  - 接下来就会以同样的方式，调用\`__webpack_require__\`方法引入\`add.js\`
  - \`add.js\`中，定义好\`__esModule\`之后
  - 把\`module.exports['default']\`定义为自己要导出的模块
  - 接下来\`__webpack_require__\`方法往下执行\`module.l = true;
  \`最后会把这个\`module.exports\`导出
  - 这时\`main.js\`中\`_add__WEBPACK_IMPORTED_MODULE_0__['default']\`就是addjs的导出函数
  - 这样\`add\`的模块就导入到\`main.js\`中了
  - 最后再执行\`main.js\`中的\`conosle.log\`就可以了
  
  
  本质上，我理解的\`__webpack_require__\`就是把需要导出的函数模块赋值给一个对象，然后引用方再引用这个对象，就可以调用对应的方法了
  
  ## 参考文章
  
  - [Webpack 模块打包原理](https://juejin.im/post/5c94a2f36fb9a070fc623df4)
  - [浏览器加载 CommonJS 模块的原理与实现](https://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)  
  `
  const [markdownSrc, setMarkdownSrc] = useState(input)
  const handleMarkdownChage = function (evt) {
    setMarkdownSrc(evt.target.value)
  }
  return (
    <div className={classes.wrapper}>
      <Editor className={classes.editor} value={markdownSrc} onChange={handleMarkdownChage} />
      <ReactMarkdown className={classes.markdown} source={markdownSrc} renderers={{code: CodeBlock}}></ReactMarkdown>
    </div>
  )
}
