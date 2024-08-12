import ReactDOM from 'react-dom/client'
import React from "react";
import App from './App.tsx'
import './styles/main.scss'
import { setupStore } from "./redux/store.ts";
import { Provider } from 'react-redux'

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
)
