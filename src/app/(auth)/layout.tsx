import Navbar from '@/components/navbar';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <div className='flex-1 w-full flex flex-col items-center justify-center'>{children}</div>
    </>
  );
}
