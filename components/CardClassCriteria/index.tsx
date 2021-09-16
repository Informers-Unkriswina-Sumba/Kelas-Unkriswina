import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Box, Center, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import styles from '../../styles/ClassCriteriaSection.module.css';

interface IProps {
  title: string;
  img_url: string;
}

const CardClassCriteria: React.FC<IProps> = (props): ReactElement => {
  return (
    <Center py={6}>
      <Box
        role={'group'}
        p={6}
        maxW={'300px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${props.img_url})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={props.img_url}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text fontSize='large' fontWeight='bold' textTransform={'uppercase'}>
            {props.title}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};

export default CardClassCriteria;
