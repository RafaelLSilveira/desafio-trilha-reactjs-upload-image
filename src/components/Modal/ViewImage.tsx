/* eslint-disable prettier/prettier */
import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';
import { ReactElement } from 'react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): ReactElement {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="pGray.800" maxW="fit-content">
        <ModalCloseButton />
        <ModalBody maxW="unset">
          <Image
            src={imgUrl}
            objectFit="fill"
            w="max"
            h="max"
            maxH="900px"
            maxW="600px"
            borderTopRadius="md"
          />
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
