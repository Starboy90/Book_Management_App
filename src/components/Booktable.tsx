import { Table, Space, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Book } from '../types/book';
import './BookTable.css';

type Props = {
  books: Book[];
  loading: boolean;
  onEdit: (b: Book) => void;
  onDelete: (b: Book) => void;
  pageSize?: number;
};

export default function BookTable({
  books,
  loading,
  onEdit,
  onDelete,
  pageSize = 10,
}: Props) {
  const columns: ColumnsType<Book> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    { title: 'Genre', dataIndex: 'genre', key: 'genre', responsive: ['md'] },
    {
      title: 'Year',
      dataIndex: 'publishedYear',
      key: 'publishedYear',
      sorter: (a, b) => a.publishedYear - b.publishedYear,
      responsive: ['lg'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag className={text === 'Available' ? 'status-available' : 'status-issued'}>
          {text}
        </Tag>
      ),
      responsive: ['sm'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            className="action-edit"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            className="action-delete"
            onClick={() => onDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={books}
      loading={loading}
      pagination={{ pageSize }}
      className="book-table"
      scroll={{ x: true }}   
    />
  );
}
