import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Book, NewBook } from '../types/book';
import * as api from '../api/booksApi';

export function useBooks() {
  return useQuery<Book[], Error>(['books'], api.getBooks, {
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}

export function useAddBook() {
  const qc = useQueryClient();
  return useMutation<Book, Error, NewBook>(api.addBook, {
    onSuccess: () => qc.invalidateQueries(['books']),
  });
}

export function useUpdateBook() {
  const qc = useQueryClient();
  return useMutation<Book, Error, { id: number; book: NewBook }>(
    ({ id, book }) => api.upadateBook(id, book),
    { onSuccess: () => qc.invalidateQueries(['books']) }
  );
}

export function useDeleteBook() {
  const qc = useQueryClient();
  return useMutation<void, Error, number>(api.deletBook, {
    onSuccess: () => qc.invalidateQueries(['books']),
  });
}
