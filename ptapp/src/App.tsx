import { BrowserRouter, Route, Routes } from 'react-router'
import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-multi-carousel/lib/styles.css'
import './App.css'

import Homepage from './components/HomepageComponents/Homepage'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Users from './components/UserCRUDComponents/Users'
import Exercises from './components/ExerciseCRUDComponents/Exercises'
import UpdateOrRegisterUser from './components/UserCRUDComponents/UpdateOrRegisterUser'
import Payment from './components/UserCRUDComponents/Payment'
import UpdateOrCreateExercise from './components/ExerciseCRUDComponents/UpdateOrCreateExercise'

function App() {
  const URL = 'http://localhost:8080/api/'
  const [restart, setRestart] = useState<boolean>(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login URL={URL} />} />
        <Route
          path="/users"
          element={
            <Users URL={URL} restart={restart} setRestart={setRestart} />
          }
        />
        <Route
          path="/users/register"
          element={<UpdateOrRegisterUser URL={URL} setRestart={setRestart} />}
        />
        <Route
          path="/users/update/:id"
          element={<UpdateOrRegisterUser URL={URL} setRestart={setRestart} />}
        />
        <Route
          path="/users/payment/:id"
          element={<Payment URL={URL} setRestart={setRestart} />}
        />
        <Route
          path="/exercises"
          element={
            <Exercises URL={URL} restart={restart} setRestart={setRestart} />
          }
        />
        <Route
          path="/exercises/new"
          element={<UpdateOrCreateExercise URL={URL} setRestart={setRestart} />}
        />
        <Route
          path="/exercises/update/:id"
          element={<UpdateOrCreateExercise URL={URL} setRestart={setRestart} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
