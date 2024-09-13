import { DistrictResponse } from './types';
import { request } from '../configs/axios';

export interface GetDistrictsQueries {
  name?: string;
  code?: string;
  province_code?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export const getDistricts = (
  queries: GetDistrictsQueries,
): Promise<DistrictResponse> => {
  return request({
    url: `/districts`,
    method: 'GET',
    params: queries,
  });
};
