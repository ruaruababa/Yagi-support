import { NeedSupportResponse } from './types';
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

export interface CreateNeedSupport {
  name: string;
  phoneNumber: string;
  province?: string;
  district?: string;
  ward: string;
  description?: string;
}

export const getNeeds = (
  queries: NeedSupportQueries,
): Promise<NeedSupportResponse> => {
  return request({
    url: `/needs`,
    method: 'GET',
    params: queries,
  });
};

export const createNeedSupport = (data: CreateNeedSupport) => {
  return request({
    url: `/needs`,
    method: 'POST',
    data,
  });
};

export const updateNeedStatus = (data: { id: string; status: boolean }) => {
  return request({
    url: `/needs/${data.id}`,
    method: 'PATCH',
    data,
  });
};
