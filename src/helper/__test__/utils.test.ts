import { describe, it, expect } from 'vitest'
import { convertToDate, covertTime, convertLike, convertNumberToTime } from '../utils'

describe('ConvertDate', () => {
  it('chuyển đổi 1 số sang kiểu date', () => {
    expect(convertToDate(14)).toBe('1/1/1970')
    expect(convertToDate(5454545454)).toBe('5/3/1970')
  })
})


describe('ConvertToTime', () => {
  it('chuyển đổi 1 số sang thời gian', () => {
    expect(covertTime(14)).toBe('00:14')
    expect(covertTime(5454545454)).toBe('090909090:54')
  })
})

describe('convertLike', () => {
  it('chuyển đổi 1 số sang  số like', () => {
     expect(convertLike(14)).toBe(14)
     expect(convertLike(1000)).toBe('1.0K')
    expect(convertLike(10000)).toBe('1M')
  })
})

describe('convertNumberToTime', () => {
  it('chuyển đổi 1 số sang  số giờ ,phút ,giây', () => {
     expect(convertNumberToTime(100)).toBe('1 phút 40 giây')
       expect(convertNumberToTime(1000)).toBe('16 phút 40 giây')
      expect(convertNumberToTime(10000)).toBe('2 giờ 40 phút')
  })
})


