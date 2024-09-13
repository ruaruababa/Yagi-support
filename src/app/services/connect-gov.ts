import { GovConnectResponse } from './types';
import { request } from '../configs/axios';

export interface GovConnectQueries {
  district?: string;
  province?: string;
  ward?: string;
  status?: boolean;
  sortBy?: string;
  limit?: number;
  page?: number;
}

export interface CreateConnectGov {
  name: string;
  phoneNumber: string;
  province?: string;
  district?: string;
  ward: string;
  description?: string;
}

export const getConnectGov = (
  queries: GovConnectQueries,
): Promise<GovConnectResponse> => {
  return request({
    url: `/govs`,
    method: 'GET',
    params: queries,
  });
};

export const createConnectGov = (data: CreateConnectGov) => {
  return request({
    url: `/govs`,
    method: 'POST',
    data,
  });
};
