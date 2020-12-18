import Head from "next/head"
import styles from "../styles/Home.module.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  checkAuthorized,
  getAccessToken,
  setAccessToken,
} from "../utils/access-token"

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

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <p className={styles.title}>Hello {userInfo && userInfo.email}</p>
        <button
          onClick={() => {
            fetch("/api/logout")
              .then((res) => res.json())
              .then((data) => {
                router.push("/login")
              })
          }}
        >
          Log out
        </button>
        {/* <button
          onClick={() => {
            fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}refresh_token`, {
              method: "POST",
            })
              .then((res) => res.json())
              .then((json) => {
                // if (!json.ok) {
                //   router.push("/login")
                // }
                // setUserInfo(json.data.user)
              })
          }}
        >
          Refresh token
        </button> */}
        {/* <Link href='/users' as={"users"}>
          <a>Users</a>
        </Link> */}
      </main>
    </div>
  )
}

// Home.getInitialProps = async (ctx) => {
//   // const authenticated = await checkAuthorized();
//   return {

//   }
// }
