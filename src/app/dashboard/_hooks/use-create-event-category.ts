import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EVENT_CATEGORY_NAME_VALIDATOR, TEventCategoryValidator } from '@/lib/validators/event-category-validator';
export const useCreateEventCategory = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TEventCategoryValidator>({
    resolver: zodResolver(EVENT_CATEGORY_NAME_VALIDATOR),
  });

  const onSubmit = async (data: TEventCategoryValidator) => {};

  return {
    isOpen,
    setIsOpen,
    register,
    handleSubmit,
    onSubmit,
    formErrors: errors,
    watch,
    setValue,
  };
};
