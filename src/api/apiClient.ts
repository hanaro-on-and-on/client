import axios from 'axios';

class ApiClient {
  //singleton pattern
  private static instance: ApiClient;
  private axiosInstance;

  constructor() {
    this.axiosInstance = ApiClient.createAxiosInstance();
  }

  //=========================
  // 메소드

  //==========================
  // 생성 메소드
  private static createAxiosInstance() {
    const headers = {
      'content-type': 'application/json',
    };

    const newInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 100000,
      headers,
    });

    newInstance.interceptors.request.use((config) => {
      config.headers['Content-Type'] = 'application/json';
      return config;
    });

    return newInstance;
  }
}

export default ApiClient;
