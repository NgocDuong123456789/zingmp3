import 'tippy.js/dist/tippy.css'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'


import Routes from './useRouter'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './redux/store'
import { ProvideContext } from './useContext/Context'

function App() {
  return (
    <div>
      {
        <HelmetProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ProvideContext>
                <ToastContainer />
                {Routes()}
              </ProvideContext>
            </PersistGate>
          </Provider>
        </HelmetProvider>
      }
    </div>
  )
}

export default App
