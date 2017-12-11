// @flow
import React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Flex, Box } from 'reflexbox';
import { Spin } from 'antd';
import RegionsStore from './RegionsStore';
import RegionCard from './components/RegionCard';

type Props = {};

@observer
class Regions extends React.Component<Props> {
  store: RegionsStore;

  constructor(props: Props) {
    super(props);
    this.store = new RegionsStore();
  }

  componentDidMount() {
    this.store.getRegions();
  }

  render() {
    return (
      <Layout>
        <Flex auto m={3} wrap>
          {this.store.loading
            ? <Spin />
            : this.store.regions.map((region, i) =>
                <Box w={[1, 1 / 2, 1 / 4]} p={1}>
                  <RegionCard region={region} key={i} />
                </Box>
              )}
        </Flex>
      </Layout>
    );
  }
}

export default Regions;
