import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import NotFoundPage from "./pages/NotFoundPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import Events from "./pages/Events"
import ParticipatedStudents from "./pages/ParticipatedStudents"
import './App.css'
import SingleEvent from "./components/SingleEvent"
import Archive from "./pages/Archive"
import OnlyAdminPage from "./pages/OnlyAdminPage"
import AdminDashboad from "./pages/AdminDashboad"
import EditStudent from "./components/EditStudent"
import StudentDashboard from "./components/StudentDashBoard"
import TeacherDashboard from "./components/TeacherDashboard"
import Students from "./components/Students"


const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path='/home' element={<Home />}/>
          <Route element={<OnlyAdminPage/>}>
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/admin" element={<AdminDashboad/>} />
            
            <Route path="/edit/:id" element={<EditStudent/>} />
          </Route>
          <Route path="/studentlist" element={<Students />} />
          <Route path="/single" element={<SingleEvent/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/listOfParticipants/:id/:author" element={<ParticipatedStudents/>} />
          <Route path="/event" element={<Events/>} />
          <Route path="/archive" element={<Archive/>} />
          <Route path="/studentDashboard" element={<StudentDashboard />} />
          <Route path="/teacherDashboard" element={<TeacherDashboard />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
