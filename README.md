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


## 3. 集成 **Redux**

接着下来，我们把 **Redux** 状态管理集成到我们的项目中。 

```
pnpm add @reduxjs/toolkit react-redux
```


4. 集成测试