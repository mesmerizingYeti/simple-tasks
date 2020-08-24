import axios from 'axios'

const getTask = id => axios.get(`/tasks/${id}`)

const getTasks = () => axios.get("/tasks")

const getUserTasks = () => axios.get(`/tasks/user`)

const createTask = task => axios.post("/tasks", task)

const updateTask = value => axios.put("/tasks", value)

// data is structured as follows:
//  { ids: [], values: []}
const updateTasks = data => axios.put("/tasks", data)

const deleteTask = id => axios.delete(`/tasks/${id}`)

const TaskApi = { getTask, getTasks, getUserTasks, createTask, updateTask, deleteTask }

export default TaskApi
export { getTask, getTasks, getUserTasks, createTask, updateTask, deleteTask }
