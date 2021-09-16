import { Container, Flex, Text } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import styles from '../../styles/ClassCriteriaSection.module.css';
import CardClassCriteria from '../CardClassCriteria';
interface IProps {}

const ClassCriteriaSection: React.FC<IProps> = (): ReactElement => {
  return (
    <Container marginTop={4} px={3}>
      <Text fontSize='x-large' fontWeight='bold' marginBottom={2}>
        Kriteria Kelas
      </Text>
      <Flex justifyContent='center' gridGap={2} flexDirection='column'>
        <CardClassCriteria
          title='3 Fakultas'
          img_url='/images/logo-unkriswina-sumba-512.jpg'
        />
        <CardClassCriteria
          title='3 Fakultas'
          img_url='/images/logo-unkriswina-sumba-512.jpg'
        />
        <CardClassCriteria
          title='3 Fakultas'
          img_url='/images/logo-unkriswina-sumba-512.jpg'
        />
      </Flex>
    </Container>
  );
};

export default ClassCriteriaSection;
