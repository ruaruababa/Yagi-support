import { Button, Form } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';

import { District, Province, Ward } from '../services/types';
import LocationInput from './location-input';

export interface CreateForm {
  form: any;
  onSubmit: (values: any) => void;
  districts: District[];
  provinces: Province[];
  wards: Ward[];
}

const NeedSupportForm = ({
  form,
  onSubmit,
  districts,
  provinces,
  wards,
}: CreateForm) => {
  return (
    <div>
      <Form layout="vertical" className="mt-4" form={form} onFinish={onSubmit}>
        <div className="container-info grid grid-cols-2 gap-2">
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên',
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            label="SĐT"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại',
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>
        </div>
        <LocationInput
          districts={districts}
          provinces={provinces}
          wards={wards}
        />
        <Form.Item label="Mô tả thêm" name="description">
          <TextArea
            rows={6}
            placeholder="Số điện thoại dự phòng, Nhà cạnh bến xe bus, Mô tả chi tiết thông tin nhà, số lượng người, ..."
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button size="large" type="primary" htmlType="submit">
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NeedSupportForm;
