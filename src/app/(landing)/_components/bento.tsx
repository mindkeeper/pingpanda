import Heading from '@/components/heading';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import Image from 'next/image';
import MockCode from './mock-code';

export default function Bento() {
  return (
    <section className='relative py-24 sm:py-32 bg-brand-25'>
      <MaxWidthWrapper className='flex flex-col items-center gap-16 sm:gap-20'>
        <div>
          <h2 className='text-center text-base/7 font-semibold text-brand-600'>Intuitive Monitoring</h2>
          <Heading className='text-center'>Stay ahead with real time insights</Heading>
        </div>
        <div className='grid gap-4 lg:grid-cols-3 lg:grid-rows-2'>
          {/* first bento element */}
          <div className='relative lg:row-span-2'>
            <div className='absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]' />
            <div
              className='relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]
            lg:rounded-l-[calc(2rem+1px)]'
            >
              <div className='px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10'>
                <p className='mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center'>
                  Real Time Notifications
                </p>
                <p className='mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center'>
                  Get notified about critical events the moment they happen, no matter if you are home or on the go.
                </p>
              </div>
              <div className='relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm'>
                <div className='absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-green-900 shadow-2xl'>
                  <Image
                    className='size-full object-cover object-top'
                    src='/phone-screen.png'
                    alt='Phoen Screen displaying app interface'
                    fill
                  />
                </div>
              </div>
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]' />
          </div>

          {/* second bento element */}
          <div className='relative max-lg:row-start-1'>
            <div className='absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]' />
            <div className='relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]'>
              <div className='px-8 pt-8 sm:px-10 sm:pt-10'>
                <p className='mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center'>
                  Track Any Event
                </p>
                <p className='mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center'>
                  From new user signups to successful payments, PingPanda notifies you for all ciritical events in your Saas.
                </p>
              </div>
              <div className='flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2'>
                <Image
                  className='w-full max-lg:max-w-xs'
                  src='/bento-any-event.png'
                  alt='Bento box ilustrating event tracking'
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]' />
          </div>

          {/* third bento element */}
          <div className='relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2'>
            <div className='absolute inset-px rounded-lg bg-white' />
            <div className='relative h-full flex flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]'>
              <div className='px-8 pt-8 sm:px-10 sm:pt-10'>
                <p className='mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center'>
                  Track Any Properties
                </p>
                <p className='mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center'>
                  Add any custom data you like to an event, such as user email, a purchase amount, or an exceeded quota.
                </p>
              </div>
              <div className='flex flex-1 items-center justify-center px-10 max-lg:pb-8 max-lg:pt-10 sm:pt-10 lg:pb-2'>
                <Image
                  className='w-full max-lg:max-w-xs'
                  src='/bento-custom-data.png'
                  alt='Bento box ilustrating custom data tracking'
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5' />
          </div>

          {/* fourth bento element */}
          <div className='relative lg:row-span-2'>
            <div className='absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]' />
            <div className='relative h-full flex flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]'>
              <div className='px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10'>
                <p className='mt-2 text-lg/7 font-medium tracking-tight text-brand-950 max-lg:text-center'>
                  Easy Integration
                </p>
                <p className='mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center'>
                  Connect PingPanda with your existing workflow in minutes and call our intuitive API in any language.
                </p>
              </div>
              <MockCode />
            </div>
            <div className='pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]' />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
