import { getAccessToken, setAccessToken } from "./access-token"
import jwt_decode from "jwt-decode"

const httpClient = (url, method, headers = {}, body = null) => {
  // const uri = process.env.NEXT_PUBLIC_BASE_API_URL + url
  return fetch(url, {
    method,
    body: body
      ? JSON.stringify({
          ...body,
        })
      : null,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...headers,
    },
    credentials: "include",
  })
}

const authorizedRequest = async (url, method, body = null) => {
  if (checkTokenExpired()) {
    await refreshToken()
  }
  // const uri = process.env.NEXT_PUBLIC_BASE_API_URL + url
  return fetch(url, {
    method,
    body: body
      ? JSON.stringify({
          ...body,
        })
      : null,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + getAccessToken(),
    },
    credentials: "include",
  })
}

const checkTokenExpired = () => {
  try {
    const decoded = jwt_decode(getAccessToken())
    return new Date().getTime() >= new Date(decoded.exp) * 1000
  } catch (error) {
    return false
  }
}

const refreshToken = async () => {
  const {
    data: { accessToken },
  } = await httpClient("api/refresh_token", "POST").then((res) => res.json())
  setAccessToken(accessToken)
}

export { httpClient, authorizedRequest }
