import Link from 'next/link';
import MaxWidthWrapper from './max-width-wrapper';
import { SignOutButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import { currentUser } from '@clerk/nextjs/server';
export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className='sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-16 items-center justify-between'>
          <Link href='/' className='flex z-40 font-semibold'>
            Ping<span className='text-brand-700'>Panda</span>
          </Link>
          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <SignOutButton>
                  <Button variant='ghost' size='sm'>
                    Sign out
                  </Button>
                </SignOutButton>
                <Button size='sm' className='flex items-center gap-1'>
                  <Link href='/dashboard'>Dashboard</Link>
                  <ArrowRight className='size-4 ml-1.5' />
                </Button>
              </>
            ) : (
              <>
                <Button size='sm' variant='ghost' asChild>
                  <Link href='/pricing'>Pricing</Link>
                </Button>

                <Button size='sm' variant='ghost' asChild>
                  <Link href='/sign-in'>Sign in</Link>
                </Button>
                <Separator orientation='vertical' className='h-8 w-px' />
                <Button size='sm' className='flex items-center gap-1'>
                  <Link href='/sign-up'>Sign up</Link>
                  <ArrowRight className='size-4 ml-1.5' />
                </Button>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
