import { cn } from '@/lib/utils';

type MaxWidthWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export default function MaxWidthWrapper({ children, className }: MaxWidthWrapperProps) {
  return <div className={cn('h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>{children}</div>;
}
