import { Flex, Text } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import { ReactNode } from 'react';

interface IProps {
  infoTitle: string;
  infoValue: string;
  icon: ReactNode;
}

const ClassInfoItem: React.FC<IProps> = (props): ReactElement => {
  return (
    <Flex alignItems='center' gridGap={3} mb={1}>
      {props.icon}
      <Flex flexDirection='column'>
        <Text fontSize='sm' fontWeight='light'>
          {props.infoTitle}:
        </Text>
        <Text fontSize='sm' textTransform='capitalize' fontWeight='bold'>
          {props.infoValue.toLowerCase()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ClassInfoItem;
