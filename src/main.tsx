import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { ProvideContext } from './useContext/Context.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ProvideContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProvideContext>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
