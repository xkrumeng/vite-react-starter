import { sum } from './sum'

describe('sum模块测试', () => {
  it('可以做整数的加法', () => {
    expect(sum(1, 3)).toEqual(4)
  })
})