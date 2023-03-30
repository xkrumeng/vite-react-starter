import type { Config } from 'jest'

const config: Config = {
  bail: 1,
  // 多于一个测试文件运行时不展示每个测试用例测试通过情况
  verbose: true,
  // 测试用例运行在一个类似于浏览器的环境里，可以调用浏览器的 API
  testEnvironment: 'jsdom',
  // 转译下列模块为 Jest 能识别的代码
  // transform: {
  //   "^.+\\.(j|t)sx?$": "ts-jest",
  // },
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  // 以 <rootDir>/src 这个目录做为根目录来搜索测试文件（模块）
  roots: ['<rootDir>'],

  // 在测试环境准备好之后且每个测试文件执行之前运行下述文件
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
}

export default config
