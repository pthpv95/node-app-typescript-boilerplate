let accessToken = ""

const setAccessToken = (token) => {
  accessToken = token
}

const getAccessToken = () => accessToken;

const checkAuthorized = () => {
  if (accessToken) return new Promise((res) => res(accessToken))

  return fetch("http://hp.com/api/refresh_token", {
    method: "POST",
  })
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
