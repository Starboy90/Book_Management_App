import { useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
import type { Book, NewBook } from '../types/book';

const { Option } = Select;

type Props = {
  open: boolean;
  mode: 'add' | 'edit';
  initial?: Book | null;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (data: NewBook) => void | Promise<void>;
};

export default function BookForm({
  open,
  mode,
  initial,
  loading = false,
  onCancel,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<NewBook & Partial<Book>>();

  // Reset or fill form when modal opens
  useEffect(() => {
    if (open) {
      if (initial) {
        form.setFieldsValue({
          title: initial.title,
          author: initial.author,
          genre: initial.genre,
          publishedYear: initial.publishedYear,
          status: initial.status,
        });
      } else {
        form.resetFields();
      }
    }
  }, [initial, form, open]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload: NewBook = {
        title: String(values.title),
        author: String(values.author),
        genre: String(values.genre),
        publishedYear: Number(values.publishedYear),
        status: (values.status as Book['status']) || 'Available',
      };
      await onSubmit(payload);
      form.resetFields(); // clear after submit
    } catch (err) {
      console.error('Validation Failed:', err);
    }
  };

  return (
    <Modal
      title={mode === 'add' ? 'Add New Book' : 'Edit Book'}
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      okText={mode === 'add' ? 'Add' : 'Save'}
      confirmLoading={loading}
      destroyOnHidden
    >
      <Form
        form={form} 
        layout="vertical"
        initialValues={{ status: 'Available' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title' }]}
        >
          <Input placeholder="Enter book title" />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: 'Please input the author' }]}
        >
          <Input placeholder="Enter author name" />
        </Form.Item>

        <Form.Item
          name="genre"
          label="Genre"
          rules={[{ required: true, message: 'Please input the genre' }]}
        >
          <Input placeholder="Enter genre (e.g. Fiction, Sci-Fi)" />
        </Form.Item>

        <Form.Item
          name="publishedYear"
          label="Published Year"
          rules={[
            { required: true, message: 'Please input the year' },
            {
              type: 'number',
              min: 1000,
              max: new Date().getFullYear(),
              message: 'Enter a valid year',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} placeholder="e.g. 2020" />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select>
            <Option value="Available">Available</Option>
            <Option value="Issued">Issued</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
