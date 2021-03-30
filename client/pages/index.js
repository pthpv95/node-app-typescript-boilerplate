import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getAccessToken, setAccessToken } from "../utils/access-token"
import { authorizedRequest, httpClient } from "../utils/httpClient"

export default function LandingPage({ Component, pageProps }) {
  return (
    <div>
      hello content
    </div>
  )
}
