import { client } from '@/lib/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useDeleteQuery = () => {
  const queryClient = useQueryClient();
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);

  const { mutate, isPending: isDeleting } = useMutation({
    mutationFn: async (name: string) => {
      console.log('name', name);
      await client.category.deleteCategory.$post({ name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-events-categories'],
      });
      setDeletingCategory(null);
    },
    onError: (error) => {
      console.error(error.message);
      setDeletingCategory(null);
    },
  });

  const deleteCategory = () => {
    if (deletingCategory) {
      mutate(deletingCategory);
    }
  };
  return {
    deleteCategory,
    isDeleting,
    deletingCategory,
    setDeletingCategory,
  };
};
