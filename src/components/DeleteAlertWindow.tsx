import { useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import React, { useRef } from 'react'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteAlertWindow = ({ isOpen, onClose, onConfirm }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
    >
        <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Review
            </AlertDialogHeader>

            <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
                Cancel
            </Button>
            <Button
                colorScheme="red"
                onClick={onConfirm}
                ml={3}
            >
                Delete
            </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteAlertWindow;