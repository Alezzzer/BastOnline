import axios from "axios";

const BASE_REST_API_ADMIN_URL = 'http://localhost:8080/api/admin';
const BASE_REST_API_MANAGER_URL= 'http://localhost:8080/api/manager'
// export function getAllTodos(){
//     return axios.get(BASE_REST_API_URL);
// }

// Add a request interceptor
// axios.interceptors.request.use(function (config) {

//     config.headers['Authorization'] = getToken();

//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

// export const getAllTodos = () => axios.get(BASE_REST_API_URL)

// export const saveTodo = (todo) => axios.post(BASE_REST_API_URL, todo)

// export const getTodo = (id) => axios.get(BASE_REST_API_URL + '/' + id)

// export const updateTodo = (id, todo) => axios.put(BASE_REST_API_URL + '/' + id, todo)

// export const deleteTodo = (id) => axios.delete(BASE_REST_API_URL + '/' + id)


export const addProduct = (product) => axios.post(BASE_REST_API_ADMIN_URL+'/addProduct', product)

export const getProducts = () => axios.get(BASE_REST_API_ADMIN_URL + '/getProducts');

export const deleteProduct = (id) => axios.delete(BASE_REST_API_ADMIN_URL + '/deleteProduct/' + id);

export const updateProduct = (product, id) => axios.put(BASE_REST_API_ADMIN_URL + '/updateProduct' + id, product);