import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/signup/SignUp'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import useAuth from './hooks/useAuth'

const App = () => {

  const {user} = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App