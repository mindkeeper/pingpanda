import Link from 'next/link';
import { SIDEBAR_ITEMS } from '../_constants/sidebar';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserButton } from '@clerk/nextjs';

export default function Sidebar({ onclose }: { onclose?: () => void }) {
  return (
    <div className='space-y-4 md:space-y-6 relative z-20 flex flex-col h-full'>
      {/* logo */}
      <p className='hidden sm:block text-lg/7 font-semibold text-brand-900'>
        Ping<span className='text-brand-700'>Panda</span>
      </p>

      {/* navigation menu */}
      <nav className='flex-grow'>
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className='mb-4 md:mb-8'>
              <p className='text-xs font-medium leading-6 text-zinc-500'>{category}</p>
              <div className='-mx-2 flex-1 flex flex-col'>
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'w-full group flex justify-start items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 hover:bg-gray-50 transition'
                    )}
                    onClick={onclose}
                  >
                    <item.icon className='size-4 text-zinc-500 group-hover:text-zinc-700' />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className='flex flex-col'>
        <Separator className='my-4 md:my-6 w-full h-px bg-gray-100' />
        <UserButton
          showName
          appearance={{
            elements: {
              userButtonBox: 'flex-row-reverse',
            },
          }}
        />
      </div>
    </div>
  );
}
