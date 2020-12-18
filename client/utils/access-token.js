let accessToken = ''

const setAccessToken = (token) => {
  accessToken = token
}

const getAccessToken = () => accessToken

export {
  setAccessToken,
  getAccessToken
}