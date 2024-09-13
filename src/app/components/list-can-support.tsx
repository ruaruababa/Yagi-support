import { Table, TableColumnsType, TablePaginationConfig, Tag } from 'antd';

import { NeedSupport } from '../services/types';

interface Props {
  data: NeedSupport[] | undefined;
  pagination: TablePaginationConfig;
}

const ListCanSupport = (props: Props) => {
  const { data, pagination } = props;

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
  ];

  return (
    <div>
      <div className="py-5">
        <Table
          key={'can-support'}
          style={{
            padding: '3px',
          }}
          dataSource={data}
          columns={columns}
          rowKey={(record) => record._id}
          pagination={false}
          rowHoverable
          onRow={(record, index) => {
            //0 2 4 6 8
            return {
              //hover changed row style
              style: {
                backgroundColor: (index as any) % 2 === 0 ? 'white' : '#dddddd',
                cursor: 'pointer',
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default ListCanSupport;
