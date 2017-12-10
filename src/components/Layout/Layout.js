// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  subheader?: React.Node,
  className?: string
};

const Layout = ({ children, subheader, className }: Props) =>
  <Background column>
    <Header subheader={subheader} />
    <Flex justify="center" auto className={className}>
      {children}
    </Flex>
    <Footer />
  </Background>;

const Background = styled(Flex)`
  background: #f7f7f7;
  min-height: 100vh;
`;

export { Layout };
export default Layout;
