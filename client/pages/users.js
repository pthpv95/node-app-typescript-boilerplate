import styles from "../styles/Home.module.css"

const User = ({users}) => {
  return (
    <div className={styles.main}>
      {users.map((user) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const baseUrl = `${process.env.BASE_API_URL}api/users`
  const res = await fetch(baseUrl)
  const users = await res.json()
  return {
    props: {
      users,
    },
  }
}

export default User