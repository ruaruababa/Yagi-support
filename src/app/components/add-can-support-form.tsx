import { Button, Form } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';

import { CreateForm } from './add-need-support-form';
import LocationInput from './location-input';

const CanSupportForm = ({
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

        <Form.Item label="Mô tả về đoàn" name="description">
          <TextArea rows={6} placeholder="Thời gian dự kiến, số lượng ..." />
        </Form.Item>

        <Form.Item className="text-center">
          <Button size="large" type="primary">
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CanSupportForm;
