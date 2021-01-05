import { useRouter } from "next/router"
import { useReducer } from "react"
import { httpClient } from "../utils/httpClient"

const init = () => ({
  email: "",
  password: "",
})

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: action.payload,
      }

    case "UPDATE_PASSWORD":
      return {
        ...state,
        password: action.payload,
      }
    default:
      throw new Error()
  }
}

const Register = () => {
  const [state, dispatch] = useReducer(reducer, null, init)
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault();
    httpClient('api/users', 'POST', null, state).then(() => router.push('/login'))
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
            onChange={(e) =>
              dispatch({ type: "UPDATE_EMAIL", payload: e.target.value })
            }
            value={state.email}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            onChange={(e) =>
              dispatch({ type: "UPDATE_PASSWORD", payload: e.target.value })
            }
            value={state.password}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        <button
          type='button'
          className='btn btn-default'
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Register
