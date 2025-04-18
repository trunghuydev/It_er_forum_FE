import axios, { AxiosResponse } from 'axios'


const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api/v1',

    headers: {
        'Content-Type': 'application/json',
    },
})

// bắt response từ api 
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log("Response:", response.data);
        return response
    },
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
)


axiosClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('accessToken')
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})



export default axiosClient