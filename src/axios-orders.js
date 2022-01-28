import axios from "axios";

const instance = axios.create({
    baseURL: 'https://blog-3dcd5-default-rtdb.firebaseio.com/'
}); 



export default  instance; 