import Head from "next/head"
// import styles from "../styles/Home.module.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { checkAuthorized, getAccessToken, setAccessToken } from "../utils/access-token"

export default function Home() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState()

  const fetchMe = () =>
    fetch("api/me", {
      headers: {
        Authorization: "Bearer " + getAccessToken(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.ok) {
          router.push("/login")
        }
        setUserInfo(json.data.user)
      })

  const fetchData = async () => {
    if (!getAccessToken()) {
      await checkAuthorized()
    }

    await fetchMe()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const logout = () => {
    fetch("/api/logout")
      .then((res) => res.json())
      .then((data) => {
        setAccessToken('');
        router.push("/login");
      })
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
              <div className='navbar-nav'>
                <a className='nav-link active' href='#'>
                  Hello {userInfo && userInfo.email}
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
      </main>
    </div>
  )
}

// Home.getInitialProps = async (ctx) => {
//   // const authenticated = await checkAuthorized();
//   return {

//   }
// }
