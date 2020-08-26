import axios from 'axios'

const getUser = id => axios.get(`/users/${id}`)

const getUsers = () => axios.get("/users")

const createUser = user => axios.post("/users", user)

const updateUser = values => axios.put("/users", values)

const deleteUser = id => axios.delete(`/users/${id}`)

const UserApi = { getUser, getUsers, createUser, updateUser, deleteUser }

export default UserApi
export { getUser, getUsers, createUser, updateUser, deleteUser }