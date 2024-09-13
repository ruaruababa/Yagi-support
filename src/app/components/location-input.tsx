import { Form, Select } from 'antd';

import { DEFAULT_PROVINCE } from '@/constant/const';
import { filterOption } from '@/helpers/filter';

import useSupportYagi from '../hooks/useSupportYagi';

const LocationInput = () => {
  const { districts, provinces, wards } = useSupportYagi();
  return (
    <div className="grid grid-cols-3 gap-2">
      <Form.Item
        name="province"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn Tỉnh/Thành phố',
          },
        ]}
      >
        <Select
          allowClear
          showSearch
          size="large"
          placeholder="Tỉnh/Thành phố"
          options={provinces}
          fieldNames={{ label: 'name', value: 'code' }}
          filterOption={filterOption}
          defaultValue={DEFAULT_PROVINCE}
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn Quận/Huyện/Thị xã',
          },
        ]}
        name="district"
      >
        <Select
          size="large"
          placeholder="Quận/Huyện/Thị xã"
          allowClear
          showSearch
          options={districts}
          placement="bottomRight"
          filterOption={filterOption}
          fieldNames={{ label: 'name', value: 'code' }}
        />
      </Form.Item>
      <Form.Item name="ward">
        <Select
          size="large"
          placeholder="Phường/Xã"
          allowClear
          showSearch
          options={wards}
          placement="bottomLeft"
          filterOption={filterOption}
          fieldNames={{ label: 'name', value: 'code' }}
        />
      </Form.Item>
    </div>
  );
};

export default LocationInput;
