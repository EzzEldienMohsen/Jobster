import {
  Landing,
  Register,
  Error,
  SharedLayout,
  Stats,
  AllJobs,
  AddJob,
  Profile,
} from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProtectedRoute } from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="/all-jobs" element={<AllJobs />} />
          <Route path="/add-job" element={<AddJob />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  )
}

export default App
