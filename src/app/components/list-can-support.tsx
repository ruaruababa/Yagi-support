import { Table, TableColumnsType, Tag } from 'antd';

import { NeedSupport } from '../services/types';

interface Props {
  data: NeedSupport[] | undefined;
}

const ListCanSupport = (props: Props) => {
  const { data } = props;

  const columns: TableColumnsType<NeedSupport> = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thông tin',
      dataIndex: 'description',
      key: 'description',
      render(value, record) {
        return (
          <div className="">
            <div

            // onClick={() => copyToClipboard(record.phoneNumber)}
            >
              <a
                className="flex cursor-pointer items-center gap-2"
                href={`tel:${record.phoneNumber}`}
              >
                <span className="text-blue-400">{record.phoneNumber}</span>{' '}
                <Tag color="blue">Gọi</Tag>
              </a>
              {/* <span>{record.phoneNumber}</span> <Tag color="green">Copy</Tag> */}
            </div>

            <p>{record.description}</p>
            <p>{record?.ward?.full_name ?? record?.district?.full_name}</p>
          </div>
        );
      },
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'status',
    //   width: 100,
    //   key: 'status',
    //   render: (status: boolean) => {
    //     return (
    //       <div className="flex items-center justify-center">
    //         <Checkbox defaultChecked={status} />
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div>
      <div className="py-5">
        <Table
          style={{
            padding: '3px',
          }}
          dataSource={data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default ListCanSupport;
