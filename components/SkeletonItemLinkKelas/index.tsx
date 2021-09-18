import { Flex } from '@chakra-ui/layout';
import { SkeletonCircle, Skeleton } from '@chakra-ui/skeleton';
import React, { ReactElement } from 'react';
interface IProps {}

const SkeletonItemLinkKelas: React.FC<IProps> = (): ReactElement => {
  return (
    <Flex alignItems='center' mb={2} gridGap={2}>
      <SkeletonCircle size='10' />
      <Flex mt={2} flexDirection='column' width='full'>
        <Skeleton width='128px' height='2' mb={1} />
        <Flex gridGap={2}>
          <Skeleton width='60px' height='2' mb={1} />
          <Skeleton width='60px' height='2' mb={1} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SkeletonItemLinkKelas;
