import { useMediaQuery } from '@/hooks/use-media-query';
import { Dispatch, SetStateAction } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Button } from './ui/button';

interface ModalProps {
  className?: string;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  desktopOnly?: boolean;
  preventDefaultClose?: boolean;
  action?: () => void;
  actionLoading?: boolean;
  actionType?: 'submit' | 'delete';
}

export const ConfirmationDialog = ({
  desktopOnly,
  onClose,
  preventDefaultClose,
  setShowModal,
  showModal,
  actionType,
  actionLoading,
  action,
}: ModalProps) => {
  const actionText = actionType === 'delete' ? 'Delete' : 'Submit';
  const actionLoadingText = actionType === 'delete' ? 'Deleting' : 'Submitting';

  const closeModal = ({ dragged }: { dragged?: boolean }) => {
    if (preventDefaultClose && !dragged) {
      return;
    }

    if (onClose) {
      onClose();
    }
    if (setShowModal) {
      setShowModal(false);
    }
  };

  const { isMobile } = useMediaQuery();

  if (isMobile && !desktopOnly) {
    return (
      <Drawer
        open={setShowModal ? showModal : true}
        onOpenChange={(open: boolean) => {
          if (!open) {
            closeModal({ dragged: true });
          }
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='text-xl tracking-tight'>Are you sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant={actionType === 'delete' ? 'destructive' : 'default'} disabled={actionLoading} onClick={action}>
              {actionLoading ? actionLoadingText : actionText}
            </Button>
            <DrawerClose>
              <Button variant='outline' className='w-full'>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <AlertDialog
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal({ dragged: true });
        }
      }}
    >
      <AlertDialogTitle className='sr-only'>Dialog</AlertDialogTitle>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl tracking-tight'>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <Button variant={actionType === 'delete' ? 'destructive' : 'default'} disabled={actionLoading} onClick={action}>
            {actionLoading ? actionLoadingText : actionText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
