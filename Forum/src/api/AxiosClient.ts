import axios, { AxiosResponse } from 'axios'


const axiosClient = axios.create({
    baseURL:  import.meta.env.VITE_API_BASE_URL,

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