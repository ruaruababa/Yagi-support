import { WardResponse } from './types';
import { request } from '../configs/axios';

export interface GetWardsQueries {
  name?: string;
  code?: string;
  province_code?: string;
  district_code?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export const getWards = (queries: GetWardsQueries): Promise<WardResponse> => {
  return request({
    url: `/wards`,
    method: 'GET',
    params: queries,
  });
};
