import { Button, Form, Select } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';

import { CreateForm } from './add-need-support-form';

const CanSupportForm = ({ form, onSubmit }: CreateForm) => {
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
              size="large"
              placeholder="Tỉnh/Thành phố"
              allowClear
              showSearch
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
            />
          </Form.Item>
          <Form.Item name="ward">
            <Select
              size="large"
              placeholder="Phường/Xã"
              allowClear
              showSearch
            />
          </Form.Item>
        </div>
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
