// @flow
import React from 'react';
import Layout from 'components/Layout';
import { Flex } from 'reflexbox';
import { Table, Button, Input, Select } from 'antd';

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
    gender: 'mens'
  },
  {
    id: 2,
    name: 'Duke',
    gender: 'womens'
  },
  {
    id: 3,
    name: 'UNC',
    gender: 'mens'
  },
  {
    id: 4,
    name: 'UNC',
    gender: 'womens'
  }
];

class Teams extends React.Component<{}> {
  render() {
    return (
      <Layout>
        <Flex column auto>
          <Table
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

export default Teams;
