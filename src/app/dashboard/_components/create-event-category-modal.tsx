'use client';

import { PropsWithChildren, useMemo } from 'react';
import { useCreateEventCategory } from '../_hooks/use-create-event-category';
import { Modal } from '@/components/ui/modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { COLOR_OPTIONS } from '../_constants/color';
import { cn } from '@/lib/utils';
import { EMOJI_OPTIONS } from '../_constants/emoji';
import { Button } from '@/components/ui/button';

interface CreateEventCategoryModalProps extends PropsWithChildren {
  containerClassName?: string;
}
export default function CreateEventCategoryModal({ children, containerClassName }: CreateEventCategoryModalProps) {
  const { isOpen, setIsOpen, register, handleSubmit, onSubmit, formErrors, watch, setValue, isCreatingCategory } =
    useCreateEventCategory();
  const watchColor = watch('color');
  const selectedEmoji = watch('emoji');
  const creteText = useMemo(() => (isCreatingCategory ? 'Creating Category...' : 'Create Category'), [isCreatingCategory]);
  return (
    <>
      <div className={containerClassName} onClick={() => setIsOpen(true)}>
        {children}
      </div>

      <Modal showModal={isOpen} setShowModal={setIsOpen} className='max-w-xl p-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <h2 className='text-lg/7 font-medium tracking-tight text-gray-950'>New Event Category</h2>
            <p className='text-sm/6 text-gray-600'>Create a new event category to organize your events.</p>
          </div>
          <div className='space-y-5'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input autoFocus id='name' {...register('name')} placeholder='e.g. user-signup' className='w-full' />
              {formErrors.name ? <p className='mt-1 text-sm text-red-500'>{formErrors.name.message}</p> : null}
            </div>
            <div>
              <Label htmlFor='color'>Color</Label>
              <div className='flex flex-wrap gap-3'>
                {COLOR_OPTIONS.map((color) => (
                  <button
                    type='button'
                    key={color}
                    className={cn(
                      `bg-[${color}]`,
                      'size-10 rounded-full ring-2 ring-offset-2 transition-all ring-transparent hover:scale-105',
                      {
                        'ring-brand-700 scale-110': watchColor === color,
                      }
                    )}
                    onClick={() => setValue('color', color)}
                  ></button>
                ))}
              </div>
              {formErrors.color ? <p className='mt-1 text-sm text-red-500'>{formErrors.color.message}</p> : null}
            </div>
            <div>
              <Label htmlFor='emoji'>Emoji</Label>
              <div className='flex flex-wrap gap-3'>
                {EMOJI_OPTIONS.map(({ emoji }) => (
                  <button
                    type='button'
                    key={emoji}
                    className={cn(
                      'size-10 flex items-center justify-center text-xl rounded-md bg-brand-100 hover:bg-brand-200 transition-all',
                      {
                        'ring-2 ring-brand-700 scale-110': selectedEmoji === emoji,
                      }
                    )}
                    onClick={() => setValue('emoji', emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {formErrors.emoji ? <p className='mt-1 text-sm text-red-500'>{formErrors.emoji.message}</p> : null}
            </div>
          </div>
          <div className='flex justify-end space-x-3 pt-4 border-t'>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isCreatingCategory}>
              {creteText}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
