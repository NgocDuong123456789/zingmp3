import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { ProvideContext } from './useContext/Context.tsx'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProvideContext>
          <BrowserRouter>
            <ToastContainer />
            <App />
          </BrowserRouter>
        </ProvideContext>
      </PersistGate>
    </Provider>
  </HelmetProvider>

  // </React.StrictMode>
)
