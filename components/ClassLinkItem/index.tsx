import { Flex, Link, Text } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import { ReactNode } from 'react';

interface IProps {
  icon: ReactNode;
  link: string;
  kode?: string;
}

const ClassLinkItem: React.FC<IProps> = (props): ReactElement => {
  return (
    <Flex alignItems='center' gridGap={3} mb={1}>
      {props.icon}
      <Flex flexDirection='column'>
        <Link
          className='Primarycolor'
          fontSize='sm'
          fontWeight='light'
          href={props.link}
          isExternal={true}
        >
          Klik untuk masuk
        </Link>
        <Flex gridGap={2}>
          <Text fontSize='sm' textTransform='capitalize' color='teal.500'>
            Salin link
          </Text>
          {props.kode && (
            <Text fontSize='sm' textTransform='capitalize' color='teal.500'>
              Salin kode
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ClassLinkItem;
