import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../settings/ThemeToggle';


function Header({ title }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
      <div className='px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center'>
        <h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
        <div className='flex items-center space-x-4'>
          <ThemeToggle />
            <button onClick={() => logout(navigate)} >
                  Logout
            </button>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header

