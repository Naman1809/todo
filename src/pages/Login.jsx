import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import axios from '../axios.config'
// import axios from 'axios';
const Login = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loading,
    setLoading,
  } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);

    // console.log(name, email, password)
    try {
      const { data } = await axios.post(
        `/api/v1/users/login`,

        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            //             "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
          },
          withCredentials: true,
        },
      )

      toast.success(data.message)
      setIsAuthenticated(true)
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setIsAuthenticated(false)
      setLoading(false);

    }
  }

  if (isAuthenticated) return <Navigate to={'/'} />

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
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
          <button type="submit" disabled={loading}>Login</button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login
