import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { authorizedRequest } from "../utils/httpClient"

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null)
  const router = useRouter()

  const fetchUser = () => {
    authorizedRequest("api/me", "GET")
      .then((res) => res.json())
      .then((jsonObj) => {
        setUserInfo(jsonObj.data.user)
      })
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return userInfo ? (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        authorizedRequest("api/users", "PUT", {
          ...userInfo,
        })
      }}
    >
      <div className='col-3'>
        <label className='form-label'>Name</label>
        <input
          type='text'
          className='form-control'
          placeholder='Name'
          value={userInfo.name}
          onChange={(e) => {
            setUserInfo({
              ...userInfo,
              name: e.target.value,
            })
          }}
        />
      </div>
      <div className='col-3'>
        <label className='form-label'>Email </label>
        <input
          value={userInfo.email}
          readOnly
          placeholder='Email'
          className='form-control'
        />
      </div>
      <div className='col-12'>
        <button className='btn btn-primary' type='submit'>
          Save
        </button>
      </div>
    </form>
  ) : (
    <></>
  )
}

export default Profile
