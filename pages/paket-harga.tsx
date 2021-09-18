import { Button } from '@chakra-ui/button';
import {
  Badge,
  Box,
  Center,
  Container,
  Divider,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import { PUBLIC_URL } from '../constant';
import { CheckIcon } from '@chakra-ui/icons';

interface IProps {}

const PaketHarga: React.FC<IProps> = (): ReactElement => {
  return (
    <Layout>
      <Head>
        <meta name='og:keywords' content='Paket Harga' />
        <meta name='og:title' content='Paket Harga' />
        <meta property='og:site_name' content='Paket Harga' />
        <meta
          property='og:description'
          content='Daftar Paket Harga Kelas Unkriswina'
        />
        <meta name='twitter:title' content='Paket Harga' />
        <meta
          name='twitter:description'
          content='Daftar Paket Harga Kelas Unkriswina'
        />
        <meta property='og:url' content={`${PUBLIC_URL}`} />

        <meta name='twitter:site' content={`${PUBLIC_URL}`} />
        <meta property='og:image' content='' />
        <meta name='twitter:image:src' content='' />
        <meta property='og:image:width' content='1000' />
        <meta property='og:image:height' content='667' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image:alt' content='Paket Harga' />

        <title>Paket Harga</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container px={3} mb={6}>
        <Text fontSize='large' fontWeight='bold' color='gray.600'>
          Daftar Paket Harga
        </Text>
        <Divider width='50%' />
        <Center mt={5}>
          <Box
            maxW={'330px'}
            w={'full'}
            // bg={useColorModeValue('gray.800', 'white')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
          >
            <Stack
              textAlign={'center'}
              p={6}
              // color={useColorModeValue('white', 'gray.800')}
              align={'center'}
            >
              <Text
                fontSize='xx-large'
                fontWeight={500}
                // bg={useColorModeValue('green.900', 'green.50')}
                bg='green.900'
                p={2}
                px={3}
                color='whiteAlpha.900'
                rounded={'full'}
              >
                Sahabat
              </Text>
              <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text fontSize={'3xl'}>Rp</Text>
                <Text fontSize={'6xl'} fontWeight={800}>
                  5K
                </Text>
                <Text color={'gray.500'}>/Bulan</Text>
              </Stack>
            </Stack>

            <Box
              // bg={useColorModeValue('gray.900', 'gray.50')}
              px={6}
              py={10}
            >
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.400' />
                  Kelas Saya{' '}
                  <Badge borderRadius='md' color='red.600' fontWeight='bold'>
                    (Segera)
                  </Badge>
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.400' />
                  Filter Canggih{' '}
                  <Badge borderRadius='md' color='red.600' fontWeight='bold'>
                    (Segera)
                  </Badge>
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color='green.400' />
                  Semua Fitur{' '}
                  <Badge borderRadius='md' color='red.600' fontWeight='bold'>
                    (Segera)
                  </Badge>
                </ListItem>
              </List>
              <Button
                mt={10}
                w={'full'}
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: 'green.500',
                }}
                _focus={{
                  bg: 'green.500',
                }}
              >
                Mulai uji coba Anda
              </Button>
            </Box>
          </Box>
        </Center>
      </Container>
    </Layout>
  );
};

export default PaketHarga;
