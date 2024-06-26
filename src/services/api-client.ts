import axios, { AxiosRequestConfig } from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constants";
import Cookies from "js-cookie";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
}

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

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
    
    delete = (id: number | string) => {
        return axiosInstance
            .delete(this.endpoint + '/' + id)
            .then(res => res.data);
    }

    post = (data: T) => {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then((res) => res.data);
    }
}

export default APIClient;