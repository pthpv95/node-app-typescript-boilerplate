// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { useEffect, useState } from "react"

const User = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}api/users`
    fetch(baseUrl).then((response) => {
      response.json().then(function (data) {
        console.log(data)
        setUsers(data)
      })
    })
  }, [])

  return (
    <div>
      {users.map((user, index) => (
        <p key={index}>{user.email}</p>
      ))}
    </div>
  )
}

export default User