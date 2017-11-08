// @flow
import React from 'react';
import Layout from 'components/Layout';
import { Flex } from 'reflexbox';
import { Table, Button, Input, Select } from 'antd';
import styled from 'styled-components';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region'
  }
];

// Fake the data for now
const teams = [
  {
    id: 1,
    name: 'Duke',
    gender: 'Mens',
    region: 'Southeast'
  },
  {
    id: 2,
    name: 'Duke',
    gender: 'Womens',
    region: 'Southeast'
  },
  {
    id: 3,
    name: 'UNC',
    gender: 'Mens',
    region: 'Southeast'
  },
  {
    id: 4,
    name: 'UNC',
    gender: 'Womens',
    region: 'Southeast'
  }
];

class Teams extends React.Component<{}> {
  render() {
    return (
      <Layout>
        <Flex column auto>
          <FlexTable
            bordered
            title={() => 'Teams'}
            dataSource={teams}
            columns={columns}
            pagination={{
              defaultPageSize: 5
            }}
          />
        </Flex>
      </Layout>
    );
  }
}

const PaddedSelect = styled(Select)`
  margin-right: 10px;
`;

const PaddedInput = styled(Input)`
  margin-right: 10px;
`;

const InputRow = styled(Flex)`
  margin: 30px;
  margin-bottom: 10px;
`;

const FlexTable = styled(Table)`
  margin: 30px;
  margin-top: 0px;
  .ant-table {
    background: #fff;
  }
`;

export default Teams;
