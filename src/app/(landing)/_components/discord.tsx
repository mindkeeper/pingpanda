import MaxWidthWrapper from '@/components/max-width-wrapper';
import React from 'react';
import MockDiscordUi from './mock-discord-ui';
import { AnimatedList } from '@/components/ui/animated-list';
import DiscordMessage from './discord-messages';

export default function Discord() {
  return (
    <section className='relative bg-brand-25 pb-4'>
      <div className='absolute inset-x-0 bottom-24 top-24 bg-brand-700' />
      <div className='relative mx-auto'>
        <MaxWidthWrapper className='relative'>
          <div className='-m-2 rounded-xl bg-gray-900/5 ring-1 p-2 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
            <MockDiscordUi>
              <AnimatedList>
                <DiscordMessage
                  avatar='/brand-asset-profile-picture.png'
                  avatarAlt='PingPanda avatar'
                  username='PingPanda'
                  timestamp='Today at 12.43 PM'
                  badgeText='Payment'
                  badgeColor='#faa61a'
                  title='💰Payment Received'
                  content={{
                    amount: '$99.99',
                    email: 'peterparker@mail.com',
                    plan: 'Pro',
                  }}
                />
                <DiscordMessage
                  avatar='/brand-asset-profile-picture.png'
                  avatarAlt='PingPanda avatar'
                  username='PingPanda'
                  timestamp='Today at 13.12 PM'
                  badgeText='Signup'
                  badgeColor='#43b581'
                  title='👤 New user signed up'
                  content={{
                    name: 'John Doe',
                    email: 'johndoe@mail.com',
                  }}
                />
                <DiscordMessage
                  avatar='/brand-asset-profile-picture.png'
                  avatarAlt='PingPanda avatar'
                  username='PingPanda'
                  timestamp='Today at 13.12 PM'
                  badgeText='Milestone'
                  badgeColor='#5865f2'
                  title='🚀 Revenue Milestone Achieved'
                  content={{
                    recurringRevenue: '$1.000',
                    growth: '10%',
                  }}
                />
              </AnimatedList>
            </MockDiscordUi>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
