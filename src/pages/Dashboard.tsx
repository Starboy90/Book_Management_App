import { useMemo, useState } from 'react';
import { Button, Input, Select, Row, Col, message, Skeleton, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BookTable from '../components/Booktable';
import BookForm from '../components/BookForm';
import showDeleteConfirm from '../components/DeleteConfirm';
import type { Book, NewBook } from '../types/book';
import { playSound } from '../utils/playSound';
import { useBooks, useAddBook, useUpdateBook, useDeleteBook } from '../hooks/useBooks';
import './Dashboard.css';

const { Search } = Input;
const { Option } = Select;

export default function Dashboard() {
  const { data: books = [], isLoading, isFetching } = useBooks();
  const addMut = useAddBook();
  const updateMut = useUpdateBook();
  const deleteMut = useDeleteBook();

  // State
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<string>('All');
  const [status, setStatus] = useState<string>('All');
  const [pageSize] = useState(10);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editing, setEditing] = useState<Book | null>(null);

  // ✅ Filter books
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      if (genre && genre !== 'All' && b.genre !== genre) return false;
      if (status && status !== 'All' && b.status !== status) return false;
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
      );
    });
  }, [books, query, genre, status]);

  // Handlers
  const openAdd = () => {
    playSound('/sounds/notification.mp3');
    setFormMode('add');
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (b: Book) => {
    playSound('/sounds/notification.mp3');
    setFormMode('edit');
    setEditing(b);
    setFormOpen(true);
  };

  const handleSubmit = async (payload: NewBook) => {
    try {
      if (formMode === 'add') {
        await addMut.mutateAsync(payload);
        message.success('Book added');
      } else if (editing) {
        await updateMut.mutateAsync({ id: editing.id, book: payload });
        message.success('Book updated');
      }
      setFormOpen(false);
      setEditing(null);
    } catch (err: any) {
      message.error(err?.message || 'Operation failed');
    }
  };

  const handleDelete = (b: Book) => {
    showDeleteConfirm({
      book: b,
      onConfirm: async () => {
        try {
          await deleteMut.mutateAsync(b.id);
          message.success('Book deleted');
        } catch (err: any) {
          message.error(err?.message || 'Delete failed');
        }
      },
    });
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
          {/* Search */}
          <Col xs={24} sm={12} md={10}>
            <Search
              placeholder="Search title or author"
              allowClear
              onChange={(e) => setQuery(e.target.value)}
              enterButton
            />
          </Col>

          {/* Genre Filter */}
          <Col xs={12} sm={6} md={4}>
            <Select
              value={genre}
              style={{ width: '100%' }}
              onChange={(v) => setGenre(v)}
            >
              <Option value="All">All</Option>
              {Array.from(new Set(books.map((b) => b.genre))).map((g) => (
                <Option key={g} value={g}>
                  {g}
                </Option>
              ))}
            </Select>
          </Col>

          {/* Status Filter */}
          <Col xs={12} sm={6} md={4}>
            <Select
              value={status}
              style={{ width: '100%' }}
              onChange={(v) => setStatus(v)}
            >
              <Option value="All">All</Option>
              <Option value="Available">Available</Option>
              <Option value="Issued">Issued</Option>
            </Select>
          </Col>

          {/* Add Book Button */}
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
              Add Book
            </Button>
          </Col>
        </Row>

        {/*  First load -> Skeleton, after that -> Table with overlay spinner */}
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <Spin
            spinning={
              isFetching || addMut.isLoading || updateMut.isLoading || deleteMut.isLoading
            }
            tip="Loading..."
          >
            <BookTable
              books={filtered}
              loading={false} 
              onEdit={openEdit}
              onDelete={handleDelete}
              pageSize={pageSize}
            />
          </Spin>
        )}

        {/* Book Form (Add/Edit Modal) */}
        <BookForm
          open={formOpen}
          mode={formMode}
          initial={editing ?? null}
          loading={addMut.isLoading || updateMut.isLoading}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
