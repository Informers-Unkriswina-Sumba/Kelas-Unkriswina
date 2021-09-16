import { Text } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import styles from '../../styles/Hero.module.css';
interface IProps {}

const Hero: React.FC<IProps> = (): ReactElement => {
  return (
    <div className={styles.heroImage}>
      <div className={styles.contentHero}>
        <Text fontWeight='extrabold' fontSize='xx-large' color='whiteAlpha.900'>
          Kelas Unkriswina
        </Text>
        <Text fontWeight='light' fontSize='large' color='whiteAlpha.900'>
          Bikin cari kelas mata kuliah semakin mudah
        </Text>
        <Text
          fontWeight='bold'
          fontSize='large'
          fontStyle='italic'
          className='Primarycolor'
        >
          #MakinMudahMakinCepat
        </Text>
      </div>
    </div>
  );
};

export default Hero;
