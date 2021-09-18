import { Flex } from '@chakra-ui/layout';
import { SkeletonCircle, Skeleton } from '@chakra-ui/skeleton';
import React, { ReactElement } from 'react';
interface IProps {}

const SkeletonItemInfoKelas: React.FC<IProps> = (): ReactElement => {
  return (
    <Flex alignItems='center' mb={2} gridGap={2}>
      <SkeletonCircle size='10' />
      <Flex
        alignItems='center'
        mt={2}
        flexDirection='column'
        width='full'
        justifyContent='space-between'
      >
        <Skeleton width='full' height='2' mb={1} />
        <Skeleton width='full' height='2' mb={1} />
      </Flex>
    </Flex>
  );
};

export default SkeletonItemInfoKelas;
