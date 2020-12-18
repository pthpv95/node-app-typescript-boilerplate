import { useState } from "react";
import { useRouter } from 'next/router'
import { setAccessToken } from "../utils/access-token";

const Login = (props) => {
  const [email, setEmail] = useState('abc@gmail.com')
  const [password, setPassword] = useState('123')
  const router = useRouter()

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      fetch('/api/login', {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
          for (var pair of response.headers.entries()){
            console.log(pair)
          }
          return response.json();
        })
        .then((res) => {
          if (!res.ok) {
            alert(res.data.message)
            return
          }
          setAccessToken(res.data.accessToken);
          router.push('/')
        })
    }}>
      <div>
        <label>Email</label>
        <input value={email} type='text' onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div>
        <label>Password</label>
        <input password={password} type='password' onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type='submit'>Log in</button>
    </form>
  )
}

export default Login