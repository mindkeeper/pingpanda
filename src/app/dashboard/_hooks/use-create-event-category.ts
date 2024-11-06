import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EVENT_CATEGORY_VALIDATOR, TEventCategoryValidator } from '@/lib/validators/event-category-validator';
import { client } from '@/lib/client';
export const useCreateEventCategory = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<TEventCategoryValidator>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  });

  const { mutate: createEventCategory, isPending: isCreatingCategory } = useMutation({
    mutationFn: async (data: TEventCategoryValidator) => {
      await client.category.createEventCategory.$post(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-events-categories'],
      });
      reset();
      setIsOpen(false);
    },
  });

  const onSubmit = async (data: TEventCategoryValidator) => {
    createEventCategory(data);
  };

  return {
    isOpen,
    setIsOpen,
    register,
    handleSubmit,
    onSubmit,
    formErrors: errors,
    watch,
    setValue,
    isCreatingCategory,
  };
};
