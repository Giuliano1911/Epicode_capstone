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
import TrainingWeeks from './components/TrainingCRUDComponents/TrainingWeeks'
import TrainingUpdate from './components/TrainingCRUDComponents/TrainingUpdate'
import Alimentation from './components/FoodCRUDComponents/Alimentation'
import UpdateOrCreatFood from './components/FoodCRUDComponents/UpdateOrCreatFood'
import DietWeeks from './components/DietCRUDComponents/DietWeeks'
import DietUpdate from './components/DietCRUDComponents/DietUpdate'
import Dashboard from './components/UserComponents/Dashboard'
import MyCalendar from './components/CalendarComponents/MyCalendar'

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
        <Route
          path="/trainingWeeks/:id"
          element={<TrainingWeeks key={Math.random()} />}
        />
        <Route path="/trainingWeeks/update/:id" element={<TrainingUpdate />} />
        <Route
          path="/alimentation"
          element={<Alimentation key={Math.random()} />}
        />
        <Route path="/aliment/new" element={<UpdateOrCreatFood />} />
        <Route path="/aliment/update/:id" element={<UpdateOrCreatFood />} />
        <Route
          path="/dietWeeks/:id"
          element={<DietWeeks key={Math.random()} />}
        />
        <Route
          path="/dietWeeks/update/:id"
          element={<DietUpdate key={Math.random()} />}
        />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route
          path="training/:id"
          element={<TrainingUpdate key={Math.random()} />}
        />
        <Route path="diet/:id" element={<DietUpdate key={Math.random()} />} />
        <Route path="/calendar/:id" element={<MyCalendar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
