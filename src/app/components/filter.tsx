import { Select } from 'antd';

import { DEFAULT_PROVINCE } from '@/constant/const';
import { filterOption } from '@/helpers/filter';

import { District, Province, Ward } from '../services/types';

interface FilterProps {
  onChangeProvince: (value: string) => void;
  onChangeDistrict: (value: string) => void;
  onChangeWard: (value: string) => void;
  provinces: Province[];
  districts: District[];
  wards: Ward[];
}

const Filter = (props: FilterProps) => {
  const {
    onChangeProvince,
    onChangeDistrict,
    onChangeWard,
    provinces,
    districts,
    wards,
  } = props;

  return (
    <div className="min-md:grid-cols-3 grid gap-2">
      <Select
        allowClear
        showSearch
        size="large"
        placeholder="Tỉnh/Thành phố"
        onChange={onChangeProvince}
        options={provinces}
        fieldNames={{ label: 'name', value: 'code' }}
        filterOption={filterOption}
        defaultValue={DEFAULT_PROVINCE}
      />
      <Select
        size="large"
        placeholder="Quận/Huyện/Thị xã"
        onChange={onChangeDistrict}
        allowClear
        showSearch
        options={districts}
        placement="bottomRight"
        filterOption={filterOption}
        fieldNames={{ label: 'name', value: 'code' }}
      />
      <Select
        size="large"
        placeholder="Phường/Xã"
        onChange={onChangeWard}
        allowClear
        showSearch
        options={wards}
        placement="bottomLeft"
        filterOption={filterOption}
        fieldNames={{ label: 'name', value: 'code' }}
      />
    </div>
  );
};

export default Filter;
