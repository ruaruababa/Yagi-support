import { CanSupportResponse } from './types';
import { request } from '../configs/axios';

export interface NeedSupportQueries {
  district?: string;
  province?: string;
  ward?: string;
  status?: boolean;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface CreateCanSupport {
  name: string;
  phoneNumber: string;
  province?: string;
  district?: string;
  ward: string;
  description?: string;
}

export const getCans = (
  queries: NeedSupportQueries,
): Promise<CanSupportResponse> => {
  return request({
    url: `/cans`,
    method: 'GET',
    params: queries,
  });
};

export const createCanSupport = (data: CreateCanSupport) => {
  return request({
    url: `/cans`,
    method: 'POST',
    data,
  });
};
