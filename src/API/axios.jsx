import axios from "axios";
const axiosInstance = axios.create({ 
    baseURL: "https://amazon-api-deploy-xgts.onrender.com/"
 });
export { axiosInstance };
