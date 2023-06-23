import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import App from './App'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'



expect.extend(matchers)
describe('App', () => {
  it('App render và chuyển trang', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    })
    const user = userEvent.setup()
    // verify vào đúng trang chủ
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Zing MP3')
    })
    // verify vào trang top 100
    await user.click(screen.getByText(/Top 100/i))
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Top 100')
    })
    screen.debug(document.body.parentElement as HTMLElement, 9999999999)
  })
  it('về trang not found', async () => {
    const baseRoute = '/some/notfound'
    render(
      <MemoryRouter initialEntries={[baseRoute]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/Oops! That page can’t be found/i)).toBeInTheDocument()
    })
  })
  it('search all', async () => {
    const searchRouter = '/tim-kiem/tat-ca?q=sơn+tùng'
    render(
      <MemoryRouter initialEntries={[searchRouter]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/KẾT QUẢ TÌM KIẾM/i)).toBeInTheDocument()
    })
  })
  it('search song', async () => {
    const searchRouter = '/tim-kiem/bai-hat?q=1'
    render(
      <MemoryRouter initialEntries={[searchRouter]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/BÀI HÁT NỔI BẬT/i)).toBeInTheDocument()
    })
  })
  it('search playlist', async () => {
    const searchRouter = '/tim-kiem/playlist?q=1'
    render(
      <MemoryRouter initialEntries={[searchRouter]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/BÀI HÁT NỔI BẬT/i)).toBeInTheDocument()
    })
  })
  it('album', async () => {
    const albumhRouter = '/album/Nhung-Bai-Hat-Hay-Nhat-Cua-Bao-Anh-Bao-Anh/ZWZBIBB0'
    render(
      <MemoryRouter initialEntries={[albumhRouter]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/Lời tựa và những đại diện K-pop ngầu đét/i)).toBeInTheDocument()
    })
  })
})
