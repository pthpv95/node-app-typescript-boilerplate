import "../styles/bootstrap.css"
import "../styles/globals.css"
import { setAccessToken } from "../utils/access-token"
import { httpClient } from "../utils/httpClient"
import Header from "./Header"
import Footer from "./Footer"
import { useEffect } from "react"
const isServer = () => typeof window === "undefined"
const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
function AppComponent({ Component, pageProps }) {
  if (pageProps && pageProps.token) {
    setAccessToken(pageProps.token)
  }

  return (
    <div>
      <Header />
      <div className='container'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  let pageProps = {}
  if (isServer()) {
    const cookies = parseCookie(appContext.ctx.req.headers.cookie)
    const token = await httpClient("api/refresh_token", "POST", {
      cookie: "rftk=" + cookies.rftk,
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.ok) {
          return jsonRes.data.accessToken
        } else {
          return ""
        }
      })

    pageProps = {
      token,
    }

    return {
      pageProps,
    }
  }

  return pageProps
}

export default AppComponent
