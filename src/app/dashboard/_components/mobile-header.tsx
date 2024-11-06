'use client';

import { Modal } from '@/components/ui/modal';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './sidebar';

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div className='md:hidden flex items-center justify-between p-4 border-b border-gray-200'>
        <p className='text-lg/7 font-semibold text-brand-900'>
          Ping<span className='text-brand-700'>Panda</span>
        </p>
        <button className='text-gray-500 hover:text-gray-600' onClick={() => setIsOpen(true)}>
          <Menu className='size-6' />
        </button>
      </div>

      <Modal className='p-4' showModal={isOpen} setShowModal={setIsOpen}>
        <div className='flex justify-between items-center mb-4'>
          <p className='text-lg/7 font-semibold text-brand-900'>
            Ping<span className='text-brand-700'>Panda</span>
          </p>
          <button aria-label='Close modal' onClick={() => setIsOpen(false)}>
            <X className='size-6' />
          </button>
        </div>
        <Sidebar onclose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
