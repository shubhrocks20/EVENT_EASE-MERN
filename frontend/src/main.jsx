import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
// import ThemeProvider from './components/ThemeProvide.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      
        <App />
      
    </PersistGate>
  </Provider>,
)
