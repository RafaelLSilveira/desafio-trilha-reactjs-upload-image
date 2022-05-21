import { Box, Button } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CardList } from '../components/CardList';
import { Error } from '../components/Error';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface LastPageResponse extends AxiosResponse {
  after?: {
    id: string;
  };
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = null }) => {
      return api.get('/api/images', { params: { after: pageParam } });
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.data?.after ?? null;
      },
    }
  );

  const formattedData: Card[] = useMemo(() => {
    const treatedData =
      data?.pages?.flatMap(item => item.data.data.flat()) ?? [];
    return treatedData;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt={6}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
