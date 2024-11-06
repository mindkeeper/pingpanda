import { PropsWithChildren } from 'react';
import Sidebar from './_components/sidebar';
import MobileHeader from './_components/mobile-header';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='relative h-screen flex flex-col md:flex-row bg-white overflow-hidden'>
      {/* Desktop Sidebar */}
      <div className='hidden md:block w-64 border-r border-gray-100 p-6 h-full text-brand-900 relative z-10'>
        <Sidebar />
      </div>

      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* TODO:MOBIlE HEADER AREA */}
        <MobileHeader />

        {/* MAIN CONTENT AREA */}
        <div className='flex-1 bg-gray-50 shadow-md p-4 md:p-6 relative z-10 overflow-y-auto'>
          <div className='relative min-h-full flex flex-col'>
            <div className='h-full flex flex-col flex-1 space-y-4'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
