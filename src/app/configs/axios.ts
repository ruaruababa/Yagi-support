import axios, { CreateAxiosDefaults } from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/v1',
  timeout: 10_000,
});
interface RequestOptions extends CreateAxiosDefaults<any> {
  isAuth?: boolean;
}

export const request = async (options: RequestOptions) => {
  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  try {
    const response = await instance(options as any);
    return response?.data;
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else {
      throw error;
    }
  }

  // const response = await instance(options as any);
  // return response?.data;
};
