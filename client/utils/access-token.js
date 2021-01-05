import { authorizedRequest } from "./httpClient";

let accessToken = ""

const setAccessToken = (token) => {
  accessToken = token
}

const getAccessToken = () => accessToken;

const checkAuthorized = () => {
  if (accessToken) return new Promise((res) => res(true))

  return authorizedRequest("api/refresh_token", "POST")
    .then((res) => res.json())
    .then((jsonResponse) => {
      if (jsonResponse.ok) {
        accessToken = jsonResponse.data.accessToken
        return true
      }

      return false
    })
}

export { setAccessToken, getAccessToken, checkAuthorized }
