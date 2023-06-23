import { describe, it, expect ,beforeEach} from 'vitest'
import { saveAccessToken, getAccessToken, getProfile, saveProfile, RemoveLocal } from '../localstore'



beforeEach(() => {
  localStorage.clear()
})
describe('saveAccessToken', () => {
  it('lưu access_token vào localStorage', () => {
    saveAccessToken('hello')
    expect(localStorage.getItem('access_token')).toBe('hello')
  })
})

describe('getAccessToken', () => {
  it('lấy access_token trong localStorage', () => {
    saveAccessToken('hello1')
    expect(getAccessToken()).toBe('hello1')
  })
})

describe('RemoveLocal', () => {
  it('Xóa tất cả trong localStorage', () => {
    saveAccessToken('hello')
    RemoveLocal()
    expect(localStorage.getItem('access_token')).toBe(null)
  })
})
