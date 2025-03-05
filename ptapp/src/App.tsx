import { BrowserRouter, Route, Routes } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-multi-carousel/lib/styles.css'

import './App.css'
import Homepage from './components/Homepage'
import MyFooter from './components/MyFooter'
import NotFound from './components/NotFound'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MyFooter />
    </BrowserRouter>
  )
}

export default App
