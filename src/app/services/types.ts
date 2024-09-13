export interface BaseResponse<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface District {
  code: string;
  name: string;
  unit: string;
  province_code: string;
  province_name: string;
  full_name: string;
  id: string;
}

export interface Province {
  code: string;
  name: string;
  unit: string;
  id: string;
}

export interface Ward {
  code: string;
  name: string;
  unit: string;
  district_code: string;
  district_name: string;
  province_code: string;
  province_name: string;
  full_name: string;
  id: string;
}

export type ProvinceResponse = BaseResponse<Province>;
export type DistrictResponse = BaseResponse<District>;
export type WardResponse = BaseResponse<Ward>;

export interface Province {
  _id: string;
  code: string;
  name: string;
  unit: string;
}

export interface District {
  _id: string;
  code: string;
  name: string;
  unit: string;
  province_code: string;
  province_name: string;
  full_name: string;
}

export interface Ward {
  _id: string;
  code: string;
  name: string;
  unit: string;
  district_code: string;
  district_name: string;
  province_code: string;
  province_name: string;
  full_name: string;
}

export interface NeedSupport {
  _id: string;
  name: string;
  phoneNumber: string;
  description: string;
  province: Province;
  district: District;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  ward?: Ward;
  id?: string;
  status?: boolean;
}

export type NeedSupportResponse = BaseResponse<NeedSupport>;
export type CanSupportResponse = BaseResponse<NeedSupport>;
export type StaySupportResponse = BaseResponse<NeedSupport>;
export type GovConnectResponse = BaseResponse<NeedSupport>;

export type TagKeyType =
  | 'list-need-support'
  | 'add-support-info'
  | 'list-support-teams'
  | 'add-support-teams-info'
  | 'list-accommodations'
  | 'add-accommodations-info'
  | 'connect-authorities'
  | 'add-connect-authorities';

// Define the type for the tag
export interface TagType {
  key: TagKeyType;
  label: string;
  hiddenFilter?: boolean;
}

export const tags: TagType[] = [
  { key: 'list-need-support', label: 'Danh sách cần hỗ trợ' },
  { key: 'add-support-info', label: 'Yêu cầu hỗ trợ', hiddenFilter: true },
  { key: 'list-support-teams', label: 'Danh sách đoàn hỗ trợ' },
  {
    key: 'add-support-teams-info',
    label: 'Thêm đoàn hỗ trợ',
    hiddenFilter: true,
  },
  { key: 'list-accommodations', label: 'Danh sách chỗ ăn nghỉ' },
  {
    key: 'add-accommodations-info',
    label: 'Thêm chỗ ăn nghỉ',
    hiddenFilter: true,
  },
  { key: 'connect-authorities', label: 'Kết nối chính quyền' },
  {
    key: 'add-connect-authorities',
    label: 'Thêm thông tin kết nối',
    hiddenFilter: true,
  },
];
