import { Container, Flex, Text } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import styles from '../../styles/PopulerClassSection.module.css';
import CardPopulerClass from '../CardPopulerClass';
interface IProps {}

const PopulerClassSection: React.FC<IProps> = (): ReactElement => {
  return (
    <Container marginTop={4} px={3}>
      <Text fontSize='x-large' fontWeight='bold' marginBottom={2}>
        4 Mata kuliah yang paling banyak dicari
      </Text>
      <Flex justifyContent='center' gridGap={2} flexDirection='column'>
        <CardPopulerClass
          ranking={1}
          countShowed={560}
          title='Sistem Basis Data'
          img_url='/images/logo-unkriswina-sumba-512.jpg'
        />
        <CardPopulerClass
          ranking={2}
          countShowed={523}
          title='Dasar Pemprograman'
          img_url='/images/logo-unkriswina-sumba-512.jpg'
        />
        <CardPopulerClass
          ranking={3}
          countShowed={243}
          title='Bahasa Indonesia'
          img_url='/images/logo-unkriswina-sumba-512.jpg'
        />
        <CardPopulerClass
          ranking={4}
          countShowed={243}
          title='Bahasa Inggris'
          img_url='/images/logo-unkriswina-sumba-512.jpg'
        />
      </Flex>
    </Container>
  );
};

export default PopulerClassSection;
