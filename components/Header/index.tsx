import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import DrawerComponent from '../DrawerComponent';

interface IProps {}

const Header: React.FC<IProps> = (): ReactElement => {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  const handleToogleTheme = (): void => {
    toggleColorMode();
  };

  return (
    <Box
      className='AppHeader'
      paddingLeft='2'
      paddingRight='2'
      paddingTop='4'
      paddingBottom='4'
      marginBottom='8'
    >
      <Flex
        align='center'
        justify='space-between'
        direction='row'
        className='ContentAppHeader'
      >
        <Link href='/'>
          <Avatar
            size='md'
            name='Prosper Otemuyiwa'
            src='/images/logo-unkriswina-sumba-512.jpg'
          />
        </Link>
        <Flex direction='column' align='center'>
          <Text fontSize='md' fontWeight='bold'>
            Kelas Unkriswina
          </Text>
          <Text fontSize='sm' fontWeight='medium' align='center'>
            Semester / Tahun : I / 2021-2022
          </Text>
        </Flex>
        <Flex align='center' justify='space-between' direction='row'>
          <IconButton
            size='sm'
            fontSize='sm'
            variant='ghost'
            color='current'
            onClick={handleToogleTheme}
            icon={<SwitchIcon />}
            aria-label={`Switch to ${text} mode`}
          />
          <DrawerComponent />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
