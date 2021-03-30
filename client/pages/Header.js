import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getAccessToken, setAccessToken } from "../utils/access-token"
import { authorizedRequest, httpClient } from "../utils/httpClient"

export default function Header() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState()

  const fetchMe = () =>
    authorizedRequest("api/me")
      .then((res) => res.json())
      .then((json) => {
        if (!json.ok) {
          router.push("/login")
        }
        setUserInfo(json.data.user)
        setLoading(false)
      })

  useEffect(() => {
    fetchMe()
  }, [])

  const logout = () => {
    httpClient("api/logout", "GET")
      .then((res) => res.json())
      .then((data) => {
        setAccessToken("")
        router.push("/login")
      })
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <a
              className='nav-link active'
              href='#'
              tabIndex='-1'
              aria-disabled='true'
              onClick={() => router.push("/")}
            >
              Home
            </a>
            <a
              className='nav-link active'
              href='#'
              onClick={() => {
                router.push("/profile")
              }}
            >
              Hello ✨✨ {userInfo && userInfo.name} ✨✨
            </a>
            <a
              className='nav-link active'
              href='#'
              tabIndex='-1'
              aria-disabled='true'
              onClick={logout}
            >
              Log out
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
