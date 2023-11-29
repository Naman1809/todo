import axios from "axios";
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://nodejs-todoapp-8na4.onrender.com',

  });
  export default instance;