import axios from 'axios'

const checkGoogleAuth =() => 
  axios.get('http://localhost:3001/auth/login/success', {
    withCredentials: true,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true
    }
  })

const UserAuthApi = { checkGoogleAuth }

export default UserAuthApi
export { checkGoogleAuth }