import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface DashboardPageProps {
  title: string;
  children?: React.ReactNode;
  hideBackButton?: boolean;
  cta?: React.ReactNode;
}

export default function DashboardPage({ title, children, hideBackButton, cta }: DashboardPageProps) {
  return (
    <section className='flex-1 h-full w-full flex flex-col'>
      <div className='w-full p-6 sm:p-8 flex justify-between border-b border-gray-200'>
        <div className='w-full flex flex-col sm:flex-row items-start sm:items-center gap-6'>
          <div className='flex items-center gap-8'>
            {hideBackButton ? null : (
              <Button className='w-fit bg-white' variant='outline' asChild>
                <Link href={'/dashboard'}>
                  <ArrowLeft className='size-4' />
                </Link>
              </Button>
            )}
            <Heading>{title}</Heading>
          </div>
          {!cta ? null : <div className='w-full'>{cta}</div>}
        </div>
      </div>
      <div className='flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto'>{children}</div>
    </section>
  );
}
