// export const createDevice = (data) => {
//   return request({
//     url: `/devices`,
//     method: 'POST',
//     data,
//   });
// };

import { ProvinceResponse } from './types';
import { request } from '../configs/axios';

export interface GetProvincesQueries {
  name?: string;
  code?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export const getProvinces = (
  queries: GetProvincesQueries,
): Promise<ProvinceResponse> => {
  return request({
    url: `/provinces`,
    method: 'GET',
    params: queries,
  });
};
