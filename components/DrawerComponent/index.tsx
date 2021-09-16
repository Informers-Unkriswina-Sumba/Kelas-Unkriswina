import { Button, IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Text } from '@chakra-ui/layout';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';
import React, { ReactElement } from 'react';
import { RiMenuUnfoldFill } from 'react-icons/ri';
import Link from 'next/link';
import { APP_ROUTE } from '../../constant';
import { IRouteApp } from '../../interface';

interface IProps {}

const DrawerComponent: React.FC<IProps> = (): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = React.useRef();

  return (
    <Box>
      <IconButton
        size='sm'
        fontSize='sm'
        variant='ghost'
        color='current'
        ref={btnRef}
        onClick={onOpen}
        icon={<RiMenuUnfoldFill />}
        aria-label={`Buka navigasi`}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='full'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            {APP_ROUTE.map((route: IRouteApp) => (
              <Box key={route.key} my={2}>
                <Link href={`/${route.key}`}>
                  <Button isFullWidth onClick={onClose}>
                    <Text
                      fontSize='large'
                      width='full'
                      align='right'
                      textTransform='capitalize'
                    >
                      {route.label}
                    </Text>
                  </Button>
                </Link>
              </Box>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Text
              fontSize='xx-large'
              textTransform='uppercase'
              opacity='.6'
              fontWeight='extrabold'
              textAlign='right'
            >
              Bibuat oleh HMTI UKRISWINA SUMBA
            </Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DrawerComponent;
