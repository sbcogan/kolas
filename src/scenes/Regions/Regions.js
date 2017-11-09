// @flow
import React from 'react';
import Layout from 'components/Layout';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Flex } from 'reflexbox';
import { Table, Spin } from 'antd';
import RegionsStore from './RegionsStore';

type Props = {};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }
];

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
        <Flex column auto>
          {this.store.loading
            ? <Spin />
            : <FlexTable
                bordered
                title={() => 'Teams'}
                dataSource={this.store.regions}
                columns={columns}
                pagination={{
                  defaultPageSize: 5
                }}
              />}
        </Flex>
      </Layout>
    );
  }
}

const FlexTable = styled(Table)`
  margin: 30px;
  .ant-table {
    background: #fff;
  }
`;

export default Regions;
