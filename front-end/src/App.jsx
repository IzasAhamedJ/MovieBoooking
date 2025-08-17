import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import MoviesList from './pages/MoviesList'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favouites from './pages/Favouites'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import MainSection from './components/MainSection'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import ListShow from './pages/admin/ListShow'
import ListBooking from './pages/admin/ListBooking'
import AddShow from './pages/admin/AddShow'
function App() {
  
  const isAdmin=useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster/>  
      {!isAdmin && <Navbar/>}
       <Routes>
        <Route path="/"element={<Home/>}/>
         <Route path="movies"  element={<MoviesList/>}/>
          <Route path="movies/:id"  element={<MovieDetails/>}/>
           <Route path="movies/:id/:date"  element={<SeatLayout/>}/>
            <Route path="mybookings"  element={<MyBookings/>}/>
            <Route path="favourite" element={<Favouites/>}/>
            <Route path="Home-Page" element={<MainSection/>}/>
            <Route path="admin" element={<Home/>}/>
            <Route path='/admin' element={<Layout/>}>
                 <Route index element={<Dashboard/>}/>
                  <Route path="add-show" element={<AddShow/>}/>
                   <Route path="list-show" element={<ListShow/>}/>
                    <Route path="list-booking" element={<ListBooking/>}/>
            </Route>
       </Routes> 
       {!isAdmin && <Footer/>}
    </>
  )
}

export default App
