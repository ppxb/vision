import * as ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App'
import '@renderer/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>
)
