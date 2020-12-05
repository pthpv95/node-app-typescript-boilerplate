// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { useEffect } from "react"

export default (req, res) => {
  useEffect(() => {
    const baseUrl = "188.166.221.160" //process.env.BASE_API_URL
    fetch(baseUrl + "users").then((data) => {
      response.json().then(function (data) {
        console.log(data)
      })
    })
  }, [])
}
