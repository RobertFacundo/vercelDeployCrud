import React, { useState } from 'react'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from './contexts/UserContext';
import Authentication from './components/Authentication'
import Home from './components/home'
import Footer from './components/footer';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false)

  return (
    <UserProvider>
      <ToastContainer />
      <div className='relative'>
        <div className={`transition-all duration-2500 ${!(isAuthenticated || isGuest) ? "absolute inset-0 opacity-40" : "opacity-100"}`}>
          <Home />
        </div>
        {!isAuthenticated && !isGuest && (
          <div className="absolute inset-0 transition-opacity duration-2500 ease-in-out">
            <Authentication setIsAuthenticated={setIsAuthenticated} setIsGuest={setIsGuest} />
          </div>
        )}
      </div>
      <Footer />
    </UserProvider>
  )
}

export default App
