import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

interface IProps {}

const Footer: React.FC<IProps> = (): ReactElement => {
  const router = useRouter();

  return <div></div>;
};

export default Footer;
