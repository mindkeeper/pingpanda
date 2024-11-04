import Heading from '@/components/heading';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='relative py-24 sm:py-32 bg-brand-25'>
      <MaxWidthWrapper className='text-center'>
        <div className='relative mx-auto text-center flex flex-col items-center gap-10'>
          <div>
            <Heading>
              <span>Real-Time SaaS Insight,</span>
              <br />
              <span className='relative bg-gradient-to-r from bg-brand-700 to-brand-800 text-transparent bg-clip-text'>
                Delivered to Your Discord
              </span>
            </Heading>
          </div>
          <p className='text-base/7 text-gray-600 max-w-prose text-center text-pretty'>
            PingPanda is the easiest way to monitor your SaaS. Get instant notifications for{' '}
            <span className='font-semibold'>sales, new user, or any other event</span> sent directly to your Discord.
          </p>
          <ul className='space-y-2 text-base/7 text-gray-600 text-left flex flex-col items-start'>
            {[
              'Real-time discord alret for critical events',
              'Buy once, use forever',
              'Track sales, new user, or any other event',
            ].map((item, index) => (
              <li key={index} className='flex gap-1.5 items-center text-left'>
                <Check className='size-5 shrink-0 text-brand-700' />
                {item}
              </li>
            ))}
          </ul>
          <Button variant='shiny' className='w-full rounded-lg cursor-pointer max-w-80' size='lg' asChild>
            <div>
              <Link href={'#'} className='relative z-10 flex items-center gap-2'>
                <span>Start for free today</span>
                <ArrowRight className='size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]' />
              </Link>
              <div className='ease-[cubic-bezier(1.19, 1, 0.22, 1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]' />
            </div>
          </Button>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
