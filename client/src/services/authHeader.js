export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('thebasacadmin')) || null

  if(user && user.token) {
    return { Authorization: 'Bearer ' + user.token }
  } else {
    return {}
  }
}