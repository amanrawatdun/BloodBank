import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute'
import PublicRoute from './components/Routes/PublicRoute'
import Donar from './pages/Dashboard/Donar'
import Hospitals from './pages/Dashboard/Hospitals'
import OrganisationPage from './pages/Dashboard/OrganisationPage'
import Consumer from './pages/Dashboard/Consumer'
import Donation from './pages/Donation'
import Analytics from './pages/Dashboard/Analytics'

import AdminHome from '../src/pages/Admin/AdminHome'
import DonarList from '../src/pages/Admin/DonarList'
import HospitalList from '../src/pages/Admin/HospitalList'
import OrgList from '../src/pages/Admin/OrgList'


function App() {


  return (
    <>
      {/* <ToastContainer /> */}
      <Routes>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
             
              <AdminHome/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList/>
            </ProtectedRoute>
          }
        />

        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
            } />
        <Route path='/Register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
          } />
           <Route path='/donar' element={
          <ProtectedRoute>
            <Donar/>
          </ProtectedRoute>
        } />
           <Route path='/hospital' element={
          <ProtectedRoute>
            <Hospitals/>
          </ProtectedRoute>
        } />
           <Route path='/orgnaisation' element={
          <ProtectedRoute>
            <OrganisationPage/>
          </ProtectedRoute>
        } />
           <Route path='/consumer' element={
          <ProtectedRoute>
            <Consumer/>
          </ProtectedRoute>
        } />
           <Route path='/donation' element={
          <ProtectedRoute>
            <Donation/>
          </ProtectedRoute>
        } />
           <Route path='/analytics' element={
          <ProtectedRoute>
           <Analytics/>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
