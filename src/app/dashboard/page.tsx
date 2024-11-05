import { db } from '@/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardPage from './_components/dashboard-page';
import DashboardPageContent from './_components/dashboard-page-content';
import CreateEventCategoryModal from './_components/create-event-category-modal';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export default async function Page() {
  const auth = await currentUser();
  if (!auth) {
    redirect('/sign-in');
  }

  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  });

  if (!user) {
    redirect('/sign-in');
  }
  return (
    <DashboardPage
      title='Dashboard'
      cta={
        <CreateEventCategoryModal>
          <Button>
            <PlusIcon className='size-4 mr-2' />
            Add Category
          </Button>
        </CreateEventCategoryModal>
      }
    >
      <DashboardPageContent />
    </DashboardPage>
  );
}
