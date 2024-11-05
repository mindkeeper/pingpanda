import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface DashboardPageProps {
  title: string;
  children?: React.ReactNode;
  hideBackButton?: boolean;
  cta?: React.ReactNode;
}

export default function DashboardPage({ title, children, hideBackButton, cta }: DashboardPageProps) {
  return (
    <section className='flex-1 h-full w-full flex flex-col'>
      <div className='p-6 sm:p-8 flex justify-between border-b border-gray-200'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-8'>
          {hideBackButton ? null : (
            <Button className='w-fit bg-white' variant='outline'>
              <ArrowLeft className='size-4' />
            </Button>
          )}
          <Heading>{title}</Heading>
          {!cta ? null : <div>{cta}</div>}
        </div>
      </div>
      <div className='flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto'>{children}</div>
    </section>
  );
}
