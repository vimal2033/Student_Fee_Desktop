// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MyProvider } from './global/MyContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <MyProvider>
  <App />
  </MyProvider>
  // </StrictMode>,
);


