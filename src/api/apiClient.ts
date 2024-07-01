import axios from 'axios';
import employeeApi from './interfaces/employeeApi';

class ApiClient implements employeeApi {
  //singleton pattern
  private static instance: ApiClient;
  private axiosInstance;

  constructor() {
    this.axiosInstance = ApiClient.createAxiosInstance();
  }

  //=========================
  // 메소드

  //알바생 - 근무지 수동 추가
  public async manualWorkPlaceAddition(req: ManualWorkPlaceAdditionRequest) {
    const response = await this.axiosInstance.request({
      method: 'post',
      url: '/employee/work-places/custom',
      data: req,
    });

    return response.data;
  }

  //알바생 - 서명 요청 목록
  public async getConfirmReq() {
    const response = await this.axiosInstance.request({
      method: 'get',
      url: 'employee/work-places/invitation',
    });

    return response.data;
  }

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
      config.headers['Authorization'] =
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;
      return config;
    });

    return newInstance;
  }

  static getInstance(): ApiClient {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }
}

export default ApiClient;
