import { useState } from "react"
import { useRouter } from "next/router"
import { setAccessToken } from "../utils/access-token"

const Login = (props) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((res) => {
        if (!res.ok) {
          alert(res.data.message)
          return
        }
        setAccessToken(res.data.accessToken)
        router.push("/")
      })
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            aria-describedby='emailHelp'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
