import Heading from '@/components/heading';
import { Icons } from '@/components/icons';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Reviews() {
  return (
    <section className='relative py-24 sm:py-32 bg-white'>
      <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-20'>
        <div>
          <h2 className='text-center text-base/7 font-semibold text-brand-600'>Real World Experiences</h2>
          <Heading className='text-center'>What our customers say</Heading>
        </div>
        <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200'>
          {/* First customer review */}
          <div className='flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-t[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]'>
            <div className='flex gap-0.5 mb-2 justify-center lg:justify-start'>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className='size-4 text-brand-600 fill-brand-600' />
              ))}
            </div>
            <p className='text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty'>
              PingPanda has been a game changer for Me. I&apos;ve been using it for two now and seeing sales pop up in
              real-time is super satisfying.
            </p>
            <div className='flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2'>
              <Image
                src='/user-2.png'
                className='object-cover rounded-full'
                alt='Random user avatar'
                width={48}
                height={48}
              />
              <div className='flex flex-col items-center sm:items-start'>
                <p className='font-semibold flex items-center'>
                  Freya Larson <Icons.verificationBadge className='size-4 inline-block ml-1.5' />
                </p>
                <p className='text-sm text-gray-600 '>@itsmefreya</p>
              </div>
            </div>
          </div>

          {/* Second customer review */}

          <div className='flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]'>
            <div className='flex gap-0.5 mb-2 justify-center lg:justify-start'>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className='size-4 text-brand-600 fill-brand-600' />
              ))}
            </div>
            <p className='text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty'>
              I&apos;ve been using PingPanda for a while now and it&apos;s been a great experience. The real-time
              notifications are super handy.
            </p>
            <div className='flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2'>
              <Image
                src='/user-1.png'
                className='object-cover rounded-full'
                alt='Random user avatar'
                width={48}
                height={48}
              />
              <div className='flex flex-col items-center sm:items-start'>
                <p className='font-semibold flex items-center'>
                  John doe <Icons.verificationBadge className='size-4 inline-block ml-1.5' />
                </p>
                <p className='text-sm text-gray-600 '>@goatdoe</p>
              </div>
            </div>
          </div>
        </div>
        <Button variant='shiny' className='w-full rounded-lg cursor-pointer max-w-80' size='lg' asChild>
          <div>
            <Link href={'#'} className='relative z-10 flex items-center gap-2'>
              <span>Start for free today</span>
              <ArrowRight className='size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]' />
            </Link>
            <div className='ease-[cubic-bezier(1.19, 1, 0.22, 1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]' />
          </div>
        </Button>
      </MaxWidthWrapper>
    </section>
  );
}
