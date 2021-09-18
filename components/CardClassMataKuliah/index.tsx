import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import { Badge, Box, Circle, Flex, Text } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import { IClass } from '../../interface/IClass';
import styles from '../../styles/ClassCriteriaSection.module.css';
import { ImArrowRight2 } from 'react-icons/im';
import Link from 'next/link';

interface IProps {
  classMataKuliah: IClass;
}

const CardClassMataKuliah: React.FC<IProps> = (props): ReactElement => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW='full'
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      position='relative'
    >
      <Flex
        pt={3}
        pb={3}
        pl={3}
        pr={3}
        w='full'
        justifyContent='flex-start'
        // alignItems='center'
        gridGap={2}
      >
        <Image
          src={props.classMataKuliah.img_url}
          alt={`Kelas ${props.classMataKuliah.nama_matakuliah}`}
          rounded='lg'
          // w='full'
          w={100}
          h={100}
          objectFit='contain'
        />
        <Flex flexDirection='column' justifyContent='space-between'>
          <Box>
            <Text
              textTransform='capitalize'
              fontSize='small'
              fontWeight='bold'
              className='Primarycolor'
            >
              {props.classMataKuliah.fakultas}
            </Text>
            <Text textTransform='capitalize' fontSize='small' fontWeight='bold'>
              {props.classMataKuliah.program_studi}
            </Text>
            <Text
              textTransform='uppercase'
              fontSize='large'
              fontWeight='extrabold'
            >
              {props.classMataKuliah.nama_matakuliah}
              {' - '}
              {props.classMataKuliah.kelas}
            </Text>
          </Box>
          <Text textTransform='capitalize' fontSize='small' fontWeight='bold'>
            Semester {props.classMataKuliah.semester}
          </Text>
        </Flex>
      </Flex>
      <Box Flex pt={3} pb={3} pl={3} pr={3}>
        <Text textTransform='capitalize' fontSize='small'>
          {props.classMataKuliah.hari} {props.classMataKuliah.jam_mulai}
          {' - '}
          {props.classMataKuliah.jam_berakhir}
        </Text>
        <Link href={`kelas/${props.classMataKuliah.id}`}>
          <Button
            mt={3}
            rightIcon={<ImArrowRight2 />}
            // colorScheme='teal'
            color='whiteAlpha.900'
            className='PrimaryBackgroundColor'
            variant='outline'
            w='full'
            size='sm'
          >
            Cek Detail
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default CardClassMataKuliah;
