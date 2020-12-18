import Head from "next/head"
import styles from "../styles/Home.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getAccessToken } from "../utils/access-token"
export default function Home() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}api/me`, {
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
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello {userInfo && userInfo.email}</h1>
        <button
          onClick={() => {
            fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}logout`)
              .then((res) => res.json())
              .then((data) => {
                router.push("/login")
              })
          }}
        >
          Log out
        </button>
        <button
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
        </button>
        {/* <Link href='/users' as={"users"}>
          <a>Users</a>
        </Link> */}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
