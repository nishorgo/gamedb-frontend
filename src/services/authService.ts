import axios from 'axios';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN, BASE_URL } from '../constants';

export interface AuthResponse {
  access: string;
  refresh: string;
}

const API_URL = `${BASE_URL}/auth/`;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async register(username: string, email: string, password: string): Promise<any> {
    const response = await axiosInstance.post('users/', { username, email, password });
    return response.data;
  }

  public async setToken(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>('jwt/create/', { username, password });
      const authData = response.data;
  
      if (!authData.access || !authData.refresh) {
        throw new Error('Missing token in response');
      }
      const { access, refresh } = authData;
      Cookies.set(ACCESS_TOKEN, access, { secure: true, });
      Cookies.set(REFRESH_TOKEN, refresh, { secure: true, });
      console.log()
  
      return authData;
    } catch (error) {
      console.error('Error setting token:', error);
      throw error;
    }
  }

  public refreshToken = async () => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    try {
      const res = await axiosInstance.post("/jwt/refresh/", {
        refresh: refreshToken,
      });
      Cookies.set(ACCESS_TOKEN, res.data.token, { secure: true });
    } catch (error) {
      console.log(error);
    }
  };

  public removeToken(): void {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
  }
}

export default AuthService.getInstance();
