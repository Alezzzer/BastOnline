import axios from "axios";

const BASE_REST_API_ADMIN_URL = 'http://localhost:8080/api/admin';
const BASE_REST_API_MANAGER_URL= 'http://localhost:8080/api/manager'




export const addProduct = (product) => axios.post(BASE_REST_API_ADMIN_URL+'/addProduct', product)

export const getProducts = () => axios.get(BASE_REST_API_ADMIN_URL + '/getProducts');

export const deleteProduct = (id) => axios.delete(BASE_REST_API_ADMIN_URL + '/deleteProduct' + '/' +id);

export const updateProduct = (id, product) => axios.put(BASE_REST_API_ADMIN_URL + '/updateProduct' + '/' + id, product);