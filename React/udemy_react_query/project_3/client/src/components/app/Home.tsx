import { Icon, Stack, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { GiFlowerPot } from 'react-icons/gi';

import { BackgroundImage } from '../common/BackgroundImage';
import { usePrefetchTreatments } from '../treatments/hooks/useTreatments';

export function Home(): ReactElement {
  /*
  home에서 prefetch를 실행하는 이유는 동적이지 않은 컴포넌트이기 떄문에 리렌더링이 많지 않다.
  staleTime과 cacheTime으로도 리페치가 안되도록 조절이 가능하다.
  */
  usePrefetchTreatments();
  return (
    <Stack align="center" justify="center" height="84vh">
      <BackgroundImage />
      <Text textAlign="center" fontFamily="Forum, sans-serif" fontSize="6em">
        <Icon m={4} verticalAlign="top" as={GiFlowerPot} />
        Lazy Days Spa
      </Text>
      <Text>Hours: limited</Text>
      <Text>Address: nearby</Text>
    </Stack>
  );
}
