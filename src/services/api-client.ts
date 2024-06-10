import axios, { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constants";
import Cookies from "js-cookie";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `JWT ${token}`;
        console.log("Authorization header set: ", config.headers.Authorization);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiosInstance
            .get<FetchResponse<T>>(this.endpoint, config)
            .then(res => res.data);
    }

    get = (id: number | string) => {
        return axiosInstance
            .get<T>(this.endpoint + '/' + id)
            .then(res => res.data);
    }

    post = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then((res) => res.data);
    }
}

export default APIClient;