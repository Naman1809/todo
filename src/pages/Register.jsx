import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from '../axios.config'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
// import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
  } = useContext(Context)

  const submitHandler = async (e) => {
    setLoading(false)

    e.preventDefault()
    console.log(name, email, password)
    try {
      const { data } = await axios.post(
        `/api/v1/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      toast.success(data.message)
      setIsAuthenticated(true)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setIsAuthenticated(false)
      setLoading(false)
    }
  }

  if (isAuthenticated) return <Navigate to={'/'} />

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            typr="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            Sign Up
          </button>
          <h4>Or</h4>
          <Link to="/register">Login</Link>
        </form>
      </section>
    </div>
  )
}

export default Register
