import { Stack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards = [] }: CardsProps): JSX.Element {
  const [urlImage, setUrlImage] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleClick(url: string): void {
    setUrlImage(url);
    onOpen();
  }

  return (
    <>
      <Stack
        m={0}
        padding={0}
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        gridGap="40px"
      >
        {cards.length > 0 &&
          cards[0] &&
          cards?.map((item: Card) => (
            <Card
              key={item.id}
              data={item}
              viewImage={() => handleClick(item.url)}
            />
          ))}
      </Stack>
      <ModalViewImage isOpen={isOpen} imgUrl={urlImage} onClose={onClose} />
    </>
  );
}
