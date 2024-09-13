import { StaySupportResponse } from './types';
import { request } from '../configs/axios';

export interface StaySupportQueries {
  district?: string;
  province?: string;
  ward?: string;
  status?: boolean;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface CreateStaySupport {
  name: string;
  phoneNumber: string;
  province?: string;
  district?: string;
  ward: string;
  description?: string;
}

export const getStaySupport = (
  queries: StaySupportQueries,
): Promise<StaySupportResponse> => {
  return request({
    url: `/stays`,
    method: 'GET',
    params: queries,
  });
};

export const createStaySupport = (data: CreateStaySupport) => {
  return request({
    url: `/stays`,
    method: 'POST',
    data,
  });
};
