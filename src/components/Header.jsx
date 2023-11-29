import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from '../axios.config'
import toast from 'react-hot-toast'

const Header = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
  } = useContext(Context)

  const logoutHandler = async () => {
    setLoading(true)
    try {
      const {data} = await axios.get(`/api/v1/users/logout`)

      toast.success(data.message)
      setIsAuthenticated(false)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setIsAuthenticated(true)
      setLoading(false)
    }
  }

  return (
    <nav className="header">
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} className="btn" onClick={logoutHandler}>
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </article>
    </nav>
  )
}

export default Header
