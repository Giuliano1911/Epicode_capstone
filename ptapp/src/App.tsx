import { BrowserRouter, Route, Routes } from 'react-router'

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users key={Math.random()} />} />
        <Route path="/users/register" element={<UpdateOrRegisterUser />} />
        <Route path="/users/update/:id" element={<UpdateOrRegisterUser />} />
        <Route path="/users/payment/:id" element={<Payment />} />
        <Route path="/exercises" element={<Exercises key={Math.random()} />} />
        <Route path="/exercises/new" element={<UpdateOrCreateExercise />} />
        <Route
          path="/exercises/update/:id"
          element={<UpdateOrCreateExercise />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
