import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Image } from '@chakra-ui/image';
import { Badge, Box, Circle, Flex } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { ReactElement } from 'react';
import { FaEye } from 'react-icons/fa';
import styles from '../../styles/ClassCriteriaSection.module.css';

interface IProps {
  title: string;
  img_url: string;
  ranking: 1 | 2 | 3 | 4;
  countShowed: number;
}

const CardPopulerClass: React.FC<IProps> = (props): ReactElement => {
  return (
    <Flex
      pt={3}
      pb={3}
      pl={6}
      pr={6}
      w='300'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW='sm'
        borderWidth='1px'
        rounded='lg'
        shadow='lg'
        position='relative'
      >
        <Circle
          size='10px'
          position='absolute'
          top={2}
          p={4}
          right={2}
          bg='red.500'
        >
          #{props.ranking}
        </Circle>

        <Image
          src={props.img_url}
          alt={`Kelas ${props.title}`}
          roundedTop='lg'
          w='full'
          // w={350}
          // h={280}
          // objectFit='contain'
        />

        <Box p='6'>
          <Box d='flex' alignItems='baseline'>
            <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='red'>
              Populer ke {props.ranking}
            </Badge>
          </Box>
          <Flex mt='1' justifyContent='space-between' alignContent='center'>
            <Box
              fontSize='2xl'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              {props.title}
            </Box>
          </Flex>

          <Flex justifyContent='flex-start' alignContent='center' gridGap={2}>
            <Box
              fontSize='x-large'
              color={useColorModeValue('gray.800', 'white')}
            >
              {props.countShowed}
            </Box>
            <Tooltip
              label='Terakhir update 14/09/2021'
              bg='white'
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}
            >
              <Icon as={FaEye} h={5} w={5} alignSelf={'center'} />
            </Tooltip>
            <Box
              fontSize='x-large'
              color={useColorModeValue('gray.800', 'white')}
            >
              kali
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default CardPopulerClass;
