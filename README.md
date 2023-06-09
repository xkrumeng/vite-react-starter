# vite-react-starter


## 1. 初始化项目

我们使用 [Vite.js](https://github.com/) 来打包我们的代码。

运行如下命令：

```bash
pnpm create vite
```

会出现如下的选择：

```bash
√ Project name: ... react-redux-starter   # 设置项目名  这里我们设置为react-redux-starter
√ Select a framework: » React  # 选择框架 React
√ Select a variant: » TypeScript + SWC 
```

到这里我们项目初始化完成。 这时可以看到我们初始化的项目目录如下：

```bash
react-redux-starter
    │  .gitignore
    │  index.html
    │  package.json
    │  tsconfig.json     # typescript 配置文件
    │  tsconfig.node.json # typescript 配置文件
    │  vite.config.ts    # vite 配置文件
    │
    ├─public
    │      vite.svg
    │
    └─src
        │  App.css
        │  App.tsx
        │  index.css
        │  main.tsx
        │  vite-env.d.ts
        │
        └─assets
                react.svg
```

这里我们先把初始化的代码清理一下：

**App.css** ， **index.css**  清空

```tsx
// App.tsx

import './App.css'

function App() {
  return (
    <div>
      Hello world!
    </div>
  )
}

export default App

```

这一步骤 [代码参考](../../commit/5c9c85d0d5307af0aea1699db6d11878e8e872b4)



## 2 集成 antd 与 tailwindcss

```bash
pnpm add antd @ant-design/icons
pnpm install -D tailwindcss postcss autoprefixer

# 生成 tailwind 配置文件
npx tailwindcss init -p
```

运行完以上命令，在根目录下会生成两个配置文件 **postcss.config.js** 和 **tailwindcss.config.js**, 其中 **postcss.config.js** 这个文件是不需要修改的， 我们用默认的生成的就行。 然后我们修改一下 **tailwindcss.config.js** 这个配置文件如下：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
 // content 配置 tailwind 要处理的文件。
 // 只有在这里配置的文件，才能使用 tailwind 的样式，进而由 PostCSS 打包进实际项目中
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

到这里 **tailwindcss** 的配置已经完成，接下就需要把 **tailwindcss** 的样式应用到我们的项目中去。

首先我们先编辑 **index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

然后打开 **App.tsx** 编辑，加上 **tailwindcss** 样式测试一下

```tsx
import { Button } from 'antd'
import { CiCircleFilled } from '@ant-design/icons'
import './App.css'

function App() {
  return (
    <div className='font-bold text-red-500 bg-[#ccc] h-screen w-screen'>
      <Button type="primary" className='flex items-center'>
        <CiCircleFilled size={16}/> Hello world!
      </Button>
    </div>
  )
}

export default App
```

此时我们就可以看到 **tailwindcss** 样式 和 **antd** 组件都生效了。 

如果样式未生效，请检查:
- **tailwindcss.config.js** 配置文件里的 **content** 是否配置了
- **index.css** 是否加入了 **tailwindcss** 的样式引入
- 在 **main.tsx** 中是否引入了 **index.css** 

这一步骤 [代码参考](../../commit/61cb4372e6c8f3615190e7991a9139dbbee446be)



## 3. 集成 **Redux**

接着下来，我们把 **Redux** 状态管理集成到我们的项目中。 

```
pnpm add @reduxjs/toolkit react-redux
```

这一步骤的[代码参考](../../commit/307efc2c149dc0569b80d5e85c5aa66bcb5f3716)


## 4. 集成Jest单元测试

```bash
# jest 测试框架
# @types/jest Jest 类型声明包  TS 声明类型包的大版本最好和 jest 一样。
# ts-jest 转译器 利用 tsc 来转译 TypeScript  
# ts-node  写完代码之后要用 tsc 作编译，之后再用 Node.js 来跑，这样比较麻烦，所以我们会用 ts-node 来直接跑 ts 代码，省去了编译阶段。
# jest-environment-jsdom dom操作

pnpm add -D jest @types/jest ts-jest ts-node jest-environment-jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom @types/testing-library__jest-dom identity-obj-proxy @testing-library/dom @types/node

# 初始化jest 配置
npx jest --init
```

接着我们开始配置 **jest.config.ts** 

```ts
// jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  bail: 0, // 有测试错误后就停止错误
  // 多于一个测试文件运行时不展示每个测试用例测试通过情况
  verbose: true,
  // 测试用例运行在一个类似于浏览器的环境里，可以调用浏览器的 API
  testEnvironment: 'jsdom',
  // 转译下列模块为 Jest 能识别的代码
  preset: 'ts-jest',
  moduleNameMapper: { 
    // 模块alias  例如我们在测试文件中导入文件 import xxx from '@/components/xxx' 其中 '@/components/xxx' 会对应到<rootDir/src/components/xxx 模块。
    '^@/(.*)$': '<rootDir>/src/$1',
    // identity-obj-proxy 会mock 样式相关的
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  // 以 <rootDir>/src 这个目录做为根目录来搜索测试文件（模块）
  roots: ['<rootDir>'],

  // 在测试环境准备好之后执行前的钩子函数，每个测试文件执行之前运行下述文件, 一些环境的兼容的代码我们可以写在这里
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
}

export default config
```

扩展 Jest 的 expect API，以便在测试中使用 Jest DOM 的断言函数

**tests/jest.setup.ts**
```ts
import '@testing-library/jest-dom/extend-expect'
```

既然我们在 jest 配置了导入模块 alias。 同样的我们也需要在 typescript 的配置中加入相应的 alias, 要不然 typescript 不能解析 jest 的测试代码。


同时我们在**tsconfig.json** 中加上 **jest** 的 **typescript** 类型声明。 修改如下：

```js
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "types": ["vite/client", "jest", "@testing-library/jest-dom"] 
  },
  // ...
}

```

并且还需要在 **vite.config.ts** 中加上相应的alias配置.

```ts
import path from 'path'
// ... 代码
export default defineConfig({
  // ... 代码
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    }
  }
  // ... 代码
})

```

好了，现在 **jest** 基本上已经配置完成了， 我们写个小例子来测试一下。[示例代码](../../commit/01090c5f37534210c9606f44f5ad2feb64315424)

现在添加一个React组件的测试 [示例代码](../../commit/878533687c548ae99083d3a5ca1e30205b329b62)

安装依赖如下：
```bash
pnpm add axios
pnpm add -D classnames msw
```


## 5. 集成代码规范相关的工具 eslint stylelint prettier

```bash
pnpm add -D eslint prettier stylelint  eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latestes @typescript-eslint/parser lint-config-prettier eslint-plugin-prettier stylelint-config-prettier stylelint-config-standard stylelint-order
```

配置  **prettier** 规则， 在根目录下新建一个 **.prettierrc.cjs** 配置文件， 内容如下：
```ts
module.exports = {
  // 一行最多 120 字符..
  printWidth: 80,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: "as-needed",
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要有逗号 none es5 all
  trailingComma: "es5",
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，不需要括号 always avoid
  arrowParens: "always",
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: "preserve",
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: "css",
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: "lf",
}
```

再配置 **eslint**, 在根目录下创建 **.eslintrc** 配置文件， 内容如下：

```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "rules": {
        "prettier/prettier": "error",
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off"
    }
}
```

最后配置一个样式的规则， 创建一个 **.stylelintrc.json**, 内容如下：

```json
{
    "extends": [
        "stylelint-config-standard",
        "stylelint-config-prettier"
    ],
    "plugins": [
        "stylelint-orders"
    ]
}
```

接下来在 **package.json** 的 **script** 中添加命令。

```json
{
    "script": {
        "lint": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./"
    }
}
```

## 6. husky + commitlint +lint-staged

```bash
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```

在 package.json 添加 prepare 命令并运行

```js
{
  "script": {
    // ...,
    "prepare": "husky install"
  }
}
```
```bash
yarn prepare
```

给 Husky 添加一个 Hook, 这样每次 **git commit** 之前都会先运行 **npm run lint**, 通过之后才会提交代码

```bash
npx husky add .husky/pre-commit "npm run lint"
```

我们可以通过 lint-staged 只对暂存区的代码进行检验。在级 **package.json** 添加一个 **lint-staged** 的配置

```js
{
  "lint-staged": {
    "*.{js,jsx,tsx,ts}": [
    "npm run lint"
    ]
  }
}
```
并在 **.husky/pre-commit** 中替换 **npx lint-staged**。。现在我们每次 **git commit** 前都会对改动的文件进行 Lint 检查了。

### commitlint 配置

在根目录下创建配置文件 **.commitlintrc.cjs**

```js
module.exports = {
  extends: ["@commitlint/config-conventional"]
}
```
然后给 **husky** 添加一个 **commit-msg** hook,

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```
现在提交信息不规范就会被拦截导致提交失败，规范可见 [commitlint](https://commitlint.js.org/#/) ，当然你也可以根据需要修改提交信息规范。


## 文档参考
- [vitejs 中文官方文档](https://cn.vitejs.dev/)
- [TailwindCss官方文档](https://tailwindcss.com/)
- [Redux 官网](https://cn.react-redux.js.org)
- [esbuild 中文官方文档](https://esbuild.docschina.org/)
- [swc 官方文档](https://swc.rs/)
- [Jest 官方文档](https://jestjs.io/zh-Hans/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW - Mock Service Worker](https://mswjs.io/)
- [typescript-eslint](https://typescript-eslint.io/)