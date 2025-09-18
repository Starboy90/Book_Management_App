import { Modal } from 'antd';
import type { Book } from '../types/book';
import { playSound } from '../utils/playSound';

type Props = {
  book?: Book | null;
  onConfirm: () => void;
};

export default function showDeleteConfirm({ book, onConfirm }: Props) {
    playSound('/sounds/delete.mp3');
  Modal.confirm({
    title: 'Confirm Deletion',
    content: `Are you sure you want to delete "${book?.title}"?`,
    okText: 'Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk: onConfirm,
  });
}
